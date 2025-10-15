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

// import { defineWidgetConfig } from "@medusajs/admin-sdk"
// import { Container, Table, Select, Badge } from "@medusajs/ui"
// import { useEffect, useState } from "react"

// const OrdersTableWidget = () => {
//   const [orders, setOrders] = useState([])
//   const [collections, setCollections] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedCollection, setSelectedCollection] = useState<string>("all")
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

//   useEffect(() => {
//     // Загружаем заказы и коллекции параллельно
//     Promise.all([
//       fetch('/admin/orders?fields=+items.variant.product.collection_id,+items.variant.product.collections', {
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' }
//       }).then(res => res.json()),
      
//       fetch('/admin/collections', {
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' }
//       }).then(res => res.json())
//     ])
//       .then(([ordersData, collectionsData]) => {
//         setOrders(ordersData.orders || [])
//         setCollections(collectionsData.collections || [])
//         setLoading(false)
//       })
//       .catch(err => {
//         console.error('Error fetching data:', err)
//         setLoading(false)
//       })
//   }, [])

//   // Получаем коллекции для заказа
//   const getOrderCollections = (order: any) => {
//     const collectionIds = new Set<string>()
    
//     order.items?.forEach((item: any) => {
//       const product = item.variant?.product
//       if (product?.collection_id) {
//         collectionIds.add(product.collection_id)
//       }
//       // Если у продукта несколько коллекций
//       product?.collections?.forEach((col: any) => {
//         collectionIds.add(col.id)
//       })
//     })
    
//     return Array.from(collectionIds)
//       .map(id => collections.find((c: any) => c.id === id))
//       .filter(Boolean)
//   }

//   // Фильтруем заказы по выбранной коллекции
//   const filteredOrders = selectedCollection === "all" 
//     ? orders 
//     : orders.filter((order: any) => {
//         const orderCollections = getOrderCollections(order)
//         return orderCollections.some((col: any) => col?.id === selectedCollection)
//       })

//   // Сортируем заказы
//   const sortedOrders = [...filteredOrders].sort((a: any, b: any) => {
//     const dateA = new Date(a.created_at).getTime()
//     const dateB = new Date(b.created_at).getTime()
//     return sortOrder === "asc" ? dateA - dateB : dateB - dateA
//   })

//   if (loading) {
//     return <div className="p-4">Loading...</div>
//   }

//   return (
//     <Container className="p-4">
//       {/* Фильтры */}
//       <div className="flex gap-4 mb-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-2">Filter by Collection</label>
//           <Select value={selectedCollection} onValueChange={setSelectedCollection}>
//             <Select.Trigger>
//               <Select.Value placeholder="All Collections" />
//             </Select.Trigger>
//             <Select.Content>
//               <Select.Item value="all">All Collections</Select.Item>
//               {collections.map((collection: any) => (
//                 <Select.Item key={collection.id} value={collection.id}>
//                   {collection.title}
//                 </Select.Item>
//               ))}
//             </Select.Content>
//           </Select>
//         </div>

//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-2">Sort by Date</label>
//           <Select value={sortOrder} onValueChange={(val: "asc" | "desc") => setSortOrder(val)}>
//             <Select.Trigger>
//               <Select.Value />
//             </Select.Trigger>
//             <Select.Content>
//               <Select.Item value="desc">Newest First</Select.Item>
//               <Select.Item value="asc">Oldest First</Select.Item>
//             </Select.Content>
//           </Select>
//         </div>
//       </div>


//       {/* Таблица заказов */}
//       <Table>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Order ID</Table.HeaderCell>
//             <Table.HeaderCell>Customer</Table.HeaderCell>
//             <Table.HeaderCell>Collections</Table.HeaderCell>
//             <Table.HeaderCell>Date</Table.HeaderCell>
//             <Table.HeaderCell>Status</Table.HeaderCell>
//             <Table.HeaderCell>Total</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {sortedOrders.length === 0 ? (
//             <Table.Row>
//               <Table.Cell colSpan={6} className="text-center text-gray-500">
//                 No orders found
//               </Table.Cell>
//             </Table.Row>
//           ) : (
//             sortedOrders.map((order: any) => {
//               const orderCollections = getOrderCollections(order)
              
