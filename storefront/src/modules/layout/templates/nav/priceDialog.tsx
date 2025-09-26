'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@lib/components/ui/button'

export function PriceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="hover:text-ui-fg-base cursor-pointer bg-transparent border-none text-inherit font-inherit">
          Ціни
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ціни</DialogTitle>
          <DialogDescription>
            Тут ви можете переглянути наші ціни та тарифи.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          {/* Содержимое диалога с ценами */}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Закрити</Button>
          </DialogClose>
          <Button type="submit">Зберегти</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}