"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import placesData from '../../../data/famous_places_india.json'

export default function PlaceDetails() {
  const params = useParams()
  const { state, place } = params
  const decodedState = decodeURIComponent(state)
  const decodedPlace = decodeURIComponent(place)

  const placeDetails = placesData[decodedState]?.find(p => p.name === decodedPlace)

  if (!placeDetails) {
    return <div className="container mx-auto px-6 py-12">Place not found</div>
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link href={`/search?q=${encodeURIComponent(decodedState)}`} className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to {decodedState}
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <Image
          src={placeDetails.image_url}
          alt={placeDetails.name}
          width={800}
          height={600}
          className="w-full h-96 object-fill"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4">{placeDetails.name}</h2>
          <p className="text-gray-600 mb-4">{placeDetails.description}</p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm text-gray-700"><strong>Timings:</strong> {placeDetails.timings}</p>
            <p className="text-sm text-gray-700"><strong>Ticket Price:</strong> {placeDetails.ticket_price}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}