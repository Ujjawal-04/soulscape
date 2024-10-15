// app/state/[state]/page.jsx
"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Ticket } from 'lucide-react'
import placesData from '../../data/famous_places_india.json'

const PlaceCard = ({ place, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
  >
    <motion.div
      className="relative h-48 overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src={place.image_url} alt={place.name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{place.name}</h2>
    </motion.div>
    <div className="p-6">
      <p className="text-gray-600 dark:text-gray-300 mb-4">{place.description}</p>
    </div>
  </motion.div>
)

const StateDetails = () => {
  const params = useParams()
  const decodedState = decodeURIComponent(params.state)
  const places = placesData[decodedState] || []

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link 
          href="/destinations" 
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 text-white rounded-md hover:from-teal-700 hover:to-blue-700 dark:hover:from-teal-600 dark:hover:to-blue-600 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Destinations
        </Link>
      </motion.div>
      
      <motion.h1 
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore {decodedState}
      </motion.h1>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {places.map((place, index) => (
          <PlaceCard key={place.name} place={place} index={index} />
        ))}
      </motion.div>
      
      {places.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-gray-600 dark:text-gray-400 text-xl"
        >
          No places found for this state.
        </motion.p>
      )}
    </div>
  )
}

export default StateDetails