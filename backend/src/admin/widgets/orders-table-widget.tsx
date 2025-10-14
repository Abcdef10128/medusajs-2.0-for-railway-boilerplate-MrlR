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
import { Container, Table, Select, Badge } from "@medusajs/ui"
import { useEffect, useState } from "react"

const OrdersTableWidget = () => {
  const [orders, setOrders] = useState([])
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCollection, setSelectedCollection] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  useEffect(() => {
    // Загружаем заказы и коллекции параллельно
    Promise.all([
      fetch('/admin/orders?fields=+items.variant.product.collection_id,+items.variant.product.collections', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json()),
      
      fetch('/admin/collections', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
    ])
      .then(([ordersData, collectionsData]) => {
        setOrders(ordersData.orders || [])
        setCollections(collectionsData.collections || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching data:', err)
        setLoading(false)
      })
  }, [])

  // Получаем коллекции для заказа
  const getOrderCollections = (order: any) => {
    const collectionIds = new Set<string>()
    
    order.items?.forEach((item: any) => {
      const product = item.variant?.product
      if (product?.collection_id) {
        collectionIds.add(product.collection_id)
      }
      // Если у продукта несколько коллекций
      product?.collections?.forEach((col: any) => {
        collectionIds.add(col.id)
      })
    })
    
    return Array.from(collectionIds)
      .map(id => collections.find((c: any) => c.id === id))
      .filter(Boolean)
  }

  // Фильтруем заказы по выбранной коллекции
  const filteredOrders = selectedCollection === "all" 
    ? orders 
    : orders.filter((order: any) => {
        const orderCollections = getOrderCollections(order)
        return orderCollections.some((col: any) => col?.id === selectedCollection)
      })

  // Сортируем заказы
  const sortedOrders = [...filteredOrders].sort((a: any, b: any) => {
    const dateA = new Date(a.created_at).getTime()
    const dateB = new Date(b.created_at).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <Container className="p-4">
      {/* Фильтры */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Filter by Collection</label>
          <Select value={selectedCollection} onValueChange={setSelectedCollection}>
            <Select.Trigger>
              <Select.Value placeholder="All Collections" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">All Collections</Select.Item>
              {collections.map((collection: any) => (
                <Select.Item key={collection.id} value={collection.id}>
                  {collection.title}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Sort by Date</label>
          <Select value={sortOrder} onValueChange={(val: "asc" | "desc") => setSortOrder(val)}>
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="desc">Newest First</Select.Item>
              <Select.Item value="asc">Oldest First</Select.Item>
            </Select.Content>
          </Select>
        </div>
      </div>

      {/* Таблица заказов */}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Collections</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedOrders.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={6} className="text-center text-gray-500">
                No orders found
              </Table.Cell>
            </Table.Row>
          ) : (
            sortedOrders.map((order: any) => {
              const orderCollections = getOrderCollections(order)
              
              return (
                <Table.Row key={order.id}>
                  <Table.Cell>{order.display_id}</Table.Cell>
                  <Table.Cell>{order.customer?.email || 'Guest'}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-1 flex-wrap">
                      {orderCollections.length > 0 ? (
                        orderCollections.map((col: any) => (
                          <Badge key={col.id} size="small">
                            {col.title}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">No collection</span>
                      )}
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge>{order.status}</Badge>
                  </Table.Cell>
                  {/* <Table.Cell>
                    {(order.total / 100).toFixed(2)} {order.currency_code?.toUpperCase()}
                  </Table.Cell> */}
                  <Table.Cell>
                    {order.total != null 
                        ? `${(order.total / 100).toFixed(2)} ${order.currency_code?.toUpperCase() || ''}` 
                        : 'N/A'
                    }
                    </Table.Cell>
                    
                    <Table.Cell>
                    {(() => {
                        const total = Number(order.total)
                        if (isNaN(total)) return 'N/A'
                        return `${(total / 100).toFixed(2)} ${order.currency_code?.toUpperCase() || ''}`
                    })()}
                    </Table.Cell>
                </Table.Row>
              )
            })
          )}
        </Table.Body>
      </Table>

      {/* Счетчик */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {sortedOrders.length} of {orders.length} orders
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.list.before",
})

export default OrdersTableWidget