import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Camera, User} from 'lucide-react';
import axios from 'axios';
import axiosInstance from '@/lib/axios';

interface ReviewData {
  id?: string;
  name: string;
  company: string;
  position: string;
  feedback: string;
  rating: number;
  imageLink: string;
  featured: boolean;
}

interface ReviewFormProps {
  existingData?: ReviewData;
  formOrigin?:string;
  id?:string
}

const ReviewForm: React.FC<ReviewFormProps> = ({ existingData, formOrigin, id  }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<ReviewData>({
    name: '',
    company: '',
    position: '',
    feedback: '',
    rating: 5,
    imageLink: '',
    featured: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imgUploading, setImgUploading] = useState(false);

  useEffect(() => {
    if (existingData) {
      setFormData(existingData);
      setImagePreview(existingData.imageLink);
    }
  }, [existingData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    if (name === 'imageLink') {
      setImagePreview(value);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // setFormData({ ...formData, imageUrl: file.name });

      console.log('Images uploaded:', file)
      const formData = new FormData()


      formData.append('images', file) // append 'images' multiple times


      try {
        setImgUploading(true)
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        // setWorkData(prevWork => {...prevWork , images : res.data})
        console.log("these are the uploaded images", res.data.images)


        setFormData((prev) => ({ ...prev!, imageLink: res.data.images[0].url }));
        setImgUploading(false)
        return res.data
      } catch (error) {
        console.error('Image upload failed:', error)
        setImgUploading(false)
        throw error
      }
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("this is form data" , formData)
      if(formOrigin == "edit"){
        const updatedReview = await axiosInstance.put(`/reviews/${id}` , formData)
        console.log("this is the updated review" , updatedReview.data)
        toast.success("updated successfully")
        return;
      }
      const newReview = await axiosInstance.post(`/reviews` , formData)
      console.log("this is new review" , newReview.data)
      toast.success("Successfully posted review")
    } catch (error:unknown) {
      if (error instanceof Error) {
        console.log("error while posting review" , error.message)
        
    } else {
        console.log("Unknown error occurred while posting review");
    }
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <button
        key={index}
        type="button"
        onClick={() => setFormData({ ...formData, rating: index + 1 })}
        className={`p-1 ${index < formData.rating ? 'text-yellow-400' : 'text-gray-300'} hover:scale-110 transition-transform`}
      >
        <svg
          className="w-8 h-8 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </button>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {existingData ? 'Edit Review' : 'Create Review'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Acme Inc"
              />
            </div>
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
              Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="CEO"
            />
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
              Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              rows={4}
              placeholder="Write your feedback here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex items-center space-x-1">
              {renderStars()}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <label
                  htmlFor="profile-picture"
                  className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                >
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-500">Click to upload image</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</span>
                </label>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-full">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white shadow">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <p className="text-xs text-gray-500 mt-3">Profile preview</p>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
              Feature this review on the homepage
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={() => router.push('/dashboard/reviews')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || imgUploading}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Saving...' : existingData ? 'Update Review' : 'Create Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;