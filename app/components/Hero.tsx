'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      id: 1,
      subtitle: "New Collection 2024",
      title: "Luxury Redefined",
      description: "Experience the perfect blend of contemporary elegance and timeless sophistication",
      gradient: "bg-gradient-to-br from-gray-50 via-white to-gray-50",
      titleColor: "text-gray-900",
      buttonStyle: "primary"
    },
    {
      id: 2,
      subtitle: "Exclusive Series",
      title: "Modern Heritage",
      description: "Where traditional craftsmanship meets cutting-edge design innovation",
      gradient: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
      titleColor: "text-white",
      buttonStyle: "secondary"
    },
    {
      id: 3,
      subtitle: "Limited Edition",
      title: "Artisan Collection", 
      description: "Handcrafted pieces that tell a story of exceptional quality and attention to detail",
      gradient: "bg-gradient-to-br from-luxury-gold via-yellow-400 to-luxury-gold",
      titleColor: "text-gray-900",
      buttonStyle: "primary"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className={`absolute inset-0 ${heroSlides[currentSlide].gradient} flex items-center justify-center`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)] opacity-30" />
          
          {/* Floating Elements */}
          <motion.div 
            className="absolute top-20 left-10 w-4 h-4 bg-luxury-gold rounded-full opacity-20"
            animate={{ 
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-32 right-16 w-6 h-6 bg-cs-primary rounded-full opacity-20"
            animate={{ 
              y: [0, 15, 0],
              x: [0, -15, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-10 w-3 h-3 bg-luxury-green rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          {/* Content */}
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2 
                className="text-sm md:text-base font-medium text-luxury-gold mb-4 tracking-[3px] uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {heroSlides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.h1 
                className={`font-primary text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${heroSlides[currentSlide].titleColor} leading-tight`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {heroSlides[currentSlide].title}
              </motion.h1>
              
              <motion.p 
                className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
                  heroSlides[currentSlide].titleColor === 'text-white' ? 'text-gray-300' : heroSlides[currentSlide].titleColor === 'text-gray-900' ? 'text-gray-700' : 'text-gray-300'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {heroSlides[currentSlide].description}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <motion.button
                  className="px-8 py-4 bg-luxury-gold text-luxury-black font-semibold rounded-lg hover:bg-white hover:text-luxury-black transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl uppercase tracking-wide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
                
                <motion.button
                  className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl uppercase tracking-wide ${
                    heroSlides[currentSlide].titleColor === 'text-white'
                      ? 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                      : heroSlides[currentSlide].titleColor === 'text-gray-900'
                      ? 'border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                      : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Collection
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 z-20">
        <motion.button
          onClick={prevSlide}
          className="w-12 h-12 border-2 border-white bg-transparent hover:bg-white hover:text-gray-900 rounded-full flex items-center justify-center transition-all duration-300 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </motion.button>
        
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-luxury-gold' : 'bg-gray-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
        
        <motion.button
          onClick={nextSlide}
          className="w-12 h-12 border-2 border-white bg-transparent hover:bg-white hover:text-gray-900 rounded-full flex items-center justify-center transition-all duration-300 text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-700">
        <motion.div
          className="h-full bg-luxury-gold"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: 'linear' }}
          key={currentSlide}
        />
      </div>
    </div>
  )
}

export default Hero
