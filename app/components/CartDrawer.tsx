'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext'

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

const CartDrawer = () => {
  const { items, total, isOpen, closeCart, removeItem } = useCart()
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[200]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={closeCart} />
          <motion.aside
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-semibold">Your Bag</h3>
              <button onClick={closeCart} className="p-2 rounded hover:bg-gray-100"><XMarkIcon className="h-6 w-6" /></button>
            </div>
            <div className="flex-1 overflow-y-auto divide-y">
              {items.length === 0 ? (
                <div className="p-6 text-gray-500">Your bag is empty.</div>
              ) : (
                items.map((it) => (
                  <div key={it.uid} className="p-4 flex gap-4 items-center">
                    <div className="w-20 h-16 bg-gray-100 overflow-hidden rounded">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      {it.imageUrl ? <img src={it.imageUrl} alt={it.title} className="w-full h-full object-cover" /> : null}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{it.title}</div>
                      <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatPrice(Number(it.price) || 0)}</div>
                      <button onClick={() => removeItem(it.uid)} className="mt-2 inline-flex items-center text-sm text-red-600 hover:text-red-700"><TrashIcon className="h-4 w-4 mr-1" />Remove</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-5 border-t">
              <div className="flex items-center justify-between text-lg font-semibold mb-4">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button className="w-full py-3 bg-luxury-gold text-luxury-black font-semibold rounded hover:opacity-90">Checkout</button>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CartDrawer


