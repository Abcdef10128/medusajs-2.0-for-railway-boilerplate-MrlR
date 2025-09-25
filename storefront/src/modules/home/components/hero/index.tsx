"use client"

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"

import * as React from "react"

import { Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi, } from "@lib/components/ui/carousel"
import { Card, CardContent } from "@lib/components/ui/card"



const Hero = () => {

  return (
        
    <div className="w-full">
      {/* Hero секция */}
      {/* <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
          <span>
            <Heading
              level="h1"
              className="text-3xl leading-10 text-ui-fg-base font-normal"
            >
              Well done1111! You have successfully deployed your Medusa 2.0 store on Railway!
            </Heading>
            <Heading
              level="h2"
              className="text-3xl leading-10 text-ui-fg-subtle font-normal"
            >
              Need help customizing your store?
            </Heading>
          </span>
          
          <a
            href="https://funkyton.com/medusajs-2-0-is-finally-here/"
            target="_blank"
          >
            <h1>
              Visit the tutorial
            </h1>
          </a>
        </div>
      </div> */}

      {/* Слайдер */}
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Секция товаров */}
      <div className="py-12 content-container">
        <div className="mb-8 text-center">
          <Heading level="h2" className="text-2xl-semi">
            All products
          </Heading>
        </div>
        
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy="created_at"
            page={1}
            countryCode={"ua"}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default Hero