//               return (
//                 <Table.Row key={order.id}>
//                   <Table.Cell>{order.display_id}</Table.Cell>
//                   <Table.Cell>{order.customer?.email || 'Guest'}</Table.Cell>
//                   <Table.Cell>
//                     <div className="flex gap-1 flex-wrap">
//                       {orderCollections.length > 0 ? (
//                         orderCollections.map((col: any) => (
//                           <Badge key={col.id} size="small">
//                             {col.title}
//                           </Badge>
//                         ))
//                       ) : (
//                         <span className="text-gray-400 text-sm">No collection</span>
//                       )}
//                     </div>
//                   </Table.Cell>
//                   <Table.Cell>
//                     {new Date(order.created_at).toLocaleDateString()}
//                   </Table.Cell>
//                   <Table.Cell>
//                     <Badge>{order.status}</Badge>
//                   </Table.Cell>




//                     <Table.Cell>
//                     {(() => {
//                         const total = Number(order.total)
//                         if (isNaN(total)) return 'N/A'
//                         return `${(total / 100).toFixed(2)} ${order.currency_code?.toUpperCase() || ''}`
//                     })()}
//                     </Table.Cell>

//                 </Table.Row>
//               )
//             })
//           )}
//         </Table.Body>
//       </Table>

//       {/* Счетчик */}
//       <div className="mt-4 text-sm text-gray-600">
//         Showing {sortedOrders.length} of {orders.length} orders
//       </div>
//     </Container>
//   )
// }

// export const config = defineWidgetConfig({
//   zone: "order.list.before",
// })

// export default OrdersTableWidget

//v1

// import { defineWidgetConfig } from "@medusajs/admin-sdk"
// import { Container, Table, Select, Badge } from "@medusajs/ui"
// import { useEffect, useState } from "react"

// interface Product {
//   id: string
//   title: string
//   sku?: string
//   quantity: number
//   price: number
//   currency_code: string
//   order_id: string
//   order_display_id: string
//   order_date: string
//   collection_title?: string
// }

// const OrdersProductsWidget = () => {
//   const [products, setProducts] = useState<Product[]>([])
//   const [collections, setCollections] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedMonth, setSelectedMonth] = useState<string>("all")
//   const [selectedCollection, setSelectedCollection] = useState<string>("all")

//   // Генерируем массив месяцев
//   const generateMonths = () => {
//     const months = [{ value: "all", label: "All Orders" }]
    
//     for (let i = 0; i < 12; i++) {
//       const date = new Date()
//       date.setMonth(date.getMonth() - i)
      
//       const year = date.getFullYear()
//       const month = date.getMonth()
//       const monthName = date.toLocaleString('en-US', { month: 'long', year: 'numeric' })
//       const value = `${year}-${String(month + 1).padStart(2, '0')}`
      
//       months.push({
//         value,
//         label: monthName
//       })
//     }
    
//     return months
//   }

//   useEffect(() => {
//     // Загружаем заказы и коллекции
//     Promise.all([
//       fetch('/admin/orders?limit=100&fields=+items.variant.product.collection_id,+items.variant.product.collections,+items.variant.product.sku', {
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' }
//       }).then(res => res.json()),
      
//       fetch('/admin/collections', {
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' }
//       }).then(res => res.json())
//     ])
//       .then(([ordersData, collectionsData]) => {
//         // Преобразуем товары из заказов
//         const allProducts: Product[] = []
        
//         ordersData.orders?.forEach((order: any) => {
//           order.items?.forEach((item: any) => {
//             const product = item.variant?.product
//             const collectionId = product?.collection_id
//             const collection = collectionsData.collections?.find((c: any) => c.id === collectionId)
            
//             allProducts.push({
//               id: item.id,
//               title: product?.title || 'Unknown Product',
//               sku: product?.sku || '-',
//               quantity: item.quantity || 0,
//               price: item.unit_price || 0,
//               currency_code: order.currency_code || 'USD',
//               order_id: order.id,
//               order_display_id: order.display_id,
//               order_date: order.created_at,
//               collection_title: collection?.title || 'No Collection'
//             })
//           })
//         })
        
//         setProducts(allProducts)
//         setCollections(collectionsData.collections || [])
//         setLoading(false)
//       })
//       .catch(err => {
//         console.error('Error fetching data:', err)
//         setLoading(false)
//       })
//   }, [])

//   // Фильтруем товары по месяцу
//   const filterByMonth = (products: Product[]) => {
//     if (selectedMonth === "all") return products
    
//     const [year, month] = selectedMonth.split('-')
    
//     return products.filter(product => {
//       const date = new Date(product.order_date)
//       const productYear = date.getFullYear().toString()
//       const productMonth = String(date.getMonth() + 1).padStart(2, '0')
      
//       return productYear === year && productMonth === month
//     })
//   }

