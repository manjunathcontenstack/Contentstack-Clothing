'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AccountPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-white">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* Visual side */}
        <motion.div
          className="relative hidden lg:block rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="font-primary text-3xl font-bold">Welcome Back</h2>
            <p className="opacity-90">Sign in to access orders, wishlist and a faster checkout.</p>
          </div>
        </motion.div>

        {/* Auth card */}
        <motion.div
          className="rounded-2xl border border-gray-200 p-8 shadow-sm bg-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h1 className="font-primary text-3xl md:text-4xl font-bold text-gray-900 mb-2">Your Account</h1>
          <p className="text-gray-600 mb-8">Log in or continue as guest to start shopping.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Demo only: navigate to shopping
              window.location.href = '/men-shirts'
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input required type="email" placeholder="you@example.com" className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Password</label>
              <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-luxury-gold" />
            </div>
            <button type="submit" className="w-full py-3 bg-luxury-gold text-luxury-black font-semibold rounded-md hover:opacity-90">Sign In & Continue</button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-gray-500 tracking-widest">OR</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/men-shirts" className="text-center px-4 py-3 border rounded-md hover:bg-gray-50">Continue Shopping</Link>
            <Link href="/handbags" className="text-center px-4 py-3 border rounded-md hover:bg-gray-50">Explore Handbags</Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">This demo page does not store credentials. Integrate your auth provider later (OAuth, custom backend, etc.).</p>
        </motion.div>
      </div>
    </main>
  )
}


