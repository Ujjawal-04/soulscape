"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import placesData from '../data/famous_places_india.json'

export default function Destinations() {
  const stateEntries = Object.entries(placesData)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">Explore Indian States</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stateEntries.map(([state, places], index) => (
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/state/${encodeURIComponent(state)}`}>
              <motion.div 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {places.length > 0 && (
                  <img
                    src={places[2].image_url} // Show the image of the first place
                    alt={places[2].name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-blue-700 mb-2">{state}</h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{places.length} famous place{places.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
