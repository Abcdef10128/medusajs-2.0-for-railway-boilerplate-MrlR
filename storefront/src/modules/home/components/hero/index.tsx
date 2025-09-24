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
//           <h1>
//             Visit the tutorial
//           </h1>
//         </a>
//       </div>
//     </div>



    
    
//   )
// }

import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import { Suspense } from "react"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

// Вам нужно будет получить countryCode из вашего приложения
// Обычно это делается через контекст или пропсы
interface HeroProps {
  countryCode?: string
}

const Hero = ({ countryCode = "us" }: HeroProps) => {
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
            rel="noopener noreferrer"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline"
          >
            <h1>
              Visit the tutorial
            </h1>
          </a>
        </div>
      </div>

      {/* Секция с товарами */}
      <div className="content-container py-12">
        <div className="mb-8">
          <Heading 
            level="h2" 
            className="text-2xl-semi text-center small:text-left"
          >
            Наши товары
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

        {/* Кнопка "Смотреть все товары" */}
        <div className="flex justify-center mt-8">
          <Button
            variant="secondary"
            size="large"
            asChild
          >
            <a href="/store">
              Смотреть все товары
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}

export default Hero


