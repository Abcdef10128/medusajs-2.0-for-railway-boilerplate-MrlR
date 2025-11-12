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
    const observers: IntersectionObserver[] = []

    // Отслеживание прокрутки пользователем
    const handleScroll = () => {
      isUserScrolling.current = true
      clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        isUserScrolling.current = false
      }, 150)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    collections.forEach((collection) => {
      const element = document.getElementById(`collection-${collection.id}`)
      
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveCollection(collection.id)
                
                // Прокручивать кнопку только если пользователь НЕ кликнул
                if (!isUserScrolling.current) {
                  setTimeout(() => {
                    buttonRefs.current[collection.id]?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center'
                    })
                  }, 100)
                }
              }
            })
          },
          {
            threshold: 0.5, // Увеличил до 50% для более стабильного определения
            rootMargin: '-20% 0px -30% 0px' // Уменьшил отступы
          }
        )

        observer.observe(element)
        observers.push(observer)
      }
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observers.forEach((observer) => observer.disconnect())
      clearTimeout(scrollTimeout.current)
    }
  }, [collections])

  const handleButtonClick = (collectionId: string) => {
    isUserScrolling.current = true
    const element = document.getElementById(`collection-${collectionId}`)
    
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Сбросить флаг после завершения прокрутки
      setTimeout(() => {
        isUserScrolling.current = false
      }, 1000)
    }
  }

  return (
    <div className="sticky top-16 z-10 bg-white shadow-sm">
      <ul className="flex items-center max-w-[1392px] mx-auto overflow-x-auto gap-2 h-16 px-4 scroll-smooth">
        {collections.map((collection) => (
          <li key={collection.id} className="whitespace-nowrap">
            <button
              ref={(el) => (buttonRefs.current[collection.id] = el)}
              onClick={() => handleButtonClick(collection.id)}
              className={`p-3 border rounded-xl transition-all duration-200 ${
                activeCollection === collection.id
                  ? 'bg-black text-white border-black scale-105'
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