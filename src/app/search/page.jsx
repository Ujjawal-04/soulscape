"use client"
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import placesData from '../data/famous_places_india.json';

function SearchResults() {
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      const filteredResults = Object.entries(placesData).filter(([state, places]) => 
        state.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6">Search Results for "{query}"</h2>
      {results.length > 0 ? (
        results.map(([state, places]) => (
          <div key={state} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{state}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <Link href={`/place/${encodeURIComponent(state)}/${encodeURIComponent(place.name)}`} key={place.name}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <Image
                      src={place.image_url}
                      alt={place.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-fill"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2">{place.name}</h4>
                      <p className="text-gray-600 line-clamp-2">{place.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
