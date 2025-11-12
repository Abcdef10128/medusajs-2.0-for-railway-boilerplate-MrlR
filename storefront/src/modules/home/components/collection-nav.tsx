'use client'

export default function CollectionNav({ collections }) {
  return (
    <div className="mb-8 px-4 pt-4 sticky top-0 bg-white z-10 shadow-sm">
      <ul className="flex items-center max-w-[1392px] mx-auto overflow-x-auto gap-2 pb-2">
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