//   // Фильтруем по коллекции
//   const filterByCollection = (products: Product[]) => {
//     if (selectedCollection === "all") return products
//     return products.filter(p => p.collection_title === selectedCollection)
//   }

//   // Применяем оба фильтра
//   const filteredProducts = filterByCollection(filterByMonth(products))

//   const months = generateMonths()
//   const uniqueCollections = Array.from(new Set(products.map(p => p.collection_title)))

//   if (loading) {
//     return <div className="p-4">Loading...</div>
//   }

//   const formatPrice = (price: number, currency: string) => {
//     return `${(price / 100).toFixed(2)} ${currency}`
//   }

//   return (
//     <Container className="p-4">
//       {/* Фильтры */}
//       <div className="flex gap-4 mb-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-2">Filter by Period</label>
//           <Select value={selectedMonth} onValueChange={setSelectedMonth}>
//             <Select.Trigger>
//               <Select.Value placeholder="Select period" />
//             </Select.Trigger>
//             <Select.Content>
//               {months.map((month) => (
//                 <Select.Item key={month.value} value={month.value}>
//                   {month.label}
//                 </Select.Item>
//               ))}
//             </Select.Content>
//           </Select>
//         </div>

//         <div className="flex-1">
//           <label className="block text-sm font-medium mb-2">Filter by Collection</label>
//           <Select value={selectedCollection} onValueChange={setSelectedCollection}>
//             <Select.Trigger>
//               <Select.Value placeholder="All Collections" />
//             </Select.Trigger>
//             <Select.Content>
//               <Select.Item value="all">All Collections</Select.Item>
//               {uniqueCollections.map((collection) => (
//                 <Select.Item key={collection} value={collection}>
//                   {collection}
//                 </Select.Item>
//               ))}
//             </Select.Content>
//           </Select>
//         </div>
//       </div>

//       {/* Таблица товаров */}
//       <Table>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Order ID</Table.HeaderCell>
//             <Table.HeaderCell>Product Title</Table.HeaderCell>
//             <Table.HeaderCell>SKU</Table.HeaderCell>
//             <Table.HeaderCell>Quantity</Table.HeaderCell>
//             <Table.HeaderCell>Price</Table.HeaderCell>
//             <Table.HeaderCell>Total</Table.HeaderCell>
//             <Table.HeaderCell>Collection</Table.HeaderCell>
//             <Table.HeaderCell>Order Date</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {filteredProducts.length === 0 ? (
//             <Table.Row>
//               <Table.Cell colSpan={8} className="text-center text-gray-500">
//                 No products found
//               </Table.Cell>
//             </Table.Row>
//           ) : (
//             filteredProducts.map((product) => {
//               const total = product.price * product.quantity
              
//               return (
//                 <Table.Row key={product.id}>
//                   <Table.Cell className="font-medium">
//                     <Badge size="small">{product.order_display_id}</Badge>
//                   </Table.Cell>
//                   <Table.Cell>{product.title}</Table.Cell>
//                   <Table.Cell className="text-gray-600">{product.sku}</Table.Cell>
//                   <Table.Cell className="text-center">{product.quantity}</Table.Cell>
//                   <Table.Cell>{formatPrice(product.price, product.currency_code)}</Table.Cell>
//                   <Table.Cell className="font-medium">
//                     {formatPrice(total, product.currency_code)}
//                   </Table.Cell>
//                   <Table.Cell>
//                     <Badge size="small">{product.collection_title}</Badge>
//                   </Table.Cell>
//                   <Table.Cell>
//                     {new Date(product.order_date).toLocaleDateString()}
//                   </Table.Cell>
//                 </Table.Row>
//               )
//             })
//           )}
//         </Table.Body>
//       </Table>

//       {/* Статистика */}
//       <div className="mt-4 text-sm text-gray-600">
//         <div>Showing {filteredProducts.length} products from {new Set(filteredProducts.map(p => p.order_display_id)).size} orders</div>
//         {filteredProducts.length > 0 && (
//           <div className="mt-2 font-medium">
//             Total Revenue: {formatPrice(
//               filteredProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0),
//               filteredProducts[0]?.currency_code || 'USD'
//             )}
//           </div>
//         )}
//       </div>
//     </Container>
//   )
// }

// export const config = defineWidgetConfig({
//   zone: "order.list.before",
// })

// export default OrdersProductsWidget

//v2 

import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Table, Select, Badge } from "@medusajs/ui"
import { useEffect, useState } from "react"

