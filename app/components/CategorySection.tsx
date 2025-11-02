'use client'

import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const CategorySection = () => {
  const categories = [
    {
      id: 'men',
      title: "Men's Collection",
      description: "Sophisticated menswear for the modern gentleman",
      gradient: "bg-gradient-to-br from-gray-900 to-gray-700",
      pattern: "opacity-10 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"
    },
    {
      id: 'women',
      title: "Women's Collection", 
      description: "Elegant fashion for the contemporary woman",
      gradient: "bg-gradient-to-br from-pink-200 to-pink-300",
      pattern: "opacity-20 bg-[radial-gradient(circle_at_70%_30%,rgba(255,192,203,0.3)_0%,transparent_50%)]"
    },
    {
      id: 'bags',
      title: "Bags & Accessories",
      description: "Luxury accessories to complete your look", 
      gradient: "bg-gradient-to-br from-amber-700 to-amber-900",
      pattern: "opacity-10 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]"
    },
    {
      id: 'beauty',
      title: "Beauty & Fragrance",
      description: "Premium beauty essentials and signature scents",
      gradient: "bg-gradient-to-br from-purple-200 to-pink-200", 
      pattern: "opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_70%)]"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-primary text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Background */}
              <div className={`absolute inset-0 ${category.gradient}`}>
                <div className={`absolute inset-0 ${category.pattern}`} />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <h3 className="font-primary text-2xl font-bold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-200 mb-4 opacity-90">
                    {category.description}
                  </p>
                  
                  <motion.button
                    className="inline-flex items-center space-x-2 text-luxury-gold font-semibold uppercase tracking-wide text-sm group-hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <span>Explore</span>
                    <ArrowRightIcon className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Floating Animation Elements */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-luxury-gold rounded-full opacity-60"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default CategorySection
