import { defineWidgetConfig } from "@medusajs/admin-sdk"

// Ваш кастомный компонент таблицы
const OrdersTableWidget = () => {
  return (
    <div>
      {/* Ваша кастомная таблица заказов */}
      <h2>Кастомная таблица заказов</h2>
      {/* Здесь ваша реализация */}
    </div>
  )
}

export const config = defineWidgetConfig({
  zone: "order.list.before", // или "order.list.after" для замены
})

export default OrdersTableWidget