import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from './context/CartContext'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Contentstack Clothing - Luxury Fashion Redefined',
  description: 'Experience the perfect blend of contemporary elegance and timeless sophistication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const CartDrawer = dynamic(() => import('./components/CartDrawer'), { ssr: false })
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-secondary antialiased bg-white text-gray-900 overflow-x-hidden">
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
