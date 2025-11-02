'use client'

import { motion } from 'framer-motion'
import ParallaxMedia from './ParallaxMedia'

type Props = {
  imageUrl?: string
  heading?: string
  subheading?: string
}

const FullBleedHero = ({ imageUrl, heading, subheading }: Props) => {
  return (
    <section className="relative w-full h-[70vh] md:h-[82vh] bg-black">
      {/* Full-bleed image with subtle parallax */}
      <ParallaxMedia
        src={imageUrl || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2400&auto=format&fit=crop'}
        alt="Editorial full-bleed"
        className="absolute inset-0 h-full"
      />
      {/* Soft bottom gradient for legible text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

      {/* Copy overlay */}
      <div className="absolute left-0 right-0 bottom-10 md:bottom-16">
        <div className="container mx-auto px-6">
          <motion.h1
            className="font-primary text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {heading || 'Handbags for Women'}
          </motion.h1>
          <motion.p
            className="mt-3 text-white/85 max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {subheading || 'Crafted for everyday luxury—refined silhouettes, modern craftsmanship, and iconic codes.'}
          </motion.p>
          <motion.div className="mt-6 flex gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-md hover:opacity-90">Shop Now</button>
            <button className="px-6 py-3 border border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition">Discover</button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default FullBleedHero


