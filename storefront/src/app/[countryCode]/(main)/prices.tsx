"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@lib/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@lib/components/ui/select"

import Image from "next/image"
import { useMemo } from "react"
const baseInvoices = [
  {
    amount: "10",
    a6: "550грн",
    a5: "700грн",
    a4: "1000грн",
    a3: "1250грн",
  },
    {
    amount: "50",
    a6: "1200грн",
    a5: "1600грн",
    a4: "2800грн",
    a3: "5000грн",
  },  {
    amount: "100",
    a6: "1650грн",
    a5: "2850грн",
    a4: "5000грн",
    a3: "8750грн",
  },  {
    amount: "500",
    a6: "6400грн",
    a5: "11000грн",
    a4: "19000грн",
    a3: "35000грн",
  },  {
    amount: "1000",
    a6: "11000грн",
    a5: "19000грн",
    a4: "35000грн",
    a3: "64000грн",
  }, {
    amount: "2500",
    a6: "24000грн",
    a5: "44000грн",
    a4: "80000грн",
    a3: "145000грн",
  },

]

const materials = [
  { value: "paper", label: "Самоклеючий папір", prices: { a6: 0, a5: 0, a4: 0, a3: 0 } },
  { value: "film-white", label: "Плівка біла", prices: { a6: 2, a5: 4, a4: 8, a3: 16 } },
  { value: "film-clear", label: "Плівка прозора", prices: { a6: 6, a5: 11, a4: 23, a3: 46 } },
  { value: "film-silver", label: "Плівка срібло", prices: { a6: 12, a5: 24, a4: 48, a3: 96 } },
  { value: "film-gold", label: "Плівка золото", prices: { a6: 12, a5: 24, a4: 48, a3: 96 } },
]

// Данные о ламинации с ценами
const laminations = [
  { value: "gloss", label: "Глянсова", prices: { a6: 0, a5: 0, a4: 0, a3: 0 } },
  { value: "matt", label: "Матова", prices: { a6: 1, a5: 1, a4: 1, a3: 1 } },
  { value: "soft", label: "Soft touch", prices: { a6: 14, a5: 14, a4: 14, a3: 14 } },
]




import { Button } from "@lib/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@lib/components/ui/dialog"
import { AppWindowIcon, CodeIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@lib/components/ui/card"
import { Input } from "@lib/components/ui/input"
import { Label } from "@lib/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@lib/components/ui/tabs"
import { cn } from "@lib/lib/utils"
import { Slider } from "@lib/components/ui/slider"
type SliderProps = React.ComponentProps<typeof Slider>

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@lib/components/ui/tooltip"
import { useState } from "react"



export default function PricesComponent({ className, ...props }: SliderProps) {

  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [selectedLamination, setSelectedLamination] = useState("")

  // Вычисляем обновленные цены
  const updatedInvoices = useMemo(() => {
    const materialPrices = materials.find(m => m.value === selectedMaterial)?.prices || { a6: 0, a5: 0, a4: 0, a3: 0 }
    const laminationPrices = laminations.find(l => l.value === selectedLamination)?.prices || { a6: 0, a5: 0, a4: 0, a3: 0 }

    return baseInvoices.map(invoice => ({
      amount: invoice.amount,
      a6: `${invoice.a6 + (materialPrices.a6 + laminationPrices.a6) * parseInt(invoice.amount)}грн`,
      a5: `${invoice.a5 + (materialPrices.a5 + laminationPrices.a5) * parseInt(invoice.amount)}грн`,
      a4: `${invoice.a4 + (materialPrices.a4 + laminationPrices.a4) * parseInt(invoice.amount)}грн`,
      a3: `${invoice.a3 + (materialPrices.a3 + laminationPrices.a3) * parseInt(invoice.amount)}грн`,
    }))
  }, [selectedMaterial, selectedLamination])


const [pricesOpen, setPricesOpen] = useState(true)
const [quantity, setQuantity] = useState([50])
  return (
<div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="material">Матеріал</Label>
          <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
            <SelectTrigger id="material" className="w-full">
              <SelectValue placeholder="Виберіть матеріал" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {materials.map((material) => (
                  <SelectItem key={material.value} value={material.value}>
                    {material.label}
                    {material.prices.a6 > 0 && (
                      <span className="text-xs text-gray-500 block">
                        A6: +{material.prices.a6}грн, A5: +{material.prices.a5}грн, A4: +{material.prices.a4}грн, A3: +{material.prices.a3}грн
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="lamination">Ламінація</Label>
          <Select value={selectedLamination} onValueChange={setSelectedLamination}>
            <SelectTrigger id="lamination" className="w-full">
              <SelectValue placeholder="Виберіть ламінацію" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {laminations.map((lamination) => (
                  <SelectItem key={lamination.value} value={lamination.value}>
                    {lamination.label}
                    {lamination.prices.a6 > 0 && (
                      <span className="text-xs text-gray-500 block">
                        A6: +{lamination.prices.a6}грн, A5: +{lamination.prices.a5}грн, A4: +{lamination.prices.a4}грн, A3: +{lamination.prices.a3}грн
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Table className="border">
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
            {updatedInvoices.map((invoice) => (
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

        {/* Показываем выбранные опции */}
        {(selectedMaterial || selectedLamination) && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Вибрані опції:</strong>
            </p>
            {selectedMaterial && (
              <p className="text-sm">
                Матеріал: {materials.find(m => m.value === selectedMaterial)?.label}
              </p>
            )}
            {selectedLamination && (
              <p className="text-sm">
                Ламінація: {laminations.find(l => l.value === selectedLamination)?.label}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
               
  )
}

