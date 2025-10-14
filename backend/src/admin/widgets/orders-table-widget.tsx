// import { defineWidgetConfig } from "@medusajs/admin-sdk"
// import { Container, Table } from "@medusajs/ui"
// import { useEffect, useState } from "react"

// const OrdersTableWidget = () => {
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Получаем заказы через API
//     fetch('/admin/orders', {
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         setOrders(data.orders || [])
//         setLoading(false)
//       })
//       .catch(err => {
//         console.error('Error fetching orders:', err)
//         setLoading(false)
//       })
//   }, [])



//   return (
//     <Container className="p-4">
//       <Table>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Order ID</Table.HeaderCell>
//             <Table.HeaderCell>Customer</Table.HeaderCell>
//             <Table.HeaderCell>Date</Table.HeaderCell>
//             <Table.HeaderCell>Status</Table.HeaderCell>
//             <Table.HeaderCell>Total</Table.HeaderCell>
//             <Table.HeaderCell>Custom Field</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {orders.map((order: any) => (
//             <Table.Row key={order.id}>
//               <Table.Cell>{order.display_id}</Table.Cell>
//               <Table.Cell>{order.customer?.email || 'Guest'}</Table.Cell>
//               <Table.Cell>
//                 {new Date(order.created_at).toLocaleDateString()}
//               </Table.Cell>
//               <Table.Cell>{order.status}</Table.Cell>
//               <Table.Cell>
//                 {(order.total / 100).toFixed(2)} {order.currency_code?.toUpperCase()}
//               </Table.Cell>
//               <Table.Cell>
//                 {/* Ваше кастомное поле */}
//                 {order.metadata?.custom_field || '-'}
//               </Table.Cell>
//             </Table.Row>
//           ))}
//         </Table.Body>
//       </Table>
//     </Container>
//   )
// }

// export const config = defineWidgetConfig({
//   zone: "order.list.before", // Виджет появится перед стандартным списком
// })

// export default OrdersTableWidget

import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Table, Select, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"

const OrdersTableWidget = () => {
  const [orders, setOrders] = useState([])
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCollection, setSelectedCollection] = useState("all")
  const [sortField, setSortField] = useState("created_at")
  const [sortOrder, setSortOrder] = useState("desc")

  // Загрузка коллекций
  useEffect(() => {
    fetch('/admin/collections', {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setCollections(data.collections || [])
      })
      .catch(err => console.error('Error fetching collections:', err))
  }, [])

  // Загрузка заказов
  useEffect(() => {
    setLoading(true)
    fetch('/admin/orders?expand=items,items.variant,items.variant.product,items.variant.product.collections', {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching orders:', err)
        setLoading(false)
      })
  }, [])

  // Фильтрация заказов по коллекции
  const filteredOrders = orders.filter(order => {
    if (selectedCollection === "all") return true
    
    // Проверяем, есть ли в заказе товары из выбранной коллекции
    return order.items?.some(item => 
      item.variant?.product?.collections?.some(
        collection => collection.handle === selectedCollection
      )
    )
  })

  // Сортировка заказов
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue, bValue

    switch (sortField) {
      case "created_at":
        aValue = new Date(a.created_at).getTime()
        bValue = new Date(b.created_at).getTime()
        break
      case "total":
        aValue = a.total
        bValue = b.total
        break
      case "display_id":
        aValue = a.display_id
        bValue = b.display_id
        break
      case "status":
        aValue = a.status
        bValue = b.status
        break
      default:
        return 0
    }

    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Получение коллекций из заказа
  const getOrderCollections = (order) => {
    const collectionSet = new Set()
    order.items?.forEach(item => {
      item.variant?.product?.collections?.forEach(collection => {
        collectionSet.add(collection.title)
      })
    })
    return Array.from(collectionSet).join(", ") || "-"
  }

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 hover:text-blue-600"
    >
      {children}
      {sortField === field && (
        <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
      )}
    </button>
  )

  return (
    <Container className="p-4">
      <div className="mb-4 flex gap-4 items-center">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Filter by Collection
          </label>
          <Select
            value={selectedCollection}
            onValueChange={setSelectedCollection}
          >
            <Select.Trigger>
              <Select.Value placeholder="All Collections" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">All Collections</Select.Item>
              {collections.map(collection => (
                <Select.Item key={collection.id} value={collection.handle}>
                  {collection.title}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
        <div className="text-sm text-gray-600">
          Showing {sortedOrders.length} of {orders.length} orders
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <SortButton field="display_id">Order ID</SortButton>
              </Table.HeaderCell>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>
                <SortButton field="created_at">Date</SortButton>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <SortButton field="status">Status</SortButton>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <SortButton field="total">Total</SortButton>
              </Table.HeaderCell>
              <Table.HeaderCell>Collections</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sortedOrders.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center py-8 text-gray-500">
                  No orders found for this collection
                </Table.Cell>
              </Table.Row>
            ) : (
              sortedOrders.map((order) => (
                <Table.Row key={order.id}>
                  <Table.Cell className="font-medium">
                    #{order.display_id}
                  </Table.Cell>
                  <Table.Cell>{order.customer?.email || order.email || 'Guest'}</Table.Cell>
                  <Table.Cell>
                    {new Date(order.created_at).toLocaleDateString('uk-UA', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Table.Cell>
                  <Table.Cell>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'canceled' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </Table.Cell>
                  <Table.Cell className="font-medium">
                    {(order.total / 100).toFixed(2)} {order.currency_code?.toUpperCase()}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {getOrderCollections(order)}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.list.before",
})

export default OrdersTableWidget