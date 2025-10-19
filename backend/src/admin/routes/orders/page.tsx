import { RouteConfig } from "@medusajs/admin-sdk"

const CustomOrdersPage = () => {
  return (
    <div>
      {/* Ваша полностью кастомная страница заказов */}
    </div>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Заказы",
  },
}

export default CustomOrdersPage