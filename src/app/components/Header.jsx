// app/components/Header.jsx
import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-blue-600">Wanderlust</Link>
          <ul className="flex space-x-6">
            <li><Link href="/destinations" className="hover:text-blue-600 transition-colors">Destinations</Link></li>
            <li><Link href="#about" className="hover:text-blue-600 transition-colors">About</Link></li>
            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  )
}