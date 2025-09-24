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

<<<<<<< HEAD
import { Suspense } from "react"
import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

const Hero = ({ countryCode }: { countryCode: string }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
=======
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
>>>>>>> 1f2ace41a02b22bb04a1ebffe9f6707e115e92c4
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
<<<<<<< HEAD
          <a
            href="https://funkyton.com/medusajs-2-0-is-finally-here/"
            target="_blank"
=======
          
          <a
            href="https://funkyton.com/medusajs-2-0-is-finally-here/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover underline"
>>>>>>> 1f2ace41a02b22bb04a1ebffe9f6707e115e92c4
          >
            <h1>
              Visit the tutorial
            </h1>
          </a>
        </div>
<<<<<<< HEAD
      </div>


      {/* Products Section */}
      <div className="py-12 content-container">
        <div className="mb-8">
          <Heading level="h2" className="text-2xl-semi mb-4">
            Featured Products
          </Heading>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy="created_at"
            page={1}
            countryCode={countryCode}
            limit={8} // Ограничиваем количество товаров для главной страницы
          />
        </Suspense>
      </div>
    </div>
=======
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
>>>>>>> 1f2ace41a02b22bb04a1ebffe9f6707e115e92c4
  )
}

export default Hero
<<<<<<< HEAD
=======


>>>>>>> 1f2ace41a02b22bb04a1ebffe9f6707e115e92c4
