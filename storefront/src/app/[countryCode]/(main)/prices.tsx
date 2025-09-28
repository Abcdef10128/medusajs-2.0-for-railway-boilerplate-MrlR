"use client"

import { useState, useMemo } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"

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

// Доплаты за материал (за штуку)
const materialPrices = {
  "self-adhesive": { a6: 0, a5: 0, a4: 0, a3: 0 },
  "white-film": { a6: 2, a5: 4, a4: 8, a3: 16 },
  "clear-film": { a6: 6, a5: 11, a4: 23, a3: 46 },
  "silver-film": { a6: 12, a5: 24, a4: 48, a3: 96 },
  "gold-film": { a6: 12, a5: 24, a4: 48, a3: 96 },
}

// Доплаты за ламинацию (за штуку)
const laminationPrices = {
  "glossy": { a6: 0, a5: 0, a4: 0, a3: 0 },
  "matte": { a6: 1, a5: 1, a4: 1, a3: 1 },
  "soft-touch": { a6: 14, a5: 14, a4: 14, a3: 14 },
}

export default function PriceCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState("self-adhesive")
  const [selectedLamination, setSelectedLamination] = useState("glossy")

  // Пересчет цен с учетом выбранных опций
  const calculatedInvoices = useMemo(() => {
    return baseInvoices.map(invoice => {
      const amount = parseInt(invoice.amount)
      const materialExtra = materialPrices[selectedMaterial] || materialPrices["self-adhesive"]
      const laminationExtra = laminationPrices[selectedLamination] || laminationPrices["glossy"]

      return {
        amount: invoice.amount,
        a6: invoice.a6 + (materialExtra.a6 + laminationExtra.a6) * amount,
        a5: invoice.a5 + (materialExtra.a5 + laminationExtra.a5) * amount,
        a4: invoice.a4 + (materialExtra.a4 + laminationExtra.a4) * amount,
        a3: invoice.a3 + (materialExtra.a3 + laminationExtra.a3) * amount,
      }
    })
  }, [selectedMaterial, selectedLamination])

  return (
    <div className="space-y-6">
      {/* Селекторы */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <Label>Матеріал</Label>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Матеріал" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="self-adhesive">
                  Самоклеючий папір
                </SelectItem>
                <SelectItem value="white-film">
                  Плівка біла (A6 - +2грн/шт, А5 - +4грн/шт, A4 - +8грн/шт, А3 - +16грн/шт)
                </SelectItem>
                <SelectItem value="clear-film">
                  Плівка прозора (A6 - +6грн/шт, А5 - +11грн/шт, A4 - +23грн/шт, А3 - +46грн/шт)
                </SelectItem>
                <SelectItem value="silver-film">
                  Плівка срібло (A6 - +12грн/шт, А5 - +24грн/шт, A4 - +48грн/шт, А3 - +96грн/шт)
                </SelectItem>
                <SelectItem value="gold-film">
                  Плівка золото (A6 - +12грн/шт, А5 - +24грн/шт, A4 - +48грн/шт, А3 - +96грн/шт)
                </SelectItem>
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
                <SelectItem value="glossy">
                  Глінсова (A6 - +0грн/шт, А5 - +0грн/шт, A4 - +0грн/шт, А3 - +0грн/шт)
                </SelectItem>
                <SelectItem value="matte">
                  Матова (A6 - +1грн/шт, А5 - +1грн/шт, A4 - +1грн/шт, А3 - +1грн/шт)
                </SelectItem>
                <SelectItem value="soft-touch">
                  Soft touch (A6 - +14грн/шт, А5 - +14грн/шт, A4 - +14грн/шт, А3 - +14грн/шт)
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Таблица с динамическими ценами */}
      <Table className="border-3">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Количество</TableHead>
            <TableHead>A6</TableHead>
            <TableHead>A5</TableHead>
            <TableHead>A4</TableHead>
            <TableHead>A3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calculatedInvoices.map((invoice) => (
            <TableRow key={invoice.amount}>
              <TableCell className="font-medium">{invoice.amount}</TableCell>
              <TableCell>{invoice.a6}грн</TableCell>
              <TableCell>{invoice.a5}грн</TableCell>
              <TableCell>{invoice.a4}грн</TableCell>
              <TableCell>{invoice.a3}грн</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}