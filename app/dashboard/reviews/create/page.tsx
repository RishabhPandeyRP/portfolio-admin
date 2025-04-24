'use client';

import React from 'react';
import Link from 'next/link';
import ReviewForm from '@/components/ReviewForm';
import { useAuthContext } from '@/context/AppContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CreateReviewPage = () => {
  const router = useRouter()
  const {isLoggedIn , isAuthLoading} = useAuthContext()

    useEffect(() => {
      if (!isAuthLoading && !isLoggedIn) {
        router.push("/auth/login")
      }
    }, [isAuthLoading , isLoggedIn, router])
  
    if (isAuthLoading) {
      return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        checking login status
      </div>)
    }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Link 
              href="/dashboard/reviews" 
              className="hover:text-gray-900 transition-colors"
            >
              Reviews
            </Link>
            <span>/</span>
            <span className="text-gray-900">Create</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Review</h1>
              <p className="mt-2 text-gray-600">Add a new client testimonial to showcase on your website</p>
            </div>
            <Link 
              href="/dashboard/reviews" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg 
                className="w-5 h-5 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Reviews
            </Link>
          </div>
        </div>

        <ReviewForm />
      </div>
    </div>
  );
};

export default CreateReviewPage;