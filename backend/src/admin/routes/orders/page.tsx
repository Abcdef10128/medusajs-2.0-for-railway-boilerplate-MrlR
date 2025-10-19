import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container } from "@medusajs/ui"
import OrdersProductsWidget from "admin/widgets/orders-table-widget.js" 

const CustomOrdersPage = () => {
  return (
    <Container>
      <OrdersProductsWidget />
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Orders",
})

export default CustomOrdersPage