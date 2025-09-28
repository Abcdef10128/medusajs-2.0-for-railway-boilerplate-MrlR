// "use client"

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@lib/components/ui/table"

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@lib/components/ui/select"

// import Image from "next/image"
// const invoices = [
//   {
//     amount: "10",
//     a6: "550грн",
//     a5: "700грн",
//     a4: "1000грн",
//     a3: "1250грн",
//   },
//     {
//     amount: "50",
//     a6: "1200грн",
//     a5: "1600грн",
//     a4: "2800грн",
//     a3: "5000грн",
//   },  {
//     amount: "100",
//     a6: "1650грн",
//     a5: "2850грн",
//     a4: "5000грн",
//     a3: "8750грн",
//   },  {
//     amount: "500",
//     a6: "6400грн",
//     a5: "11000грн",
//     a4: "19000грн",
//     a3: "35000грн",
//   },  {
//     amount: "1000",
//     a6: "11000грн",
//     a5: "19000грн",
//     a4: "35000грн",
//     a3: "64000грн",
//   }, {
//     amount: "2500",
//     a6: "24000грн",
//     a5: "44000грн",
//     a4: "80000грн",
//     a3: "145000грн",
//   },

// ]

// import { Button } from "@lib/components/ui/button"
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@lib/components/ui/dialog"
// import { AppWindowIcon, CodeIcon } from "lucide-react"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@lib/components/ui/card"
// import { Input } from "@lib/components/ui/input"
// import { Label } from "@lib/components/ui/label"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@lib/components/ui/tabs"
// import { cn } from "@lib/lib/utils"
// import { Slider } from "@lib/components/ui/slider"
// type SliderProps = React.ComponentProps<typeof Slider>

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@lib/components/ui/tooltip"
// import { useState } from "react"



// export default function PricesComponent({ className, ...props }: SliderProps) {
// const [pricesOpen, setPricesOpen] = useState(true)
// const [quantity, setQuantity] = useState([50])
//   return (
      
                     

//                        <div className="flex max-w-sm flex-col gap-6">
//                          <Tabs defaultValue="account" className="pt-6">
//                            {/* <TabsList>
//                              <TabsTrigger value="account">Account</TabsTrigger>
//                              <TabsTrigger value="password">Password</TabsTrigger>
//                            </TabsList> */}
//                            <TabsContent value="account" className="flex flex-col gap-5">
                             
//                                {/* <CardContent> */}
//                                  <Table className="border-3">
//                                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
//                                    <TableHeader>
//                                      <TableRow>
//                                        <TableHead className="w-[100px]"></TableHead>
//                                        <TableHead>A6</TableHead>
//                                        <TableHead>A5</TableHead>
//                                        <TableHead>A4</TableHead>
//                                        <TableHead >A3</TableHead>
//                                      </TableRow>
//                                    </TableHeader>
//                                    <TableBody>
//                                      {invoices.map((invoice) => (
//                                        <TableRow key={invoice.amount}>
//                                          <TableCell className="font-medium">{invoice.amount}</TableCell>
//                                          <TableCell>{invoice.a6}</TableCell>
//                                          <TableCell>{invoice.a5}</TableCell>
//                                          <TableCell>{invoice.a4}</TableCell>
//                                          <TableCell>{invoice.a3}</TableCell>
//                                        </TableRow>
//                                      ))}
//                                    </TableBody>

//                                  </Table>



//                                 <div>
//                                <Select>
//                                 <Label>Матеріал</Label>
//                                  <SelectTrigger className="w-full">
//                                    <SelectValue placeholder="Матеріал" />
//                                  </SelectTrigger>
//                                  <SelectContent>
//                                    <SelectGroup>
//                                      {/* <SelectLabel>Fruits</SelectLabel> */}
//                                      <SelectItem value="">Самоклеючий папір</SelectItem>
//                                      <SelectItem value="">Плівка біла</SelectItem>
//                                      <SelectItem value="">Плівка прозора</SelectItem>
//                                      <SelectItem value="">Плівка срібло</SelectItem>
//                                      <SelectItem value="">Плівка золото</SelectItem>
//                                    </SelectGroup>
//                                  </SelectContent>
//                                </Select>
//                                 </div>

   
//                                 <div>
//                                 <Select>
//                                     <Label>Ламінація</Label>
//                                  <SelectTrigger className="w-full">
//                                    <SelectValue placeholder="Ламінація" />
//                                  </SelectTrigger>
//                                  <SelectContent>
//                                    <SelectGroup>
//                                      {/* <SelectLabel>Fruits</SelectLabel> */}
//                                      <SelectItem value="">Глінсова</SelectItem>
//                                      <SelectItem value="">Матова</SelectItem>
//                                      <SelectItem value="">Soft touch</SelectItem>
   
