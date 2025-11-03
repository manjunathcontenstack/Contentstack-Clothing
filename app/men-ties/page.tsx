import { fetchEntriesByContentType } from '../../lib/contentstack'
import ProductListCard from '../components/ProductListCard'

export const revalidate = 60

export default async function MenTiesListPage() {
  const entries = await fetchEntriesByContentType<any>('men_ties')

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-primary text-4xl md:text-5xl font-bold text-gray-900 mb-6">Men Ties</h1>
        {entries.length === 0 ? (
          <p className="text-gray-600">No ties found. Publish entries to the production environment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {entries.map((item: any) => (
              <ProductListCard key={item.uid} item={item} href={`/men-ties/${item.uid}`} contentTypeUid="men_ties" />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}


