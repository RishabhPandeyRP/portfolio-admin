import React from 'react';
import { toast } from 'sonner';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';
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

const ReviewCard: React.FC<{ review: Review , onDelete?: (id: string) => void; }> = ({  review , onDelete }) => {
  const router = useRouter()
  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/reviews/${review.id}`);
      toast.success('Review deleted successfully');
      onDelete?.(review.id);
      router.push("/dashboard/reviews")
    } catch (error) {
      console.log("error while deleting review" , error)
      toast.error('Failed to delete review');
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start space-x-4 mb-4">
        <img 
          src={review.imageLink} 
          alt={review.name} 
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
          <p className="text-sm text-gray-600">{review.position} at {review.company}</p>
          <div className="flex items-center mt-1">
            {renderStars(review.rating)}
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700 leading-relaxed line-clamp-3">{review.feedback}</p>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Link 
          href={`/dashboard/reviews/${review.id}/edit`} 
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors duration-150"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </Link>
        <button 
          onClick={handleDelete} 
          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition-colors duration-150"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;