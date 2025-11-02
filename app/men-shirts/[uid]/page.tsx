import { notFound } from 'next/navigation'
import { fetchMenShirtByUid } from '../../../lib/contentstack'
import AddToCartButton from '../../components/AddToCartButton'

function formatPrice(value: number | string | undefined | null) {
  if (value === undefined || value === null || value === '') return '—'
  const num = typeof value === 'number' ? value : parseFloat(String(value))
  if (Number.isNaN(num)) return String(value)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}

export const dynamic = 'force-dynamic'

export default async function MenShirtDetailPage({ params }: { params: { uid: string } }) {
  const entry = await fetchMenShirtByUid(params.uid)
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
          <div className="text-2xl text-luxury-gold font-semibold mb-4">
            {entry.sale_price !== undefined && entry.sale_price !== null && entry.sale_price !== '' ? (
              <>
                {formatPrice(entry.sale_price)}
                <span className="text-gray-400 line-through text-xl ml-2">{formatPrice(entry.price)}</span>
              </>
            ) : (
              <>{formatPrice(entry.price)}</>
            )}
          </div>

          {entry.description && (
            <p className="text-gray-700 leading-relaxed mb-6">{entry.description}</p>
          )}

          <AddToCartButton
            item={{
              uid: entry.uid,
              title: entry.title,
              price: entry.sale_price ?? entry.price,
              imageUrl: img,
              contentTypeUid: 'men_shirts'
            }}
            className="mb-6 px-5 py-3 bg-luxury-gold text-luxury-black font-semibold rounded"
          />

          <ul className="space-y-2 text-gray-700">
            {entry.sku && <li><span className="font-semibold">SKU:</span> {entry.sku}</li>}
            {typeof entry.in_stock === 'boolean' && (
              <li><span className="font-semibold">Availability:</span> {entry.in_stock ? 'In stock' : 'Out of stock'}</li>
            )}
            {entry.fabric && <li><span className="font-semibold">Fabric:</span> {entry.fabric}</li>}
            {entry.fitting && <li><span className="font-semibold">Fitting:</span> {entry.fitting}</li>}
            {Array.isArray(entry.sizes) && entry.sizes.length > 0 && (
              <li><span className="font-semibold">Sizes:</span> {entry.sizes.join(', ')}</li>
            )}
            {Array.isArray(entry.colors) && entry.colors.length > 0 && (
              <li><span className="font-semibold">Colors:</span> {entry.colors.join(', ')}</li>
            )}
            {entry.brand && <li><span className="font-semibold">Brand:</span> {entry.brand}</li>}
          </ul>

          {entry.care_instructions && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Care Instructions</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">{entry.care_instructions}</div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


