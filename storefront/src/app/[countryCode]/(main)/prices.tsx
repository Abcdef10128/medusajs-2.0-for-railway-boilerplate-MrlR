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
    invoice: "4",
    paymentStatus: "422грн",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
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



import { useState } from "react"
export default function PricesComponent() {
const [pricesOpen, setPricesOpen] = useState(true)

  return (
      
                     

                       <div className="flex max-w-sm flex-col gap-6">
                         <Tabs defaultValue="account">
                           <TabsList>
                             <TabsTrigger value="account">Account</TabsTrigger>
                             <TabsTrigger value="password">Password</TabsTrigger>
                           </TabsList>
                           <TabsContent value="account" className="gap-4">
                             
                               {/* <CardContent> */}
                                 <Table className="border-3">
                                   {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                   <TableHeader>
                                     <TableRow>
                                       <TableHead className="w-[100px]"></TableHead>
                                       <TableHead>A6</TableHead>
                                       <TableHead>A5</TableHead>
                                       <TableHead>A4</TableHead>
                                       <TableHead className="text-right">A3</TableHead>
                                     </TableRow>
                                   </TableHeader>
                                   <TableBody>
                                     {invoices.map((invoice) => (
                                       <TableRow key={invoice.invoice}>
                                         <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                         <TableCell>{invoice.paymentStatus}</TableCell>
                                         <TableCell>{invoice.paymentMethod}</TableCell>
                                         <TableCell className="text-right">{invoice.totalAmount}</TableCell>
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
                                 <TableRow key={invoice.invoice}>
                                   <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                   <TableCell>{invoice.paymentStatus}</TableCell>
                                   <TableCell>{invoice.paymentMethod}</TableCell>
                                   <TableCell className="text-right">{invoice.totalAmount}</TableCell>
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
                       </div>

                      

                    
        

               
  )
}



