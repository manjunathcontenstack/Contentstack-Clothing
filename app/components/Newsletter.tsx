'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/outline'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) {
      setIsSubscribed(true)
      setTimeout(() => {
        setIsSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  return (
    <section className="py-20 bg-luxury-black text-white">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-primary text-4xl md:text-5xl font-bold mb-4">
            Stay in Style
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be the first to know about new collections and exclusive offers
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex rounded-lg overflow-hidden shadow-xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 text-gray-800 bg-white focus:outline-none"
                required
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-luxury-gold text-luxury-black font-bold hover:bg-white transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubscribed ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  'Subscribe'
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
