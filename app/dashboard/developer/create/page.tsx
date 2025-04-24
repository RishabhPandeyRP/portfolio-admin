// /app/dashboard/developer/create/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Camera, User, Briefcase, FileText, Save, Code } from 'lucide-react';
import axios from 'axios';
import axiosInstance from '@/lib/axios';
import { useAuthContext } from '@/context/AppContext';


const CreateDeveloperPage = () => {
  const router = useRouter();
  const [developerData, setDeveloperData] = useState({
    name: '',
    designation: '',
    bio: '',
    imageUrl: '',
    skills: "",
    featured: false,
    socialLinks: ""
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const { isLoggedIn , isAuthLoading } = useAuthContext()
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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setDeveloperData({ ...developerData, imageUrl: file.name });

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
          console.error('Image upload failed:', error.message)

        } else {
          console.log("Unknown error occurred while img upload");
        }
        setImgUploading(false)
        throw error
      }
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDeveloperData({ ...developerData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call with delay
      // await new Promise(resolve => setTimeout(resolve, 800));
      let payload = null;

      payload = {
        ...developerData, skills: developerData.skills.split(", "), socialLinks: {
          linkedin: developerData.socialLinks
        }
      }
      console.log("this is create developer payload", payload)
      const newDeveloper = await axiosInstance.post(`/developers`, payload)
      console.log("this is new developer", newDeveloper.data)
      toast.success('Developer profile created successfully!');
      router.push('/dashboard/developer');
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error while creating new developer", error.message)

      } else {
        console.log("Unknown error occurred while creating developer");
      }
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold text-gray-900">Add New Developer</h1>
        <p className="mt-2 text-sm text-gray-500">
          Create a new developer profile to showcase in your team roster.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 text-black">
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Information</h2>

          <div className="grid gap-6 md:grid-cols-2 text-black">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={developerData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={developerData.designation}
                onChange={handleInputChange}
                placeholder="Senior Frontend Developer"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          </div>

          <div className="mt-6 space-y-2 text-black">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              Biography
            </label>
            <textarea
              name="bio"
              value={developerData.bio}
              onChange={handleInputChange}
              placeholder="Write a short description about the developer's background, expertise, and interests..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              rows={5}
              required
            />
          </div>

          <div className="mt-6 space-y-2 text-black">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <Code className="w-4 h-4 mr-2 text-gray-500" />
                skills
              </label>
              <input
                type="text"
                name="skills"
                value={developerData.skills}
                onChange={handleInputChange}
                placeholder="React, JS, Node"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
            </div>
          </div>

          <div className="mt-6 space-y-2 text-black">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
              <Code className="w-4 h-4 mr-2 text-gray-500" />
              social links
            </label>

            <div className="grid gap-6 md:grid-cols-2 text-black">
              <div className="space-y-2">

                <div className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
                  linkedin
                </div>
              </div>

              <div className="space-y-2">

                <input
                  type="text"
                  name="socialLinks"
                  value={developerData.socialLinks}
                  onChange={handleInputChange}
                  placeholder="https://www.linkedin.com/in/rishabh-pandey17/"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
            </div>
          </div>

          <div className='mt-6 space-y-2 text-black'>
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
          </div>


        </div>

        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Profile Picture</h2>

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
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/developer')}
            className="py-2.5 px-5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || imgUploading}
            className={`flex items-center py-2.5 px-6 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Developer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeveloperPage;