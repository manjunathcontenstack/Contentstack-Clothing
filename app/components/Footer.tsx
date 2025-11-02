'use client'

import { motion } from 'framer-motion'

const Footer = () => {
  const footerSections = [
    {
      title: "Customer Care",
      links: ["Contact Us", "Shipping & Returns", "Size Guide", "FAQ"]
    },
    {
      title: "About", 
      links: ["Our Story", "Careers", "Press", "Sustainability"]
    },
    {
      title: "Connect",
      links: ["Instagram", "Facebook", "Twitter", "Pinterest"]
    }
  ]

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-primary text-2xl font-bold text-white mb-4">
              CONTENTSTACK
            </h3>
            <p className="text-gray-400">
              Luxury fashion redefined for the modern era
            </p>
          </div>
          
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Contentstack Clothing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
