// app/components/Footer.jsx
import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-6 text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
      </div>
    </footer>
  )
}