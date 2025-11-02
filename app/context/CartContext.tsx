'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  uid: string
  title: string
  price?: number | string
  imageUrl?: string
  contentTypeUid?: string
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (uid: string) => void
  clear: () => void
  // drawer state
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = 'cs_cart_items_v1'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {}
  }, [items])

  const addItem = (item: Omit<CartItem, 'quantity'>, qty: number = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.uid === item.uid)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty }
        return next
      }
      return [...prev, { ...item, quantity: qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (uid: string) => {
    setItems(prev => prev.filter(p => p.uid !== uid))
  }

  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((sum, it) => sum + it.quantity, 0), [items])
  const total = useMemo(() => {
    return items.reduce((sum, it) => {
      const n = typeof it.price === 'number' ? it.price : parseFloat(String(it.price ?? 0))
      return sum + (isFinite(n) ? n * it.quantity : 0)
    }, 0)
  }, [items])

  const value: CartContextValue = {
    items,
    count,
    total,
    addItem,
    removeItem,
    clear,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false)
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


