'use client'

import Link from 'next/link'
import AddToCartButton from './AddToCartButton'

function formatPrice(value: number | string | undefined | null) {
  if (value === undefined || value === null || value === '') return '—'
  const num = typeof value === 'number' ? value : parseFloat(String(value))
  if (Number.isNaN(num)) return String(value)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num)
}

export default function ProductListCard({ item, href, contentTypeUid }: { item: any; href: string; contentTypeUid: string }) {
  const img = item?.product_images?.[0]?.url
  return (
    <div className="group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition flex flex-col">
      <Link href={href} className="block">
        <div className="aspect-[4/3] bg-gray-100">
          {img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={img} alt={item.title} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <Link href={href} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
        </Link>
        <div className="text-gray-700 mb-3">
          {item?.sale_price !== undefined && item?.sale_price !== null && item?.sale_price !== '' ? (
            <>
              <span className="text-luxury-gold font-semibold">{formatPrice(item.sale_price)}</span>
              <span className="text-gray-400 line-through ml-2">{formatPrice(item.price)}</span>
            </>
          ) : (
            <span>{formatPrice(item.price)}</span>
          )}
        </div>
        <div className="mt-auto">
          <AddToCartButton item={{ uid: item.uid, title: item.title, price: item.sale_price ?? item.price, imageUrl: img, contentTypeUid }} />
        </div>
      </div>
    </div>
  )
}


