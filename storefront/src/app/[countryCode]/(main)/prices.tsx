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
const invoices = [
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
const [pricesOpen, setPricesOpen] = useState(true)
const [quantity, setQuantity] = useState([50])
  return (
      
                     

                       <div className="flex max-w-sm flex-col gap-6">
                         <Tabs defaultValue="account" className="pt-6">
                           {/* <TabsList>
                             <TabsTrigger value="account">Account</TabsTrigger>
                             <TabsTrigger value="password">Password</TabsTrigger>
                           </TabsList> */}
                           <TabsContent value="account" className="flex flex-col gap-5">
                             
                               {/* <CardContent> */}
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
                                   {/* <TableFooter>
                                     <TableRow>
                                       <TableCell >
                                        {quantity[0]} шт. 
                                        </TableCell>


                                        
                                        <TableCell>
                                            {quantity[0] < 50 && (
                                            <span>{(quantity[0] * 28)} грн</span>
                                            )}
                                            {quantity[0] >= 50 && quantity[0] < 100 && (
                                            <span>{(quantity[0] * 20)} грн</span>
                                            )}
                                            {quantity[0] >= 100 && quantity[0] < 500 && (
                                            <span>{(quantity[0] * 14)} грн</span>
                                            )}
                                            {quantity[0] >= 500 && quantity[0] < 1000 && (
                                            <span>{(quantity[0] * 11)} грн</span>
                                            )}
                                            {quantity[0] >= 1000 && quantity[0] <= 2500 && (
                                            <span>{(quantity[0] * 10)} грн</span>
                                            )}

                                        </TableCell>

                                        <TableCell>
                                            {quantity[0] < 50 && (
                                            <span>{(quantity[0] * 46)} грн</span>
                                            )}
                                            {quantity[0] >= 50 && quantity[0] < 100 && (
                                            <span>{(quantity[0] * 30)} грн</span>
                                            )}
                                            {quantity[0] >= 100 && quantity[0] < 500 && (
                                            <span>{(quantity[0] * 25)} грн</span>
                                            )}
                                            {quantity[0] >= 500 && quantity[0] < 1000 && (
                                            <span>{(quantity[0] * 22)} грн</span>
                                            )}
                                            {quantity[0] >= 1000 && quantity[0] <= 2500 && (
                                            <span>{(quantity[0] * 18)} грн</span>
                                            )}

                                        </TableCell>
                                        <TableCell>
                                            {quantity[0] < 50 && (
                                            <span>{(quantity[0] * 64)} грн</span>
                                            )}
                                            {quantity[0] >= 50 && quantity[0] < 100 && (
                                            <span>{(quantity[0] * 54)} грн</span>
                                            )}
                                            {quantity[0] >= 100 && quantity[0] < 500 && (
                                            <span>{(quantity[0] * 44)} грн</span>
                                            )}
                                            {quantity[0] >= 500 && quantity[0] < 1000 && (
                                            <span>{(quantity[0] * 38)} грн</span>
                                            )}
                                            {quantity[0] >= 1000 && quantity[0] <= 2500 && (
                                            <span>{(quantity[0] * 34)} грн</span>
                                            )}

                                        </TableCell>
                                        <TableCell>
                                            {quantity[0] < 50 && (
                                            <span>{(quantity[0] * 108)} грн</span>
                                            )}
                                            {quantity[0] >= 50 && quantity[0] < 100 && (
                                            <span>{(quantity[0] * 100)} грн</span>
                                            )}
                                            {quantity[0] >= 100 && quantity[0] < 500 && (
                                            <span>{(quantity[0] * 76)} грн</span>
                                            )}
                                            {quantity[0] >= 500 && quantity[0] < 1000 && (
                                            <span>{(quantity[0] * 70)} грн</span>
                                            )}
                                            {quantity[0] >= 1000 && quantity[0] <= 2500 && (
                                            <span>{(quantity[0] * 62)} грн</span>
                                            )}

                                        </TableCell>

                                        
                                     </TableRow>
                                   </TableFooter> */}
                                 </Table>

{/*                                     
                                <Slider
                                    value={quantity}
                                            onValueChange={setQuantity}
                                    defaultValue={[50]}
                                    max={2500}
                                    step={1}
                                    min={5}
                                    className={cn("w-full", className)}
                                    {...props}
                                /> */}

                                <div>
                               <Select>
                                <Label>Матеріал</Label>
                                 <SelectTrigger className="w-full">
                                   <SelectValue placeholder="Матеріал" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectGroup>
                                     {/* <SelectLabel>Fruits</SelectLabel> */}
                                     <SelectItem value="apple">Самоклеючий папір</SelectItem>
                                     <SelectItem value="banana">Плівка біла</SelectItem>
                                     <SelectItem value="blueberry">Плівка прозора</SelectItem>
                                     <SelectItem value="grapes">Плівка срібло</SelectItem>
                                     <SelectItem value="pineapple">Плівка золото</SelectItem>
                                   </SelectGroup>
                                 </SelectContent>
                               </Select>
                                </div>

   
                                <div>
                                <Select>
                                    <Label>Ламінація</Label>
                                 <SelectTrigger className="w-full">
                                   <SelectValue placeholder="Ламінація" />
                                 </SelectTrigger>
                                 <SelectContent>
                                   <SelectGroup>
                                     {/* <SelectLabel>Fruits</SelectLabel> */}
                                     <SelectItem value="apple">Глінсова</SelectItem>
                                     <SelectItem value="banana">Матова</SelectItem>
                                     <SelectItem value="blueberry">Soft touch</SelectItem>
   
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
                               {invoices.map((invoice) => (
                                //  <TableRow key={invoice.invoice}>
                                //    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                //    <TableCell>{invoice.paymentStatus}</TableCell>
                                //    <TableCell>{invoice.paymentMethod}</TableCell>
                                //    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                //  </TableRow>
                                <TableRow key={invoice.amount}>
                                         <TableCell className="font-medium">{invoice.amount}</TableCell>
                                         <TableCell>{invoice.a6}</TableCell>
                                         <TableCell>{invoice.a5}</TableCell>
                                         <TableCell>{invoice.a4}</TableCell>
                                         <TableCell>{invoice.a3}</TableCell>
                                         <TableCell className="text-right">{invoice.amount}</TableCell>
                                       </TableRow>
                               ))}
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
                         <Button>Замовити </Button>
                       </div>

                      

                    
        

               
  )
}



