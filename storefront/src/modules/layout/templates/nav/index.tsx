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

import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              <img src="C:\Users\Admin\Desktop\medusa\medusajs-2.0-for-railway-boilerplate-MrlR\storefront\public\logo_vector_png.png" alt="" />
              smerch
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <LocalizedClientLink
                      className="hover:text-ui-fg-base"
                      href="#"
                      data-testid="nav-account-link"
                    >
                      Ціни
                    </LocalizedClientLink>
                  </DialogTrigger>
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
                    <div className="flex w-full max-w-sm flex-col gap-6">
                      <Tabs defaultValue="account">
                        <TabsList>
                          <TabsTrigger value="account">Account</TabsTrigger>
                          <TabsTrigger value="password">Password</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                          <Card>
                            <CardHeader>
                              <CardTitle>Account</CardTitle>
                              <CardDescription>
                                Make changes to your account here. Click save when you&apos;re
                                done.
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-name">Name</Label>
                                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-username">Username</Label>
                                <Input id="tabs-demo-username" defaultValue="@peduarte" />
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button>Save changes</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                        <TabsContent value="password">
                          <Card>
                            <CardHeader>
                              <CardTitle>Password</CardTitle>
                              <CardDescription>
                                Change your password here. After saving, you&apos;ll be logged
                                out.
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                              <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-current">Current password</Label>
                                <Input id="tabs-demo-current" type="password" />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-new">New password</Label>
                                <Input id="tabs-demo-new" type="password" />
                              </div>
                            </CardContent>
                            <CardFooter>
                              <Button>Save password</Button>
                            </CardFooter>
                          </Card>
                        </TabsContent>
                      </Tabs>
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

              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
