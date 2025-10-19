import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container } from "@medusajs/ui"

const OrdersPage = () => {
  return (
    <Container>
      <h1>Мои заказы</h1>
      {/* Ваша кастомная таблица */}
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Заказы",
  icon: /* иконка */,
})

export default OrdersPage