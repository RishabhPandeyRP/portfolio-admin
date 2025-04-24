// /app/dashboard/reviews/layout.tsx
import React from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            {/* Navigation */}
            <nav className="flex items-center mb-4 text-sm">
              <Link 
                href="/dashboard" 
                className="text-gray-500 hover:text-gray-700 flex items-center transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Dashboard
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Reviews</span>
            </nav>

            {/* Title Section */}
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg mr-4">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Reviews Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage and respond to client feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      

      {/* Main Content Area */}
      <main className="py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* <div className="p-4 border-b border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <select className="rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="recent">Most Recent</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="unresponded">Unresponded</option>
                  </select>
                  <select className="rounded-md border border-gray-300 py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="all">All Reviews</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Reset Filters
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Showing 1-10 of 324</span>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Export Reviews
                  </button>
                </div>
              </div>
            </div> */}
            
            <div className="divide-y divide-gray-200">
              {children}
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
}