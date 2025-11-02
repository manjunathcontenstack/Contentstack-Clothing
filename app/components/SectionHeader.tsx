'use client'

import { motion } from 'framer-motion'

export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center py-10">
      <motion.h2
        className="font-primary text-3xl md:text-5xl font-bold tracking-wide text-gray-900"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          className="mt-3 text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  )
}