const OrdersProductsWidget = () => {
  const [products, setProducts] = useState([])
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Получаем месяцы (текущий и предыдущие)
  const getMonthOptions = () => {
    const months = [{ value: "all", label: "All Orders" }]
    
    for (let i = 0; i < 12; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      
      const monthName = date.toLocaleString('en-US', { month: 'long', year: 'numeric' })
      const monthValue = date.toISOString().slice(0, 7) // YYYY-MM
      
      if (i === 0) {
        months.push({ value: monthValue, label: `This Month (${monthName})` })
      } else {
        months.push({ value: monthValue, label: `${i} month${i > 1 ? 's' : ''} ago (${monthName})` })
      }
    }
    
    return months
  }

  useEffect(() => {
    // Загружаем заказы и коллекции параллельно
    Promise.all([
      fetch('/admin/orders?expand=items,items.variant,items.variant.product,customer', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json()),
      
      fetch('/admin/collections', {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
    ])
      .then(([ordersData, collectionsData]) => {
        // Преобразуем заказы в список товаров
        const allProducts = []
        
        ordersData.orders?.forEach((order: any) => {
          order.items?.forEach((item: any) => {
            allProducts.push({
              id: item.id,
              orderId: order.id,
              orderDisplayId: order.display_id,
              productName: item.title || item.variant?.product?.title || 'Unknown',
              productId: item.variant?.product?.id,
              variantTitle: item.variant?.title,
              quantity: item.quantity,
              // Цена в гривнах (копійки -> гривні)
              priceUAH: (item.unit_price || 0) / 100,
              total: (item.subtotal || 0) / 100,
              customerEmail: order.customer?.email || 'Guest',
              orderStatus: order.status,
              orderDate: new Date(order.created_at),
              orderCreatedAt: order.created_at,
              currencyCode: order.currency_code,
              collection: item.variant?.product?.collection_id,
              metadata: item.metadata
            })
          })
        })
        
        setProducts(allProducts)
        setCollections(collectionsData.collections || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching data:', err)
        setLoading(false)
      })
  }, [])

  // Фильтруем товары по месяцам
  const filteredProducts = selectedMonth === "all" 
    ? products 
    : products.filter((product: any) => {
        const productMonth = product.orderCreatedAt.slice(0, 7) // YYYY-MM
        return productMonth === selectedMonth
      })

  // Сортируем товары
  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    const dateA = new Date(a.orderCreatedAt).getTime()
    const dateB = new Date(b.orderCreatedAt).getTime()
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA
  })

  const monthOptions = getMonthOptions()

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  // Статистика
  const totalQuantity = sortedProducts.reduce((sum: number, p: any) => sum + p.quantity, 0)
  const totalRevenue = sortedProducts.reduce((sum: number, p: any) => sum + p.total, 0)

  return (
    <Container className="p-4">
      {/* Фильтры */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Filter by Month</label>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <Select.Trigger>
              <Select.Value placeholder="Select month" />
            </Select.Trigger>
            <Select.Content>
              {monthOptions.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
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

      {/* Статистика */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-blue-600">{sortedProducts.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600">Total Quantity</p>
          <p className="text-2xl font-bold text-green-600">{totalQuantity}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-purple-600">₴ {totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Таблица товаров */}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Variant</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price (UAH)</Table.HeaderCell>
            <Table.HeaderCell>Total (UAH)</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedProducts.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={9} className="text-center text-gray-500 py-8">
                No products found for selected period
              </Table.Cell>
            </Table.Row>
          ) : (
            sortedProducts.map((product: any) => (
              <Table.Row key={product.id}>
                <Table.Cell>
                  <span className="font-semibold">#{product.orderDisplayId}</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="font-medium">{product.productName}</div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm text-gray-600">
                    {product.variantTitle || '-'}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm">{product.customerEmail}</span>
                </Table.Cell>
                <Table.Cell>
                  <Badge size="small">{product.quantity}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <span className="font-medium">₴ {product.priceUAH.toFixed(2)}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="font-bold">₴ {product.total.toFixed(2)}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm">
                    {product.orderDate.toLocaleDateString('uk-UA')}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge size="small" variant={
                    product.orderStatus === 'completed' ? 'positive' :
                    product.orderStatus === 'pending' ? 'warning' :
                    product.orderStatus === 'canceled' ? 'negative' : 'default'
                  }>
                    {product.orderStatus}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      {/* Счетчик */}
      <div className="mt-4 text-sm text-gray-600">
        Showing {sortedProducts.length} products from {Math.ceil(sortedProducts.length / 10)} pages
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.list.before",
})

export default OrdersProductsWidget