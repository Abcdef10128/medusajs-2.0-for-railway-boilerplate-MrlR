// import { Github } from "@medusajs/icons"
// import { Button, Heading } from "@medusajs/ui"

// const Hero = () => {
//   return (
//     <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
//       <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
//         <span>
//           <Heading
//             level="h1"
//             className="text-3xl leading-10 text-ui-fg-base font-normal"
//           >
//             Well done1111! You have successfully deployed your Medusa 2.0 store on Railway!
//           </Heading>
//           <Heading
//             level="h2"
//             className="text-3xl leading-10 text-ui-fg-subtle font-normal"
//           >
//             Need help customizing your store?
//           </Heading>
//         </span>
//         <a
//           href="https://funkyton.com/medusajs-2-0-is-finally-here/"
//           target="_blank"
//         >
//           <h1 style={{ textDecoration: "underline" }}>
//             Visit the tutorial
//           </h1>
//         </a>
//       </div>
//     </div>
//   )
// }

// export default Hero

// components/featured-products.tsx
// components/featured-products.tsx
import { Suspense } from "react"
import { Heading } from "@medusajs/ui"
import { getProductsList } from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

async function FeaturedProductsList({ 
  countryCode,
  limit = 8 
}: { 
  countryCode: string
  limit?: number 
}) {
  // Получаем список товаров
  const { products } = await getProductsList({
    countryCode,
    limit,
    offset: 0,
    sortBy: "created_at"
  })

  return (
    <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8">
      {products.map((product) => (
        <ProductPreview
          key={product.id}
          product={product}
          countryCode={countryCode}
        />
      ))}
    </div>
  )
}

// Экспортируемый компонент для использования на главной
export default function FeaturedProducts({ countryCode }: { countryCode: string }) {
  return (
    <section className="content-container py-16">
      <div className="mb-8 flex flex-col gap-2">
        <Heading level="h2" className="text-3xl font-bold">
          Featured Products
        </Heading>
        <p className="text-ui-fg-subtle">
          Check out our latest collection
        </p>
      </div>
      
      <Suspense fallback={<SkeletonProductGrid />}>
        <FeaturedProductsList countryCode={countryCode} limit={8} />
      </Suspense>

      <div className="mt-12 flex justify-center">
        <a
          href="/store"
          className="inline-flex items-center justify-center px-6 py-3 border border-ui-border-base rounded-md text-ui-fg-base hover:bg-ui-bg-subtle transition-colors"
        >
          View All Products →
        </a>
      </div>
    </section>
  )
}