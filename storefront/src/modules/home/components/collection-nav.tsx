'use client'

export default function CollectionNav({ collections }) {
  return (
    <div className="sticky top-16 z-10">
      <ul className="flex items-center max-w-[1392px] mx-auto overflow-x-auto gap-2 h-16">
        {collections.map((collection) => (
          <li key={collection.id} className="whitespace-nowrap">
            <button
              onClick={() => {
                const element = document.getElementById(`collection-${collection.id}`)
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="p-3 border rounded-xl hover:bg-gray-50 transition"
            >
              {collection.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}