// app/components/Header.jsx
'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = [
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
    { href: '/destinations', label: 'Destinations' },
  ]

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  }

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <header className="bg-background/80 backdrop-blur-sm shadow-md sticky top-0 z-10 transition-colors duration-300">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold transition-colors duration-300 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Soulscape
            </motion.span>
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={item.href} 
                  className="relative group"
                >
                  <span className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-300 ease-out group-hover:bg-[length:100%_2px]">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
            {mounted && (
              <motion.button
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
                onClick={handleThemeChange}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {mounted && (
              <button
                onClick={handleThemeChange}
                className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300 mr-2"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <motion.div
        initial="closed"
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.3 }}
        className="md:hidden absolute top-full left-0 right-0 bg-background shadow-md"
      >
        <div className="container mx-auto px-6 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-[length:0%_2px] bg-no-repeat bg-left-bottom transition-all duration-300 ease-out group-hover:bg-[length:100%_2px]">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  )
}