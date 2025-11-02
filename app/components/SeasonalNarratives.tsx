'use client'

import { motion } from 'framer-motion'
import ParallaxMedia from './ParallaxMedia'
import SectionHeader from './SectionHeader'

const defaultCards = [
  {
    img: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?q=80&w=1600&auto=format&fit=crop',
    caption: 'Suede Styles for Women'
  },
  {
    img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1600&auto=format&fit=crop',
    caption: "New In: Men's Boots for Winter"
  },
  {
    img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1600&auto=format&fit=crop',
    caption: 'The Mini Bag Edit'
  }
]

export type SeasonalCardData = { img: string; caption: string }

const SeasonalCard = ({ img, caption }: SeasonalCardData) => (
  <motion.div
    className="group"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <div className="h-[440px] md:h-[520px] rounded-2xl overflow-hidden shadow-md relative">
      <ParallaxMedia src={img} alt={caption} className="h-full" />
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
    <p className="text-center text-gray-800 mt-4 font-medium">{caption}</p>
  </motion.div>
)

const SeasonalNarratives = ({ cards }: { cards?: SeasonalCardData[] }) => {
  return (
    <section className="py-14 bg-white">
      <SectionHeader title="SEASONAL NARRATIVES" subtitle="Shop a series of unique curations, where inspiration meets wardrobe essentials of the House." />
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(cards && cards.length > 0 ? cards : defaultCards).map((c) => (
          <SeasonalCard key={c.caption} img={c.img} caption={c.caption} />
        ))}
      </div>
    </section>
  )
}

export default SeasonalNarratives


