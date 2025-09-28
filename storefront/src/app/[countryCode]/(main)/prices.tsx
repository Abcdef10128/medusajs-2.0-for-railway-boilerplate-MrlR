import { useState } from 'react'
import Image from "next/image"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@lib/components/ui/select'
import { Label } from '@lib/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@lib/components/ui/table'

// Базовые цены
const baseInvoices = [
  {
    amount: "10",
    a6: 550,
    a5: 700,
    a4: 1000,
    a3: 1250,
  },
  {
    amount: "50",
    a6: 1200,
    a5: 1600,
    a4: 2800,
    a3: 5000,
  },
  {
    amount: "100",
    a6: 1650,
    a5: 2850,
    a4: 5000,
    a3: 8750,
  },
  {
    amount: "500",
    a6: 6400,
    a5: 11000,
    a4: 19000,
    a3: 35000,
  },
  {
    amount: "1000",
    a6: 11000,
    a5: 19000,
    a4: 35000,
    a3: 64000,
  },
  {
    amount: "2500",
    a6: 24000,
    a5: 44000,
    a4: 80000,
    a3: 145000,
  },
]

// Доплаты за материалы
const materialPrices = {
  "paper": { a6: 0, a5: 0, a4: 0, a3: 0 },
  "film_white": { a6: 2, a5: 4, a4: 8, a3: 16 },
  "film_transparent": { a6: 6, a5: 11, a4: 23, a3: 46 },
  "film_silver": { a6: 12, a5: 24, a4: 48, a3: 96 },
  "film_gold": { a6: 12, a5: 24, a4: 48, a3: 96 },
}

// Доплаты за ламинацию
const laminationPrices = {
  "glossy": { a6: 0, a5: 0, a4: 0, a3: 0 },
  "matte": { a6: 1, a5: 1, a4: 1, a3: 1 },
  "soft_touch": { a6: 14, a5: 14, a4: 14, a3: 14 },
}

export default function PricingComponent() {
  const [selectedMaterial, setSelectedMaterial] = useState("paper")
  const [selectedLamination, setSelectedLamination] = useState("glossy")

  // Функция для расчета цены с учетом доплат
  const calculatePrice = (basePrice, size, quantity) => {
    const materialExtra = materialPrices[selectedMaterial]?.[size] || 0
    const laminationExtra = laminationPrices[selectedLamination]?.[size] || 0
    const extraPerUnit = materialExtra + laminationExtra
    const totalExtra = extraPerUnit * parseInt(quantity)
    return basePrice + totalExtra
  }

  // Генерация таблицы с учетом выбранных опций
  const calculateInvoices = () => {
    return baseInvoices.map(invoice => ({
      amount: invoice.amount,
      a6: `${calculatePrice(invoice.a6, 'a6', invoice.amount)}грн`,
      a5: `${calculatePrice(invoice.a5, 'a5', invoice.amount)}грн`,
      a4: `${calculatePrice(invoice.a4, 'a4', invoice.amount)}грн`,
      a3: `${calculatePrice(invoice.a3, 'a3', invoice.amount)}грн`,
    }))
  }

  const invoices = calculateInvoices()

  return (
    <div className="space-y-6">
      {/* Селекты */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <Label>Матеріал</Label>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Матеріал" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="paper">Самоклеючий папір</SelectItem>
                <SelectItem value="film_white">Плівка біла (A6- +2грн/шт, А5 - +4грн/шт, A4- +8грн/шт, А3 - +16грн/шт)</SelectItem>
                <SelectItem value="film_transparent">Плівка прозора (A6- +6грн/шт, А5 - +11грн/шт, A4- +23грн/шт, А3 - +46грн/шт)</SelectItem>
                <SelectItem value="film_silver">Плівка срібло (A6- +12грн/шт, А5 - +24грн/шт, A4- +48грн/шт, А3 - +96грн/шт)</SelectItem>
                <SelectItem value="film_gold">Плівка золото (A6- +12грн/шт, А5 - +24грн/шт, A4- +48грн/шт, А3 - +96грн/шт)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select value={selectedLamination} onValueChange={setSelectedLamination}>
            <Label>Ламінація</Label>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ламінація" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="glossy">Глінцева (A6- +0грн/шт, А5 - +0грн/шт, A4- +0грн/шт, А3 - +0грн/шт)</SelectItem>
                <SelectItem value="matte">Матова (A6- +1грн/шт, А5 - +1грн/шт, A4- +1грн/шт, А3 - +1грн/шт)</SelectItem>
                <SelectItem value="soft_touch">Soft touch (A6- +14грн/шт, А5 - +14грн/шт, A4- +14грн/шт, А3 - +14грн/шт)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Таблица */}
      <Table className="border-3">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Кількість</TableHead>
            <TableHead>A6</TableHead>
            <TableHead>A5</TableHead>
            <TableHead>A4</TableHead>
            <TableHead>A3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.amount}>
              <TableCell className="font-medium">{invoice.amount}</TableCell>
              <TableCell>{invoice.a6}</TableCell>
              <TableCell>{invoice.a5}</TableCell>
              <TableCell>{invoice.a4}</TableCell>
              <TableCell>{invoice.a3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}