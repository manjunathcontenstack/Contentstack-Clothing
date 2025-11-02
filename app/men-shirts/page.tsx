import { fetchMenShirts } from '../../lib/contentstack'
import ProductListCard from '../components/ProductListCard'

function formatPrice(value: number | string | undefined | null) {
  if (value === undefined || value === null || value === '') return '—'
  const num = typeof value === 'number' ? value : parseFloat(String(value))
  if (Number.isNaN(num)) return String(value)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}

export const revalidate = 60

export default async function MenShirtsListPage() {
  const entries = await fetchMenShirts()

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12">
        <h1 className="font-primary text-4xl md:text-5xl font-bold text-gray-900 mb-6">Men Shirts</h1>
        {entries.length === 0 ? (
          <p className="text-gray-600">No shirts found. Publish entries to the production environment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {entries.map((item) => (
              <ProductListCard key={item.uid} item={item} href={`/men-shirts/${item.uid}`} contentTypeUid="men_shirts" />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}


