import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"

const CustomOrdersPage = () => {
  return (
    <Container>
      <Heading level="h1">Мои заказы</Heading>
      {/* Ваша кастомная таблица */}
      <div>Здесь ваша новая таблица</div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Заказы",
})

export default CustomOrdersPage