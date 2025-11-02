'use client'

import { motion } from 'framer-motion'
import ParallaxMedia from './ParallaxMedia'

type Props = {
  imageUrl?: string
  title?: string
  description?: string
  ctaLabel?: string
  ctaUrl?: string
}

const EditorialHero = ({ imageUrl, title, description, ctaLabel, ctaUrl }: Props) => {
  return (
    <section className="bg-white py-10 md:py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Image panel */}
        <motion.div
          className="h-[520px] md:h-[640px] rounded-2xl overflow-hidden shadow-lg relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <ParallaxMedia
            src={imageUrl || "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=1600&auto=format&fit=crop"}
            alt="Editorial"
            className="absolute inset-0 h-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        </motion.div>

        {/* Copy panel */}
        <motion.div
          className="px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-primary text-4xl md:text-6xl font-bold tracking-wide text-gray-900 mb-6">
            {title || 'GUCCI ALTITUDE'}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed max-w-xl mb-8">
            {description || 'The House’s debut winter sportswear collection reimagines technical elements into refined silhouettes, blending performance with emblematic codes.'}
          </p>
          <a href={ctaUrl || '#'} className="inline-block">
            <motion.button whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }} className="px-6 py-3 border border-gray-900 rounded-md text-gray-900 font-semibold tracking-wide hover:bg-gray-900 hover:text-white transition">
              {ctaLabel || 'Discover More'}
            </motion.button>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default EditorialHero


