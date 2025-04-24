'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit3, Loader2 } from 'lucide-react';
import ReviewForm from '@/components/ReviewForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/Button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axiosInstance from '@/lib/axios';
import { useAuthContext } from '@/context/AppContext';

interface ReviewData {
    id: string;
    name: string;
    company: string;
    rating: number;
    position: string,
    feedback: string,
    imageLink: string,
    featured: boolean,
    createdAt: string,
    updatedAt: string,
}

const EditReviewPage = () => {
    let { id } = useParams();
    id = Array.isArray(id) ? id[0] : id;
    const router = useRouter();
    const [reviewData, setReviewData] = useState<ReviewData | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {isLoggedIn , isAuthLoading} = useAuthContext()
    useEffect(() => {
        const loadReview = async () => {
            try {
                if (!id || typeof id !== 'string') {
                    throw new Error('Invalid review ID');
                }

                setLoading(true);
                const data = await axiosInstance.get(`/reviews/${id}`);
                setReviewData(data.data);
                setError(null);
            } catch (err) {
                console.error('Failed to load review:', err);
                setError('Failed to load review. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        loadReview();
    }, [id]);

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


    

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
                <div className="flex justify-between gap-2 border-0 border-red-500 text-black w-[100%]">

                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Edit3 className="h-6 w-6 text-primary" />
                        Edit Review
                    </h1>


                    <Button
                        variant="ghost"
                        size="lg"
                        onClick={handleGoBack}
                        aria-label="Go back"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <div className='border-0 border-red-500 w-[100%]'>
                            go back
                        </div>
                    </Button>



                </div>
            </div>

            {loading ? (
                <div className="space-y-6 py-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-8 w-64" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-10 w-32" />
                </div>
            ) : error ? (
                <Alert variant="destructive" className="my-6">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : (
                <div className="bg-card rounded-lg shadow-sm border p-6">
                    <ReviewForm
                        existingData={reviewData}
                        formOrigin="edit"
                        id={id}
                    />
                </div>
            )}

            {loading && (
                <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground py-2 px-4 rounded-full flex items-center gap-2 shadow-lg">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading review data...</span>
                </div>
            )}
        </div>
    );
};

export default EditReviewPage;