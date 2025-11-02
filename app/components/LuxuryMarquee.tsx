'use client'

import { motion } from 'framer-motion'

const LuxuryMarquee = () => {
  const items = [
    'COMPLIMENTARY SHIPPING',
    'NEW SEASON',
    'LIMITED EDITION',
    'CRAFTED IN DETAIL',
    'MEMBERS EXCLUSIVE'
  ]
  return (
    <div className="relative overflow-hidden bg-luxury-cream border-y border-gray-200">
      <motion.div
        className="flex whitespace-nowrap py-3 text-[12px] tracking-[0.5em] font-semibold text-gray-800"
        initial={{ x: 0 }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
      >
        {[...items, ...items].map((label, idx) => (
          <span key={idx} className="mx-8">
            {label}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default LuxuryMarquee


