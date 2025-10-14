import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Table } from "@medusajs/ui"
import { useEffect, useState } from "react"

const OrdersTableWidget = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Получаем заказы через API
    fetch('/admin/orders', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
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

//   if (loading) {
//     return <div>Loading...</div>
//   }

  return (
    <Container className="p-4">
      {/* <h2 className="text-xl font-semibold mb-4">Custom Orders Table</h2> */}
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Order ID</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Custom Field</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map((order: any) => (
            <Table.Row key={order.id}>
              <Table.Cell>{order.display_id}</Table.Cell>
              <Table.Cell>{order.customer?.email || 'Guest'}</Table.Cell>
              <Table.Cell>
                {new Date(order.created_at).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{order.status}</Table.Cell>
              <Table.Cell>
                {(order.total / 100).toFixed(2)} {order.currency_code?.toUpperCase()}
              </Table.Cell>
              <Table.Cell>
                {/* Ваше кастомное поле */}
                {order.metadata?.custom_field || '-'}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.list.before", // Виджет появится перед стандартным списком
})

export default OrdersTableWidget