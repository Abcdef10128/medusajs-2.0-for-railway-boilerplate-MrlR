import { Table } from "@medusajs/ui"
import { useAdminOrders } from "medusa-react"

const CustomOrdersTable = () => {
  const { orders, isLoading } = useAdminOrders()

  if (isLoading) return <div>Загрузка...</div>

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Клиент</Table.HeaderCell>
          <Table.HeaderCell>Статус</Table.HeaderCell>
          <Table.HeaderCell>Сумма</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {orders?.map((order) => (
          <Table.Row key={order.id}>
            <Table.Cell>{order.display_id}</Table.Cell>
            <Table.Cell>{order.email}</Table.Cell>
            <Table.Cell>{order.status}</Table.Cell>
            <Table.Cell>{order.total}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}