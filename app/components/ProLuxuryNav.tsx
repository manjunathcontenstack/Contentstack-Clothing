'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBagIcon, UserIcon, MagnifyingGlassIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useCart } from '../context/CartContext'

const ProLuxuryNav = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { count: cartCount, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationData = {
    MEN: {
      featured: {
        title: "NEW ARRIVALS",
        subtitle: "Discover our latest collection",
        items: ["Spring Collection 2024", "Luxury Essentials", "Limited Edition"]
      },
      categories: [
        { name: "READY-TO-WEAR", items: ["Shirts", "Jackets", "T-Shirts", "Blazers"] },
        { name: "FOOTWEAR", items: ["Formal Shoes", "Sneakers", "Boots"] },
        { name: "ACCESSORIES", items: ["Watches", "Belts", "Ties"] }
      ]
    },
    WOMEN: {
      featured: {
        title: "CURATED FOR YOU",
        subtitle: "Elegant pieces for the modern woman",
        items: ["Office Collection", "Evening Wear", "Casual Luxury"]
      },
      categories: [
        { name: "READY-TO-WEAR", items: ["Tops", "Jackets", "Office Wear", "Dresses"] },
        { name: "ACCESSORIES", items: ["Jewelry", "Scarves", "Handbags"] }
      ]
    },
    "BAGS & WALLETS": {
      featured: {
        title: "CRAFTSMANSHIP",
        subtitle: "Handcrafted luxury accessories",
        items: ["Signature Collection", "Travel Essentials", "Gift Sets"]
      },
      categories: [
        { name: "HANDBAGS", items: ["Tote Bags", "Shoulder Bags", "Clutches"] },
        { name: "WALLETS", items: ["Card Holders", "Long Wallets", "Coin Purses"] }
      ]
    },
    "BEAUTY & FRAGRANCE": {
      featured: {
        title: "SIGNATURE SCENTS",
        subtitle: "Premium fragrances and beauty essentials",
        items: ["Signature Collection", "Limited Edition", "Gift Sets"]
      },
      categories: [
        { name: "FRAGRANCE", items: ["Women Fragrance", "Men Fragrance"] },
        { name: "BEAUTY", items: ["Daily Care", "Night Care Complete Set"] }
      ]
    }
  }

  // Explicit route mapping to avoid fuzzy matches
  const routeMap: Record<string, Record<string, string>> = {
    MEN: {
      'Shirts': '/men-shirts',
      'Jackets': '/men-jackets',
      'T-Shirts': '/men-tshirts',
      'Blazers': '/men-blazers',
      'Formal Shoes': '/men-formal-shoes',
      'Sneakers': '/men-sneakers',
      'Boots': '/men-boots',
      'Watches': '/men-watches',
      'Belts': '/men-belts',
      'Ties': '/men-ties'
    },
    WOMEN: {
      'Tops': '/women-tops',
      'Jackets': '/women-jackets',
      'Office Wear': '/women-office-wear',
      'Dresses': '/women-dresses',
      'Jewelry': '/women-jewelry',
      'Scarves': '/women-scarves',
      'Handbags': '/handbags'
    },
    'BAGS & WALLETS': {
      'Tote Bags': '/tote-bags',
      'Shoulder Bags': '/shoulder-bags',
      'Clutches': '/clutches',
      'Card Holders': '/card-holders',
      'Long Wallets': '/wallets-long',
      'Coin Purses': '/coin-purses'
    },
    'BEAUTY & FRAGRANCE': {
      'Women Fragrance': '/women-fragrance',
      'Men Fragrance': '/men-fragrance',
      'Daily Care': '/beauty-daily-care',
      'Night Care Complete Set': '/beauty-night-care'
    }
  }

  // Top-level categories should open submenus, not navigate directly

  const getHrefByItem = (item: string, parentCategory: string) => {
    const map = routeMap[parentCategory]
    if (map && map[item]) return map[item]
    return getCategoryHref(parentCategory)
  }

  return (
    <>
      {/* Ultra Luxury Top Bar */}
      <motion.div 
        className="bg-gradient-to-r from-luxury-black via-gray-900 to-luxury-black text-white py-3 relative overflow-hidden"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-luxury-gold/10 to-transparent animate-gradient" />
        
        <div className="container mx-auto px-6 flex justify-between items-center relative z-10">
          <motion.div 
            className="flex items-center space-x-8 text-xs font-light tracking-[3px]"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="border-r border-gray-600 pr-8">COMPLIMENTARY WORLDWIDE SHIPPING</span>
            <span>24/7 CONCIERGE SERVICE</span>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href="/account" className="group">
              <motion.div 
                className="flex items-center space-x-2 cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <UserIcon className="h-4 w-4 group-hover:text-luxury-gold transition-colors duration-300" />
                <span className="text-xs tracking-[2px] group-hover:text-luxury-gold transition-colors duration-300">
                  ACCOUNT
                </span>
              </motion.div>
            </Link>

            <motion.div 
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.1 }}
              onClick={() => openCart()}
            >
              <ShoppingBagIcon className="h-5 w-5 group-hover:text-luxury-gold transition-colors duration-300" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    className="absolute -top-2 -right-2 bg-luxury-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }}>
              <HeartIcon className="h-5 w-5 cursor-pointer hover:text-luxury-red transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Luxury Navigation (no initial slide animation) */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-2xl shadow-2xl border-b border-gray-200' 
            : 'bg-white shadow-lg'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-3">
            
            {/* Contentstack Logo */}
            <motion.div 
              className="flex items-center space-x-4 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
            >
              {/* Actual Contentstack Logo */}
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="/logo.png" 
                  alt="Contentstack Logo" 
                  className="w-10 h-10 object-contain"
                />
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-cs-primary/20 to-cs-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>

              {/* Premium Logo Text (no load animation) */}
              <div className="text-center leading-tight">
                <h1 className="font-brand text-2xl md:text-3xl font-bold text-black tracking-[0.08em] uppercase">
                  CONTENTSTACK
                </h1>
                <div className="font-brand text-[11px] md:text-xs font-semibold text-black tracking-[0.12em] uppercase">
                  CLOTHING & CO.
                </div>
              </div>
            </motion.div>

            {/* Desktop Luxury Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {Object.keys(navigationData).map((category) => (
                <div
                  key={category}
                  className="relative group"
                  onMouseEnter={() => setHoveredItem(category)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.button
                    type="button"
                    className="relative text-sm font-medium text-gray-800 tracking-[2px] py-2 block group"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setHoveredItem(hoveredItem === category ? null : category)}
                  >
                    {category}
                    
                    {/* Animated Underline */}
                    <motion.div 
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-luxury-gold to-luxury-green group-hover:w-full group-hover:left-0 transition-all duration-500"
                      layoutId={`underline-${category}`}
                    />
                    
                    {/* Hover Glow */}
                    <motion.div 
                      className="absolute inset-0 bg-luxury-gold/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"
                      style={{ padding: '8px 16px', margin: '-8px -16px' }}
                    />
                  </motion.button>

                  {/* Simple Inline Dropdown */}
                  <AnimatePresence>
                    {hoveredItem === category && (
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 min-w-64"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-luxury-gold to-cs-primary" />
                        
                        <div className="p-6">
                          {/* All items in single column */}
                          <div className="space-y-4">
                            {navigationData[category as keyof typeof navigationData].categories.map((section, sectionIdx) => (
                              <motion.div
                                key={section.name}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: sectionIdx * 0.1 }}
                              >
                                <h4 className="font-semibold text-gray-900 mb-2 text-sm tracking-wide">
                                  {section.name}
                                </h4>
                                <div className="flex flex-wrap gap-x-6 gap-y-1">
                                  {section.items.map((item, itemIdx) => (
                                    <motion.a
                                      key={item}
                                      href={getHrefByItem(item, category)}
                                      className="text-sm text-gray-600 hover:text-luxury-gold transition-colors duration-200 whitespace-nowrap"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: itemIdx * 0.05 + 0.2 }}
                                      whileHover={{ x: 2 }}
                                    >
                                      {item}
                                    </motion.a>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Premium Right Icons */}
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                className="relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300 group"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.95 }}
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-800 group-hover:text-luxury-gold transition-colors duration-300" />
                <motion.div 
                  className="absolute inset-0 bg-luxury-gold/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"
                />
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                className="lg:hidden relative p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-6 h-0.5 bg-gray-800 mb-1.5 transition-all duration-300" />
                  <div className="w-6 h-0.5 bg-gray-800 mb-1.5 transition-all duration-300" />
                  <div className="w-6 h-0.5 bg-gray-800 transition-all duration-300" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Ultra Premium Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Luxury Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-gray-900 to-luxury-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.2)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,107,60,0.1)_0%,transparent_70%)]" />
            
            <div className="relative z-10 h-full flex flex-col text-white">
              {/* Header */}
              <motion.div 
                className="flex justify-between items-center p-6 border-b border-luxury-gold/30"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src="/logo.png" 
                    alt="Contentstack Clothing & Co. Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <div className="leading-tight">
                    <div className="font-primary text-lg font-bold text-black tracking-[0.25em] uppercase">Contentstack</div>
                    <div className="text-[10px] font-semibold text-black tracking-[0.35em] uppercase">Clothing & Co.</div>
                  </div>
                </div>
                <motion.button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.button>
              </motion.div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto p-6">
                {Object.keys(navigationData).map((category, index) => (
                  <motion.div
                    key={category}
                    className="mb-8"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <h3 className="font-primary text-xl font-bold text-luxury-gold mb-4 tracking-[3px] border-b border-luxury-gold/30 pb-2">
                      {category}
                    </h3>
                    <div className="grid gap-4 pl-4">
                      {navigationData[category as keyof typeof navigationData].categories.map((section) => (
                        <div key={section.name}>
                          <h4 className="text-sm font-semibold text-white/80 mb-2 tracking-wider">
                            {section.name}
                          </h4>
                          <ul className="space-y-2 pl-3">
                            {section.items.map((item) => (
                              <li key={item}>
                                <a
                                  href={getHrefByItem(item, category)}
                                  className="text-gray-300 hover:text-luxury-gold hover:translate-x-2 transition-all duration-300 block py-1"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <motion.div 
                className="p-6 border-t border-luxury-gold/30 text-center"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-xs text-luxury-gold tracking-[4px] font-light">
                  LUXURY • ELEGANCE • CRAFTSMANSHIP
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProLuxuryNav
