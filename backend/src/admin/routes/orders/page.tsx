import { Container, Heading } from "@medusajs/ui"

const OrdersPage = () => {
  return (
    <Container>
      <Heading level="h1">Заказы</Heading>
      <div className="mt-4">
        {/* Здесь можете добавить свой контент вместо стандартной таблицы */}
        <p>Таблица заказов скрыта</p>
      </div>
    </Container>
  )
}

export default OrdersPage