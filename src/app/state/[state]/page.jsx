// app/state/[state]/page.js
"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import placesData from '../../data/famous_places_india.json';
import Link from 'next/link';

const StateDetails = () => {
  const { state } = useParams();
  const places = placesData[state] || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-blue-800 text-center mb-8">{state}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <div key={place.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={place.image_url} alt={place.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{place.name}</h2>
              <p className="text-gray-600">{place.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/destinations" className="text-blue-600 hover:underline mt-4 inline-block">Back to Destinations</Link>
    </div>
  );
};

export default StateDetails;
