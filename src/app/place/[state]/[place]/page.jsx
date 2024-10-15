'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Ticket, ArrowLeft, Calendar, Map, X } from 'lucide-react'
import placesData from '../../../data/famous_places_india.json'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import emailjs from '@emailjs/browser'

function ScheduleVisitModal({ isOpen, onClose, placeName }) {
  const [visitDate, setVisitDate] = useState(new Date())
  const [email, setEmail] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSending(true)

    emailjs.send(
      'service_p4m9pai',
      'template_pg089w8',
      {
        to_email: email,
        place_name: placeName,
        visit_date: visitDate.toDateString(),
      },
      'NgdKj8r3XNS-DvkZH'
    ).then((result) => {
      console.log('Email sent successfully:', result)
      console.log('Sent data:', {
        to_email: email,
        place_name: placeName,
        visit_date: visitDate.toDateString(),
      })
      alert(`Visit scheduled for ${placeName} on ${visitDate.toDateString()}. Confirmation sent to ${email}`)
      onClose()
    }, (error) => {
      console.error('Failed to send email:', error)
      console.error('Attempted to send:', {
        to_email: email,
        place_name: placeName,
        visit_date: visitDate.toDateString(),
      })
      alert('Failed to schedule visit. Please try again.')
    }).finally(() => {
      setIsSending(false)
    })
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
      >
        <h3 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Schedule a Visit to {placeName}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Visit Date
            </label>
            <DatePicker
              id="visitDate"
              selected={visitDate}
              onChange={(date) => setVisitDate(date)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSending}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              {isSending ? 'Scheduling...' : 'Schedule'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

function FullSizeImageModal({ isOpen, onClose, imageUrl, placeName }) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-4xl w-full h-full flex items-center justify-center"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-white hover:text-gray-300 cursor-pointer"
          aria-label="Close full size image"
        >
          <X size={24} />
        </div>
        <Image
          src={imageUrl}
          alt={placeName}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </motion.div>
    </motion.div>
  )
}

export default function PlaceDetails() {
  const params = useParams()
  const { state, place } = params
  const decodedState = decodeURIComponent(state)
  const decodedPlace = decodeURIComponent(place)

  const placeDetails = placesData[decodedState]?.find(p => p.name === decodedPlace)

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  if (!placeDetails) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-4">Place not found</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    )
  }

  const handleScheduleVisit = () => {
    setIsScheduleModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsScheduleModalOpen(false)
  }

  const handleOpenMap = () => {
    const address = `${placeDetails.name}, ${decodedState}, India`
    const encodedAddress = encodeURIComponent(address)
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    
    if (isMobile) {
      window.location.href = `geo:0,0?q=${encodedAddress}`
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
    }
  }

  const handleImageClick = () => {
    setIsImageModalOpen(true)
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link 
        href={`/search?q=${encodeURIComponent(decodedState)}`} 
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-500 dark:to-blue-500 text-white rounded-r-md hover:from-teal-700 hover:to-blue-700 dark:hover:from-teal-600 dark:hover:to-blue-600 ease-in-out transform hover:-translate-y-1 hover:shadow-lg mb-6"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to {decodedState}
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
      >
        <div className="relative h-96 cursor-pointer" onClick={handleImageClick}>
          <Image
            src={placeDetails.image_url}
            alt={placeDetails.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
          <h2 className="absolute bottom-6 left-6 text-4xl font-bold text-white">{placeDetails.name}</h2>
        </div>
        <div className="p-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 mb-4"
          >
            {placeDetails.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900 dark:to-blue-900 p-4 rounded-md mb-4"
          >
            <div className="flex items-center mb-2">
              <Clock className="text-teal-600 dark:text-teal-400 mr-2" />
              <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Timings:</strong> {placeDetails.timings}</p>
            </div>
            <div className="flex items-center">
              <Ticket className="text-teal-600 dark:text-teal-400 mr-2" />
              <p className="text-sm text-gray-700 dark:text-gray-300"><strong>Ticket Price:</strong> {placeDetails.ticket_price}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex space-x-4"
          >
            <button
              onClick={handleScheduleVisit}
              className="flex-1 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition duration-300 flex items-center justify-center"
            >
              <Calendar className="mr-2" />
              Schedule Visit
            </button>
            <button
              onClick={handleOpenMap}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            >
              <Map className="mr-2" />
              Open in Maps
            </button>
          </motion.div>
        </div>
      </motion.div>
      <ScheduleVisitModal
        isOpen={isScheduleModalOpen}
        onClose={handleCloseModal}
        placeName={placeDetails.name}
      />
      <FullSizeImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={placeDetails.image_url}
        placeName={placeDetails.name}
      />
    </div>
  )
}