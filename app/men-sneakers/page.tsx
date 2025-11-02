import { fetchEntriesByContentType } from '../../lib/contentstack'

export const dynamic = 'force-dynamic'

export default async function MenSneakersListPage() {
  const entries = await fetchEntriesByContentType<any>('men_sneakers')

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-primary text-4xl md:text-5xl font-bold text-gray-900 mb-6">Men Sneakers</h1>
        {entries.length === 0 ? (
          <p className="text-gray-600">No sneakers found. Publish entries to the production environment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {entries.map((item: any) => {
              const img = item.product_images?.[0]?.url
              return (
                <a key={item.uid} href="#" className="group block rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition">
                  <div className="aspect-[4/3] bg-gray-100">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}


