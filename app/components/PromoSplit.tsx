'use client'

import { motion } from 'framer-motion'
import ParallaxMedia from './ParallaxMedia'

type PanelProps = {
  title: string
  subtitle: string
  cta?: string
  imageUrl?: string
}

const Panel = ({ title, subtitle, cta, imageUrl }: PanelProps) => (
  <motion.div
    className="relative h-[520px] rounded-2xl overflow-hidden shadow-lg"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    {imageUrl ? (
      <ParallaxMedia src={imageUrl} alt={title} className="absolute inset-0 h-full" />
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
    )}
    <div className="absolute inset-0 p-10 flex flex-col justify-end">
      <p className="text-luxury-gold tracking-[0.35em] text-xs mb-4">{subtitle}</p>
      <h3 className="font-primary text-4xl md:text-5xl font-bold text-white mb-6">{title}</h3>
      {cta ? (
        <button className="self-start px-6 py-3 bg-white text-gray-900 rounded-md font-semibold tracking-wide hover:opacity-90">
          {cta}
        </button>
      ) : null}
    </div>
  </motion.div>
)

const PromoSplit = ({ left, right }: { left?: PanelProps; right?: PanelProps }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Panel title={left?.title || 'Iconic Essentials'} subtitle={left?.subtitle || 'MEN'} cta={left?.cta || 'Shop Now'} imageUrl={left?.imageUrl} />
        <Panel title={right?.title || 'Timeless Elegance'} subtitle={right?.subtitle || 'WOMEN'} cta={right?.cta || 'Discover'} imageUrl={right?.imageUrl} />
      </div>
    </section>
  )
}

export default PromoSplit


