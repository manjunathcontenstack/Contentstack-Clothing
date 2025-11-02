'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef } from 'react'

export default function ParallaxMedia({
  src,
  alt,
  className
}: {
  src: string
  alt: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className || ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <motion.img src={src} alt={alt} className="w-full h-full object-cover" style={{ y, scale }} />
    </div>
  )
}