//                                    </SelectGroup>
//                                  </SelectContent>
//                                </Select> 
//                                     </div>   
   

   

                             
//                            </TabsContent>
//                            <TabsContent value="password">
//                              <Table>
//                              <TableCaption>A list of your recent invoices.</TableCaption>
//                              <TableHeader>
//                                <TableRow>
//                                  <TableHead className="w-[100px]">Invoice</TableHead>
//                                  <TableHead>Status</TableHead>
//                                  <TableHead>Method</TableHead>
//                                  <TableHead className="text-right">Amount</TableHead>
//                                </TableRow>
//                              </TableHeader>
//                              <TableBody>
//                                {invoices.map((invoice) => (
//                                 //  <TableRow key={invoice.invoice}>
//                                 //    <TableCell className="font-medium">{invoice.invoice}</TableCell>
//                                 //    <TableCell>{invoice.paymentStatus}</TableCell>
//                                 //    <TableCell>{invoice.paymentMethod}</TableCell>
//                                 //    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
//                                 //  </TableRow>
//                                 <TableRow key={invoice.amount}>
//                                          <TableCell className="font-medium">{invoice.amount}</TableCell>
//                                          <TableCell>{invoice.a6}</TableCell>
//                                          <TableCell>{invoice.a5}</TableCell>
//                                          <TableCell>{invoice.a4}</TableCell>
//                                          <TableCell>{invoice.a3}</TableCell>
//                                          <TableCell className="text-right">{invoice.amount}</TableCell>
//                                        </TableRow>
//                                ))}
//                              </TableBody>
//                              <TableFooter>
//                                <TableRow>
//                                  <TableCell colSpan={3}>Total</TableCell>
//                                  <TableCell className="text-right">$2,500.00</TableCell>
//                                </TableRow>
//                              </TableFooter>
//                            </Table>

//                            </TabsContent>
//                          </Tabs>
//                          <Button>Замовити </Button>
//                        </div>

                      

                    
        

               
//   )
// }
"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
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
  SelectTrigger,
  SelectValue,
} from "@lib/components/ui/select"
import { Label } from "@lib/components/ui/label"
import { Slider } from "@lib/components/ui/slider"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@lib/components/ui/tabs"

// Базовые цены для разных количеств и форматов
const basePrices = {
  50: { a6: 28, a5: 46, a4: 64, a3: 108 },
  100: { a6: 20, a5: 30, a4: 54, a3: 100 },
  500: { a6: 14, a5: 25, a4: 44, a3: 76 },
  1000: { a6: 11, a5: 22, a4: 38, a3: 70 },
  2500: { a6: 10, a5: 18, a4: 34, a3: 62 }
}

// Надбавки за материал
const materialPrices = {
  paper: { a6: 0, a5: 0, a4: 0, a3: 0 },
  film_white: { a6: 2, a5: 4, a4: 8, a3: 16 },
  film_clear: { a6: 6, a5: 11, a4: 23, a3: 46 },
  film_silver: { a6: 12, a5: 24, a4: 48, a3: 96 },
  film_gold: { a6: 12, a5: 24, a4: 48, a3: 96 }
}

// Надбавки за ламинацию
const laminationPrices = {
  gloss: { a6: 0, a5: 0, a4: 0, a3: 0 },
  matte: { a6: 1, a5: 1, a4: 1, a3: 1 },
  soft_touch: { a6: 14, a5: 14, a4: 14, a3: 14 }
}

const invoices = [
  { amount: "10", a6: "550грн", a5: "700грн", a4: "1000грн", a3: "1250грн" },
  { amount: "50", a6: "1200грн", a5: "1600грн", a4: "2800грн", a3: "5000грн" },
  { amount: "100", a6: "1650грн", a5: "2850грн", a4: "5000грн", a3: "8750грн" },
  { amount: "500", a6: "6400грн", a5: "11000грн", a4: "19000грн", a3: "35000грн" },
  { amount: "1000", a6: "11000грн", a5: "19000грн", a4: "35000грн", a3: "64000грн" },
  { amount: "2500", a6: "24000грн", a5: "44000грн", a4: "80000грн", a3: "145000грн" }
]

