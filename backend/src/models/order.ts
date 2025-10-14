import { model } from "@medusajs/utils"

export const Order = model.define("order", {
  customField: model.text().nullable(),
  priority: model.enum(["low", "medium", "high"]).default("medium"),
  notes: model.text().nullable(),
})