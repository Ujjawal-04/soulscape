"use client"

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin } from 'lucide-react'
import placesData from '../data/famous_places_india.json'

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

function SearchResults() {
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const query = searchParams.get('q')

  useEffect(() => {
    if (query) {
      setIsLoading(true)
      const filteredResults = Object.entries(placesData).filter(([state, places]) => 
        state.toLowerCase().includes(query.toLowerCase()) ||
        places.some(place => place.name.toLowerCase().includes(query.toLowerCase()))
      )
      setTimeout(() => {
        setResults(filteredResults)
        setIsLoading(false)
      }, 800) // Increased delay for a more noticeable loading effect
    }
  }, [query])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="container mx-auto px-6 py-12 min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400"
      >
        Exploring India: "{query}"
      </motion.h2>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        ) : results.length > 0 ? (
          <motion.div
            key="results"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {results.map(([state, places]) => (
              <motion.div
                key={state}
                variants={itemVariants}
                className="mb-12"
              >
                <h3 className="text-3xl font-semibold mb-6 text-teal-700 dark:text-teal-300 flex items-center">
                  <MapPin className="mr-2" />
                  {state}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {places.map((place) => (
                    <motion.div
                      key={place.name}
                      whileHover={{ scale: 1.03, rotateY: 5 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link href={`/place/${encodeURIComponent(state)}/${encodeURIComponent(place.name)}`}>
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
                          <div className="relative h-64">
                            <Image
                              src={place.image_url}
                              alt={place.name}
                              layout="fill"
                              objectFit="cover"
                              placeholder="blur"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                              className="transition-transform duration-300 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h4 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{place.name}</h4>
                          </div>
                          <div className="p-6">
                            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{place.description}</p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 text-white rounded-r-md hover:from-teal-700 hover:to-blue-700 dark:hover:from-teal-600 dark:hover:to-blue-600flex items-center transition duration-300"
                            >
                              Explore More
                            </motion.button>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-600 dark:text-gray-400"
          >
            <Search className="mx-auto mb-4 w-16 h-16 text-teal-500" />
            <p className="text-xl">No results found. Try a different search term.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  )
}