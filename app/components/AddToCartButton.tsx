'use client'

import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export type AddItem = {
  uid: string
  title: string
  price?: number | string
  imageUrl?: string
  contentTypeUid?: string
}

export default function AddToCartButton({ item, className }: { item: AddItem; className?: string }) {
  const { addItem } = useCart()
  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault()
        addItem(item, 1)
      }}
      className={className ?? 'mt-3 w-full px-4 py-2 bg-luxury-gold text-luxury-black font-semibold rounded hover:opacity-90 transition'}
      whileTap={{ scale: 0.97 }}
    >
      Add to Bag
    </motion.button>
  )
}