export default function PricesComponent() {
  const [quantity, setQuantity] = useState([50])
  const [selectedMaterial, setSelectedMaterial] = useState("")
  const [selectedLamination, setSelectedLamination] = useState("")

  // Функция для получения базовой цены по количеству
  const getBasePriceForQuantity = (qty: number, format: 'a6' | 'a5' | 'a4' | 'a3') => {
    if (qty < 50) return qty * 28 // для A6, нужно адаптировать для других форматов
    if (qty >= 50 && qty < 100) return basePrices[50][format] * qty / 50
    if (qty >= 100 && qty < 500) return basePrices[100][format] * qty / 100
    if (qty >= 500 && qty < 1000) return basePrices[500][format] * qty / 500
    if (qty >= 1000 && qty <= 2500) return basePrices[1000][format] * qty / 1000
    return basePrices[2500][format] * qty / 2500
  }

  // Функция расчета итоговой цены с учетом материала и ламинации
  const calculatePrice = (qty: number, format: 'a6' | 'a5' | 'a4' | 'a3') => {
    let pricePerUnit = 0

    // Базовая цена за единицу в зависимости от количества
    if (qty < 50) {
      const baseRates = { a6: 28, a5: 46, a4: 64, a3: 108 }
      pricePerUnit = baseRates[format]
    } else if (qty >= 50 && qty < 100) {
      pricePerUnit = basePrices[50][format]
    } else if (qty >= 100 && qty < 500) {
      pricePerUnit = basePrices[100][format]
    } else if (qty >= 500 && qty < 1000) {
      pricePerUnit = basePrices[500][format]
    } else if (qty >= 1000 && qty <= 2500) {
      pricePerUnit = basePrices[1000][format]
    } else {
      pricePerUnit = basePrices[2500][format]
    }

    // Добавляем надбавку за материал
    const materialKey = selectedMaterial as keyof typeof materialPrices
    if (materialKey && materialPrices[materialKey]) {
      pricePerUnit += materialPrices[materialKey][format]
    }

    // Добавляем надбавку за ламинацию
    const laminationKey = selectedLamination as keyof typeof laminationPrices
    if (laminationKey && laminationPrices[laminationKey]) {
      pricePerUnit += laminationPrices[laminationKey][format]
    }

    return pricePerUnit * qty
  }

  return (
    <div className="flex max-w-4xl flex-col gap-6 p-6">
      <Tabs defaultValue="calculator" className="pt-6">
        <TabsList>
          <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
          <TabsTrigger value="pricelist">Прайс-лист</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="flex flex-col gap-5">
          {/* Слайдер количества */}
          <div className="space-y-2">
            <Label>Количество: {quantity[0]} шт.</Label>
            <Slider
              value={quantity}
              onValueChange={setQuantity}
              max={2500}
              step={1}
              className="w-full"
            />
          </div>

          {/* Селекты */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Материал</Label>
              <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите материал" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="paper">Самоклеящаяся бумага</SelectItem>
                    <SelectItem value="film_white">
                      Пленка белая (A6: +2грн, A5: +4грн, A4: +8грн, A3: +16грн)
                    </SelectItem>
                    <SelectItem value="film_clear">
                      Пленка прозрачная (A6: +6грн, A5: +11грн, A4: +23грн, A3: +46грн)
                    </SelectItem>
                    <SelectItem value="film_silver">
                      Пленка серебро (A6: +12грн, A5: +24грн, A4: +48грн, A3: +96грн)
                    </SelectItem>
                    <SelectItem value="film_gold">
                      Пленка золото (A6: +12грн, A5: +24грн, A4: +48грн, A3: +96грн)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ламинация</Label>
              <Select value={selectedLamination} onValueChange={setSelectedLamination}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите ламинацию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="gloss">Глянцевая (+0грн за шт.)</SelectItem>
                    <SelectItem value="matte">Матовая (+1грн за шт.)</SelectItem>
                    <SelectItem value="soft_touch">Soft touch (+14грн за шт.)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Таблица с динамическими ценами */}
          <Table className="border">
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
              {/* Показываем статичные данные для примера */}
              {invoices.slice(0, 3).map((invoice) => (
                <TableRow key={invoice.amount}>
                  <TableCell className="font-medium">{invoice.amount}</TableCell>
                  <TableCell>{invoice.a6}</TableCell>
                  <TableCell>{invoice.a5}</TableCell>
                  <TableCell>{invoice.a4}</TableCell>
                  <TableCell>{invoice.a3}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow className="bg-muted/50">
                <TableCell className="font-medium">
                  {quantity[0]} шт.
                </TableCell>
                <TableCell className="font-bold">
                  {Math.round(calculatePrice(quantity[0], 'a6'))} грн
                </TableCell>
                <TableCell className="font-bold">
                  {Math.round(calculatePrice(quantity[0], 'a5'))} грн
                </TableCell>
                <TableCell className="font-bold">
                  {Math.round(calculatePrice(quantity[0], 'a4'))} грн
                </TableCell>
                <TableCell className="font-bold">
                  {Math.round(calculatePrice(quantity[0], 'a3'))} грн
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          {/* Информация о выборе */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-semibold">Детали заказа:</h3>
            <p className="text-sm">
              <strong>Количество:</strong> {quantity[0]} шт.
            </p>
            <p className="text-sm">
              <strong>Материал:</strong> {
                selectedMaterial === 'paper' ? 'Самоклеящаяся бумага' :
                selectedMaterial === 'film_white' ? 'Пленка белая' :
                selectedMaterial === 'film_clear' ? 'Пленка прозрачная' :
                selectedMaterial === 'film_silver' ? 'Пленка серебро' :
                selectedMaterial === 'film_gold' ? 'Пленка золото' :
                'Не выбран'
              }
            </p>
            <p className="text-sm">
              <strong>Ламинация:</strong> {
                selectedLamination === 'gloss' ? 'Глянцевая' :
                selectedLamination === 'matte' ? 'Матовая' :
                selectedLamination === 'soft_touch' ? 'Soft touch' :
                'Не выбрана'
              }
            </p>
            
            {(selectedMaterial || selectedLamination) && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                <p className="text-sm font-medium text-green-800">
                  Цены в нижней строке таблицы обновлены с учетом ваших параметров!
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="pricelist">
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Количество</TableHead>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}


