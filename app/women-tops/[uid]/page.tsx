import { notFound } from 'next/navigation'
import { fetchEntryByUid } from '../../../lib/contentstack'
import AddToCartButton from '../../components/AddToCartButton'

function formatPrice(value: number | string | undefined | null) {
  if (value === undefined || value === null) return '—'
  const num = typeof value === 'number' ? value : parseFloat(String(value))
  if (Number.isNaN(num)) return String(value)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}

export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: { uid: string } }) {
  const entry: any = await fetchEntryByUid<any>('women_tops', params.uid)
  if (!entry) return notFound()
  const img = entry.product_images?.[0]?.url

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="w-full">
          <div className="aspect-[2/3] rounded-xl overflow-hidden bg-gray-100">
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={img} alt={entry.title} className="w-full h-full object-cover object-top" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
            )}
          </div>
        </div>
        <div>
          <h1 className="font-primary text-3xl md:text-4xl font-bold text-gray-900 mb-3">{entry.title}</h1>
          <div className="text-2xl text-luxury-gold font-semibold mb-4">{formatPrice(entry.price)}</div>
          {entry.description && (<p className="text-gray-700 leading-relaxed mb-6">{entry.description}</p>)}
          <AddToCartButton item={{ uid: entry.uid, title: entry.title, price: entry.price, imageUrl: img, contentTypeUid: 'women_tops' }} className="mb-6 px-5 py-3 bg-luxury-gold text-luxury-black font-semibold rounded" />
        </div>
      </div>
    </main>
  )
}


