"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ReviewCard from '@/components/ReviewCard';
import axiosInstance from '@/lib/axios';
import { useAuthContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

interface Review {
  id: string;
  imageLink: string;
  name: string;
  position: string;
  company: string;
  feedback: string;
  rating: number;
}


const ReviewsListPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [totReviews , setTotReviews] = useState<number>(0)
  const [totRating , setTotRating] = useState<number>(0.0)
  const router = useRouter()

  const {isLoggedIn , isAuthLoading} = useAuthContext()

  const calculateAvgRating = (reviews : Review[])=>{
    let totalRating = 0
    if(reviews.length != 0){
      for(let i=0;i<reviews.length;i++){
        totalRating += reviews[i].rating
      }
      return Number((totalRating / reviews.length).toFixed(2))
    }
    return 0.0
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedReviews = await axiosInstance.get(`/reviews`)
        console.log("these are fteched reviews", fetchedReviews.data)
        setReviews(fetchedReviews.data);
        const averageRating = calculateAvgRating(fetchedReviews.data)
        console.log("this is average rating" , averageRating)
        setTotRating(averageRating)
      } catch (err:unknown) {
        console.log("error while fetching the reviews" , err)
        if(err instanceof Error){
          setError(err.message);
        }
        
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  

  

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{totRating}</div>
              <div className="text-sm text-gray-500">Average Rating</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{reviews.length}</div>
              <div className="text-sm text-gray-500">Total Reviews</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">89%</div>
              <div className="text-sm text-gray-500">Response Rate</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">2h</div>
              <div className="text-sm text-gray-500">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 mt-2">Manage and showcase client testimonials</p>
        </div>
        <Link
          href="/dashboard/reviews/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Review
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm animate-pulse">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No reviews yet</h3>
          <p className="mt-2 text-gray-500">Get started by creating your first review.</p>
          <div className="mt-6">
            <Link
              href="/dashboard/reviews/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Your First Review
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            
            <ReviewCard key={review.id} review={review} onDelete={(deletedId:string) => {
              const updated = reviews.filter(r => r.id !== deletedId);
              setReviews(updated);
              setTotRating(calculateAvgRating(updated));
            }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsListPage;