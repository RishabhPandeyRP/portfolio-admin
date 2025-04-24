import React from 'react'
import { Briefcase, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const WorkLayout = ({ children }: { children: React.ReactNode }) => {
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
              <span className="text-gray-900 font-medium">Work</span>
            </nav>

            {/* Title Section */}
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Work Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your portfolio projects and showcase your work</p>
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

export default WorkLayout