"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import placesData from '../data/famous_places_india.json'

const CardWrapper = ({ children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
)

const Card = ({ state, places }) => (
  <Link href={`/state/${encodeURIComponent(state)}`}>
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      {places.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={places[1].image_url}
            alt={places[1].name}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{state}</h2>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{places.length} famous place{places.length !== 1 ? 's' : ''}</span>
        </div>
        <motion.div
          className="flex items-center text-teal-600 dark:text-teal-400 font-semibold"
          whileHover={{ x: 5 }}
        >
          Explore <ArrowRight className="w-4 h-4 ml-2" />
        </motion.div>
      </div>
    </motion.div>
  </Link>
)

export default function Destinations() {
  const stateEntries = Object.entries(placesData)

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Indian States
      </motion.h1>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {stateEntries.map(([state, places], index) => (
          <CardWrapper key={state} delay={index * 0.1}>
            <Card state={state} places={places} />
          </CardWrapper>
        ))}
      </motion.div>
    </div>
  )
}