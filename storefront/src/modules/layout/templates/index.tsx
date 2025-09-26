'use client'

import React from "react"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

import { useState } from 'react'


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




const Layout: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {

const [isPriceDialogOpen, setIsPriceDialogOpen] = useState(false)

  return (
    <div>

      <Nav onPriceClick={() => setIsPriceDialogOpen(true)} />
      <main className="relative">{children}</main>
      <Footer />

      <Dialog open={isPriceDialogOpen} onOpenChange={setIsPriceDialogOpen}>
      <form>

              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
      
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
                
              </DialogContent>

          </form>
      </Dialog>
    </div>
  )
}

export default Layout
