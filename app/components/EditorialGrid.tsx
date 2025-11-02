'use client'

import { motion } from 'framer-motion'
import ParallaxMedia from './ParallaxMedia'

export type EditorialCardData = { headline: string; sub: string; imageUrl?: string; dark?: boolean }

const EditorialCard = ({ headline, sub, imageUrl, dark }: EditorialCardData) => (
  <motion.div
    className={`relative h-[480px] rounded-2xl overflow-hidden shadow-lg ${dark ? 'bg-gray-900' : 'bg-luxury-cream'}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    whileHover={{ y: -6 }}
  >
    {imageUrl ? (
      <ParallaxMedia src={imageUrl} alt={headline} className="absolute inset-0 h-full" />
    ) : (
      <div className={`absolute inset-0 ${dark ? 'opacity-10' : 'opacity-30'} bg-[radial-gradient(circle_at_40%_40%,rgba(212,175,55,0.35)_0%,transparent_45%)]`} />
    )}
    <div className="absolute inset-0 p-8 flex flex-col justify-end">
      <p className={`text-xs tracking-[0.25em] mb-2 ${dark ? 'text-luxury-gold' : 'text-white'}`}>{sub}</p>
      <h4 className={`font-primary text-3xl md:text-4xl font-bold ${dark ? 'text-white' : 'text-white'} mb-4`}>{headline}</h4>
      <motion.button whileHover={{ x: 2 }} className={`self-start px-5 py-2 rounded-md font-semibold tracking-wide ${dark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'} hover:opacity-90`}>Explore</motion.button>
    </div>
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/0" />
  </motion.div>
)

const EditorialGrid = ({ cards }: { cards?: EditorialCardData[] }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(cards && cards.length > 0
          ? cards
          : [
              { headline: 'New Season Arrivals', sub: 'CURATED' },
              { headline: 'House Signatures', sub: 'ICON', dark: true },
              { headline: 'Gifts of Craft', sub: 'GIFTING' }
            ]
        ).map((c) => (
          <EditorialCard key={c.headline} {...c} />
        ))}
      </div>
    </section>
  )
}

export default EditorialGrid


