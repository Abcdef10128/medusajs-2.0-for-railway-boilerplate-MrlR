// 'use client'

// export default function CollectionNav({ collections }) {
//   return (
//     <div className="sticky top-16 z-10">
//       <ul className="flex items-center max-w-[1392px] mx-auto overflow-x-auto gap-2 h-16">
//         {collections.map((collection) => (
//           <li key={collection.id} className="whitespace-nowrap">
//             <button
//             //   onClick={() => {
//             //     const element = document.getElementById(`collection-${collection.id}`)
//             //     element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
//             //   }}
//             onClick={() => {
//                 const element = document.getElementById(`collection-${collection.id}`)
//                 if (element) {
//                 const offset = 100 // отступ сверху в пикселях
//                 const elementPosition = element.getBoundingClientRect().top
//                 const offsetPosition = elementPosition + window.pageYOffset - offset
                
//                 window.scrollTo({
//                     top: offsetPosition,
//                     behavior: 'smooth'
//                 })
//                 }
//             }}
//               className="p-3 border rounded-xl hover:bg-gray-50 transition"
//             >
//               {collection.title}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

'use client'
import { useEffect, useState, useRef } from 'react'

export default function CollectionNav({ collections }) {
  const [activeCollection, setActiveCollection] = useState<string | null>(null)
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})
  const isUserScrolling = useRef(false)
  const scrollTimeout = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      isUserScrolling.current = true
      clearTimeout(scrollTimeout.current)
      
      scrollTimeout.current = setTimeout(() => {
        isUserScrolling.current = false
        
        let closestCollection = null
        let closestDistance = Infinity
        
        collections.forEach((collection) => {
          const element = document.getElementById(`collection-${collection.id}`)
          if (element) {
            const rect = element.getBoundingClientRect()
            const distance = Math.abs(rect.top - 150)
            
            if (distance < closestDistance && rect.bottom > 0) {
              closestDistance = distance
              closestCollection = collection.id
            }
          }
        })
        
        // Если не нашли коллекцию в зоне активации, выбираем первую видимую
        if (!closestCollection && collections.length > 0) {
          for (const collection of collections) {
            const element = document.getElementById(`collection-${collection.id}`)
            if (element) {
              const rect = element.getBoundingClientRect()
              // Если элемент хотя бы частично виден
              if (rect.bottom > 150) {
                closestCollection = collection.id
                break
              }
            }
          }
        }
        
        setActiveCollection(closestCollection)
      }, 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout.current)
    }
  }, [collections])

  const handleButtonClick = (collectionId: string) => {
    const element = document.getElementById(`collection-${collectionId}`)
    
    if (element) {
      const offset = 126
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="sticky top-16 z-20 backdrop-blur-xl ">
      {/* <ul className="flex items-center max-w-[1392px] mx-auto overflow-x-auto gap-2 h-16 px-4 scroll-smooth">
        {collections.map((collection) => (
          <li key={collection.id} className="whitespace-nowrap ">
            <button
              ref={(el) => (buttonRefs.current[collection.id] = el)}
              onClick={() => handleButtonClick(collection.id)}
              className={`py-2 px-3 rounded-full transition-all duration-200 ${
                activeCollection === collection.id
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-black hover:bg-gray-50'
              }`}
            >
              {collection.title}
            </button>
          </li>
        ))}
      </ul> */}
      <ul className="flex items-center max-w-[1392px] mx-auto overflow-x-auto gap-2 h-16 px-4 scroll-smooth">
  {collections
    .filter((collection) => collection.products?.length > 0)
    .map((collection) => (
      <li key={collection.id} className="whitespace-nowrap">
        <button
          ref={(el) => (buttonRefs.current[collection.id] = el)}
          onClick={() => handleButtonClick(collection.id)}
          className={`py-2 px-3 rounded-full transition-all duration-200 ${
            activeCollection === collection.id
              ? 'bg-black text-white border-black'
              : 'bg-white text-black hover:bg-gray-50'
          }`}
        >
          {collection.title}
        </button>
      </li>
    ))}
</ul>
    </div>
  )
}