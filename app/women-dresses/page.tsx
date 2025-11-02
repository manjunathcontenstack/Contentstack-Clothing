import ProductListCard from '../components/ProductListCard'
import { fetchEntriesByContentType } from '../../lib/contentstack'

export const revalidate = 60

export default async function WomenDressesListPage() {
  const entries = await fetchEntriesByContentType<any>('women_dresses')

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-primary text-4xl md:text-5xl font-bold text-gray-900 mb-6">Women Dresses</h1>
        {entries.length === 0 ? (
          <p className="text-gray-600">No dresses found. Publish entries to the production environment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {entries.map((item: any) => (
              <ProductListCard key={item.uid} item={item} href={`/women-dresses/${item.uid}`} contentTypeUid="women_dresses" />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}


