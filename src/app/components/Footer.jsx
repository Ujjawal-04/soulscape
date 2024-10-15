import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-800 dark:to-blue-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Information */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Soulscape</h2>
            <p className="text-sm text-teal-100 dark:text-teal-200">Your gateway to experiencing the magic of India.</p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#about" className="hover:text-teal-200 transition duration-300">About Us</Link>
              <Link href="/contact" className="hover:text-teal-200 transition duration-300">Contact</Link>
              <Link href="/destinations" className="hover:text-teal-200 transition duration-300">Destinations</Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left" id="contact">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">Phone: +91-1223344556</p>
            <p className="text-sm">Email: soulscape1510@gmail.com</p>
          </div>

          {/* Social Media and Newsletter */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Connect with Us</h3>
            <div className="flex justify-center md:justify-start space-x-4 mb-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition duration-300">
                <Facebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition duration-300">
                <Instagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-200 transition duration-300">
                <Twitter size={24} />
              </a>
            </div>
            
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-teal-400 dark:border-teal-600 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
          <p>Made by Ujjawal</p>
        </div>
      </div>
    </footer>
  );
}