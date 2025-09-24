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

import { Suspense } from "react"
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

// Если вам нужен только компонент Hero с товарами
const Hero = ({ countryCode }: { countryCode: string }) => {
  return (
    <>
      {/* Hero секция */}
      <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
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
      </div>

      {/* Секция с товарами */}
      <div className="content-container py-16">
        <div className="mb-8">
          <Heading level="h2" className="text-2xl-semi">
            Featured Products
          </Heading>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy="created_at"
            page={1}
            countryCode={countryCode}
            limit={8} // Ограничиваем количество товаров на главной
          />
        </Suspense>
      </div>
    </>
  )
}

export default Hero
