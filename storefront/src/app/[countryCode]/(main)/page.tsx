import { Metadata } from "next"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Smerch Store",
  description:
    "",
  
    
  // icons: {
  //   icon: ['storefront\public\favicon.ico?v=4'],
  //   apple: ['storefront\public\favicon.ico'],
  //   shortcut: ['storefront\public\favicon.ico']
  // }
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="mb-8 px-4">
        {/* <h2 className="text-2xl font-bold mb-4">Наши коллекции</h2> */}
        <ul className="space-y-2 flex">
          {collections.map((collection) => (
            <li key={collection.id} className="p-3 border rounded hover:bg-gray-50">
              {collection.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
