// /app/dashboard/developer/[id]/edit/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axiosInstance from '@/lib/axios';
import axios from 'axios';
import { Save, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation';
import { useAuthContext } from '@/context/AppContext';

interface DeveloperData {
  id: string;
  name: string;
  designation: string;
  bio: string;
  imageUrl: string;
  skills: string;
  featured: boolean;
  socialLinks: {
    "linkedin": string
  }
}

const EditDeveloperPage = () => {
  const router = useRouter();
  // const { id } = params;
  const [developerData, setDeveloperData] = useState<DeveloperData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false)
  const [imgUploading, setImgUploading] = useState<boolean>(false)
  const { id } = useParams() as { id: string };

  const { isLoggedIn, isAuthLoading } = useAuthContext()
  
  useEffect(() => {
    // Simulate fetching data (replace with real API call)
    const fetchDeveloperData = async () => {
      const devById = await axiosInstance.get(`/developers/${id}`)
      console.log("this is dev by id", devById.data)
      setDeveloperData(devById.data);
      setImagePreview(devById.data.imageUrl);
    };

    if (id) {
      fetchDeveloperData();
    }
  }, [id]);

  useEffect(() => {
      console.log("is logged in" , isLoggedIn)
      if (!isAuthLoading && !isLoggedIn) {
        router.push("/auth/login")
      }
    }, [isAuthLoading , isLoggedIn, router])
  
    if (isAuthLoading) {
      return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        checking login status
      </div>)
    }

  

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setDeveloperData((prev) => ({ ...prev!, [name]: value }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

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


        setDeveloperData((prev) => ({ ...prev!, imageUrl: res.data.images[0].url }));
        setImgUploading(false)
        return res.data
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log("image upload failed", error.message)
        } else {
          console.log("Unknown error occurred at image upload");
        }
        setImgUploading(false)
        throw error
      }


    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true)

      let payload = null
      if (typeof (developerData?.skills) == "string") {
        payload = { ...developerData, skills: developerData?.skills.split(",") }
      } else {
        payload = developerData
      }
      console.log("this is the developer payload", payload)
      // Submit the edited developer data
      const updatedDeveloper = await axiosInstance.put(`/developers/${id}`, payload)
      console.log("this is updated developer data", updatedDeveloper.data)
      toast.success('Developer updated successfully!');
      setSaving(false)
      router.push('/dashboard/developer');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error occured while updating the developer", error.message)
      } else {
        console.log("Unknown error occurred while updating the developer");
      }
      toast.error("error while updating the developer's data")
      setSaving(false)
    }
  };

  if (!developerData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Edit Developer</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700 block mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={developerData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="designation" className="text-sm font-medium text-gray-700 block mb-1">
            Designation
          </label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={developerData.designation}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="skills" className="text-sm font-medium text-gray-700 block mb-1">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={Array.isArray(developerData.skills) ? developerData.skills.join(', ') : developerData.skills}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label htmlFor="bio" className="text-sm font-medium text-gray-700 block mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={developerData.bio}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="socialLinks" className="text-sm font-medium text-gray-700 block mb-1">
            Social Links
          </label>
          <textarea
            id="socialLinks"
            name="socialLinks"
            value={developerData.socialLinks.linkedin}
            onChange={handleInputChange}
            className="w-full border border-gray-300 text-gray-900 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            rows={4}
          />
        </div>

        <div>
          <label htmlFor="profilePicture" className="text-sm font-medium text-gray-700 block mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full mx-auto object-contain shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            checked={developerData.featured}
            onChange={(e) => setDeveloperData({ ...developerData, featured: e.target.checked })}
          />
          <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
            Feature this developer on the homepage
          </label>
        </div>

        <button
          type="submit"
          disabled={saving || imgUploading}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {saving ? (
            <div className='flex items-center'>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </div>
          ) : (
            <div className='flex items-center'>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </div>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditDeveloperPage;