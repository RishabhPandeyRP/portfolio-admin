// /app/dashboard/developer/layout.tsx

import React from 'react'
import { Users, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const DeveloperLayout = ({ children }: { children: React.ReactNode }) => {
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
              <span className="text-gray-900 font-medium">Team</span>
            </nav>

            {/* Title Section */}
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Team Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your team members and their roles</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 border-b border-gray-200">
              <div className="flex -mb-px space-x-8">
                <Link 
                  href="/dashboard/developer" 
                  className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Overview
                </Link>
                <Link 
                  href="/dashboard/developer/roles" 
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Roles
                </Link>
                <Link 
                  href="/dashboard/developer/settings" 
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      
    </div>
  )
}

export default DeveloperLayout