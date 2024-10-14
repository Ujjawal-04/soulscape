"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Globe, Camera, Users, MapPin, Heart, Compass, Shield } from 'lucide-react'
import placesData from './data/famous_places_india.json'

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      }, 1500)
    }
  }

  return (
    <div className="container mx-auto px-6 py-12 mt-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-6 text-blue-800">Discover the Wonders of India</h1>
        <p className="text-xl mb-8 text-gray-600">Embark on a journey through incredible landscapes, rich culture, and unforgettable experiences.</p>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex">
          <input
            type="text"
            placeholder="Enter state to see famous places"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 rounded-l-md border-2 border-blue-300 focus:outline-none focus:border-blue-500"
            aria-label="Search for places"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
            Search
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {Object.entries(placesData).slice(0, 3).map(([state, places], index) => (
          <motion.div
            key={state}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/search?q=${encodeURIComponent(state)}`}>
              <div className="bg-gray-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <Image
                  src={places[0].image_url}
                  alt={`${state} - ${places[0].name}`}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-700">{state}</h3>
                  <p className="text-gray-600">{places[0].name}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mb-16">
        <Link href="/destinations">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition duration-300"
          >
            Explore All Destinations
          </motion.button>
        </Link>
      </div>

      <div className="mb-16 bg-gray-100 rounded-lg shadow-lg overflow-hidden" id='about'>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">About Us</h2>
          <p className="text-gray-600 mb-4">
            Wander Lust is your gateway to experiencing the magic of India. Founded by a passionate traveler and 
            India enthusiast, I'am dedicated to showcasing the best of this incredible country.
          </p>
          <p className="text-gray-600 mb-4">
            My mission is to provide unforgettable journeys that go beyond typical tourist experiences, 
            connecting you with the heart and soul of India.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 items-center text-center">
            {[
              { icon: Heart, title: "Passion", description: "We're passionate about India and its wonders" },
              { icon: Shield, title: "Trust", description: "Committed to your safety and satisfaction" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center ">
                <item.icon className="w-8 h-8 text-blue-600 mb-2 text-center" />
                <h3 className="font-semibold text-blue-700">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16 mt-24">
        <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">Why Choose Wander Lust</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Globe, title: "Diverse Experiences", description: "From mountains to beaches, cities to villages, experience India's incredible diversity." },
            { icon: Camera, title: "Instagrammable Moments", description: "Capture stunning visuals at every turn, from iconic landmarks to hidden gems." },
            { icon: Users, title: "Cultural Immersion", description: "Engage with local communities and traditions for an authentic Indian experience." },
            { icon: MapPin, title: "Expert-Curated Itineraries", description: "Benefit from our team's deep knowledge of India's best destinations and experiences." },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-6 flex flex-col items-center text-center h-full">
                <div className="mb-4 p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-700 group-hover:text-blue-800 transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50"
        >
          <div className="text-center">
            <Image
              src="/loading.gif"
              alt="Loading animation"
              width={200}
              height={200}
              className="mb-4"
            />
            <p className="text-xl font-semibold text-blue-600">Preparing your journey...</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}