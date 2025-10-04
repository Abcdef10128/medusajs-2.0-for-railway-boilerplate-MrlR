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

import { Button } from "@lib/components/ui/button"




import { Input } from "@lib/components/ui/input"
import { Label } from "@lib/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@lib/components/ui/tabs"
import { cn } from "@lib/lib/utils"



import { useMemo, useState } from "react"
import { Mail } from "lucide-react"


export default function PricesComponent() {
 const [selectedSize, setSelectedSize] = useState('');

 const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedLamination, setSelectedLamination] = useState('');

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
  },  {
    amount: "100",
    a6: 1650,
    a5: 2850,
    a4: 5000,
    a3: 8750,
  },  {
    amount: "500",
    a6: 6400,
    a5: 11000,
    a4: 19000,
    a3: 35000,
  },  {
    amount: "1000",
    a6: 11000,
    a5: 19000,
    a4: 35000,
    a3: 64000,
  }, {
    amount: "2500",
    a6: 24000,
    a5: 44000,
    a4: 80000,
    a3: 145000,
  },

]
const materialPrices = {
    'paper': { a6: 0, a5: 0, a4: 0, a3: 0 },
    'white-film': { a6: 2, a5: 4, a4: 8, a3: 16 },
    'clear-film': { a6: 6, a5: 11, a4: 23, a3: 46 },
    'silver-film': { a6: 12, a5: 24, a4: 48, a3: 96 },
    'gold-film': { a6: 12, a5: 24, a4: 48, a3: 96 },
  };

  // Доплаты за ламинацию (за штуку)
  const laminationPrices = {
    'glossy': { a6: 0, a5: 0, a4: 0, a3: 0 },
    'matte': { a6: 1, a5: 1, a4: 1, a3: 1 },
    'soft-touch': { a6: 14, a5: 14, a4: 14, a3: 14 },
  };

  
const calculatedInvoices = useMemo(() => {
    const materialExtra = materialPrices[selectedMaterial] || { a6: 0, a5: 0, a4: 0, a3: 0 };
    const laminationExtra = laminationPrices[selectedLamination] || { a6: 0, a5: 0, a4: 0, a3: 0 };

    return baseInvoices.map(invoice => {
      const quantity = parseInt(invoice.amount);
      
      return {
        amount: invoice.amount,
        a6: invoice.a6 + (materialExtra.a6 + laminationExtra.a6) * quantity,
        a5: invoice.a5 + (materialExtra.a5 + laminationExtra.a5) * quantity,
        a4: invoice.a4 + (materialExtra.a4 + laminationExtra.a4) * quantity,
        a3: invoice.a3 + (materialExtra.a3 + laminationExtra.a3) * quantity,
      };
    });
  }, [selectedMaterial, selectedLamination]);


  const handleOrder = () => {
  const subject = encodeURIComponent('Замовлення наклейок')
  const body = encodeURIComponent(`
Добрий день!

Хочу замовити наклейки:
- Розмір: ${selectedSize}
- Матеріал: ${selectedMaterial}
- Ламінація: ${selectedLamination}
Далі прикрипіть документ з наліпками з векторною розміткою місць вирізу


  `)
  
  window.location.href = `mailto:smerch10128@gmail.com?subject=${subject}&body=${body}`
}

  return (
      
                     

                       <div className="flex max-w-[500px] flex-col gap-6">
                         <Tabs defaultValue="account" className="pt-6">
                           {/* <TabsList>
                             <TabsTrigger value="account">Account</TabsTrigger>
                             <TabsTrigger value="password">Password</TabsTrigger>
                           </TabsList> */}
                           <TabsContent value="account" className="flex flex-col gap-5">
                             
                               {/* <CardContent> */}
                                <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
                                  Стікери
                                </h2>

                                 <Table className="border-3">
                                  
                                   {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                   <TableHeader>
                                     <TableRow>
                                       <TableHead className="w-[100px]"></TableHead>
                                       <TableHead>A6</TableHead>
                                       <TableHead>A5</TableHead>
                                       <TableHead>A4</TableHead>
                                       <TableHead >A3</TableHead>
                                     </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                     {calculatedInvoices.map((invoice) => (
                                       <TableRow key={invoice.amount}>
                                         <TableCell className="font-medium">{invoice.amount}</TableCell>
                                         <TableCell>{invoice.a6} грн</TableCell>
                                         <TableCell>{invoice.a5} грн</TableCell>
                                         <TableCell>{invoice.a4} грн</TableCell>
                                         <TableCell>{invoice.a3} грн</TableCell>
                                       </TableRow>
                                     ))}
                                   </TableBody>

                                 </Table>


                                  <div>
                               <Select value={selectedSize} onValueChange={setSelectedSize}>
                                <Label>Формат бумаги</Label>
                                 <SelectTrigger className="w-full">
                                   <SelectValue placeholder="Формат бумаги" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectGroup>
                                     {/* <SelectLabel>Fruits</SelectLabel> */}
                                     <SelectItem value="A6">A6</SelectItem>
                                     <SelectItem value="A5">A5</SelectItem>
                                     <SelectItem value="A4">A4</SelectItem>
                                     <SelectItem value="A3">A3</SelectItem>
                                   </SelectGroup>
                                 </SelectContent>
                               </Select>
                                </div>
                                <div>
                               <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                                <Label>Матеріал</Label>
                                 <SelectTrigger className="w-full">
                                   <SelectValue placeholder="Матеріал" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectGroup>
                                     {/* <SelectLabel>Fruits</SelectLabel> */}
                                     <SelectItem value="paper">Самоклеючий папір</SelectItem>
                                     <SelectItem value="white-film">Плівка біла</SelectItem>
                                     <SelectItem value="clear-film">Плівка прозора</SelectItem>
                                     <SelectItem value="silver-film">Плівка срібло</SelectItem>
                                     <SelectItem value="gold-film">Плівка золото</SelectItem>
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
                                     {/* <SelectLabel>Fruits</SelectLabel> */}
                                     <SelectItem value="glossy">Глінсова</SelectItem>
                                     <SelectItem value="matte">Матова</SelectItem>
                                     <SelectItem value="soft-touch">Soft touch</SelectItem>
   
                                   </SelectGroup>
                                 </SelectContent>
                               </Select> 
                                    </div>   
   

   

                             
                           </TabsContent>
                           <TabsContent value="password">
                             <Table>
                             <TableCaption>A list of your recent invoices.</TableCaption>
                             <TableHeader>
                               <TableRow>
                                 <TableHead className="w-[100px]">Invoice</TableHead>
                                 <TableHead>Status</TableHead>
                                 <TableHead>Method</TableHead>
                                 <TableHead className="text-right">Amount</TableHead>
                               </TableRow>
                             </TableHeader>
                             <TableBody>

                             </TableBody>
                             <TableFooter>
                               <TableRow>
                                 <TableCell colSpan={3}>Total</TableCell>
                                 <TableCell className="text-right">$2,500.00</TableCell>
                               </TableRow>
                             </TableFooter>
                           </Table>

                           </TabsContent>
                         </Tabs>
                         <Button onClick={handleOrder}>
                            Замовити <Mail/> smerch10128@gmail.com
                          
                          </Button>
                       </div>

                      

                    
        

               
  )
}



