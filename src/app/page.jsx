'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Globe, Camera, Users, MapPin, Heart, Shield, Search, ChevronDown } from 'lucide-react'
import placesData from './data/famous_places_india.json'

export default function Component() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const searchRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    updateSuggestions(value)
  }

  const updateSuggestions = (value) => {
    const allPlaces = Object.entries(placesData).flatMap(([state, places]) => 
      places.map(place => ({ ...place, state }))
    )

    const filtered = value
      ? allPlaces.filter(place => 
          place.name.toLowerCase().includes(value.toLowerCase()) ||
          place.state.toLowerCase().includes(value.toLowerCase())
        )
      : []

    setSuggestions(filtered.slice(0, 5))
    setIsDropdownOpen(filtered.length > 0)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name)
    setIsDropdownOpen(false)
    router.push(`/place/${encodeURIComponent(suggestion.state)}/${encodeURIComponent(suggestion.name)}`)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prevIndex => 
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0))
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions[selectedIndex])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-12 mt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
            Discover the Wonders of India
          </h1>
          <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
            Embark on a journey through incredible landscapes, rich culture, and unforgettable experiences.
          </p>
          <div className="max-w-2xl mx-auto relative z-[1000]" ref={searchRef}>
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-grow">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter state or Place you want to Visit."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => setIsDropdownOpen(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-2 pr-10 rounded-l-md border-2 border-teal-300 dark:border-teal-700 focus:outline-none focus:border-teal-500 dark:focus:border-teal-500 transition duration-300 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  aria-label="Search for places"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 text-white px-6 py-2 rounded-r-md hover:from-teal-700 hover:to-blue-700 dark:hover:from-teal-600 dark:hover:to-blue-600 transition duration-300 flex items-center"
              >
                Search
              </button>
            </form>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute w-10/12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-28 overflow-y-auto"
                >
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className={`px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center ${
                        index === selectedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Image
                        src={suggestion.image_url}
                        alt={suggestion.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <span className="font-medium">{suggestion.name}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({suggestion.state})</span>
                      </div>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 mt-28 z-10">
          {Object.entries(placesData).slice(0, 3).map(([state, places], index) => (
            <motion.div
              key={state}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/search?q=${encodeURIComponent(state)}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
                  <div className="relative h-48">
                    <Image
                      src={places[0].image_url}
                      alt={`${state} - ${places[0].name}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition duration-300 ease-in-out transform hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-semibold mb-1 text-white">{state}</h3>
                      <p className="text-sm text-gray-200">{places[0].name}</p>
                    </div>
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
              className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 text-white px-8 py-3 rounded-md font-semibold text-lg hover:from-teal-700 hover:to-blue-700 dark:hover:from-teal-600 dark:hover:to-blue-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Explore All Destinations
            </motion.button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          id="about"
        >
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400">
              About Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Soulscape is your gateway to experiencing the magic of India. Founded by a passionate traveler and
              India enthusiast, we're dedicated to showcasing the best of this incredible country.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our mission is to provide unforgettable journeys that go beyond typical tourist experiences,
              connecting you with the heart and soul of India.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                { icon: Heart, title: "Passion", description: "We're passionate about India and its wonders" },
                { icon: Shield, title: "Trust", description: "Committed to your safety and satisfaction" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg"
                >
                  <div className="bg-gradient-to-r from-teal-400 to-blue-400 dark:from-teal-500 dark:to-blue-500 p-2 rounded-full">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal-700 dark:text-teal-300">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 mt-24"
        >
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-center">
            Why Choose Wander Lust
          </h2>
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
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <div className="mb-4 p-3 bg-gradient-to-r from-teal-400  to-blue-400 dark:from-teal-500 dark:to-blue-500 rounded-full group-hover:from-teal-500 group-hover:to-blue-500 dark:group-hover:from-teal-400 dark:group-hover:to-blue-400 transition-all duration-300">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-teal-700 dark:text-teal-300  group-hover:text-teal-800 dark:group-hover:text-teal-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
  {isLoading && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 dark:from-teal-800 dark:to-blue-800 bg-opacity-90 flex items-center justify-center z-50"
    >
      <div className="text-center bg-white dark:bg-gray-800 p-4 sm:p-2 md:p-4 rounded-lg shadow-2xl max-w-sm w-full mx-4">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 border-4 border-teal-500 dark:border-teal-400 border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl font-bold text-teal-700 dark:text-teal-300 mb-2"
        >
          Preparing Your Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-gray-600 dark:text-gray-300 mb-4 text-sm"
        >
          Packing your virtual bags with the best of India's wonders...
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-2 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"
        />
      </div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </div>
  )
}
