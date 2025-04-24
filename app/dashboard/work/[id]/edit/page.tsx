"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ArrowLeft, Save, Loader2, Globe, Code } from 'lucide-react'
import Link from 'next/link'
import { MultiImageUpload } from '@/components/ImageUpload' // Import the new component
import axiosInstance from '@/lib/axios'
import axios from 'axios'
import { useAuthContext } from '@/context/AppContext'
import { useParams } from 'next/navigation'

interface Work{
    id:string;
    liveLink:string;
    title:string;
    category:string;
    shortDescription:string;
    description:string;
    techStack:string;
    featured:boolean
  }
  

const EditWorkPage = () => {
    const router = useRouter()

    const { id } = useParams() as { id: string };
    console.log("this is the id from edit page", id)

    const [workData, setWorkData] = useState<Work | null>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const {isLoggedIn , isAuthLoading} = useAuthContext()

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    // Simulate API delay
                    //   await new Promise(resolve => setTimeout(resolve, 1000))

                    // const fetchedData = {
                    //     id,
                    //     title: "Sample Work",
                    //     shortDescription: "This is a sample project showcasing modern web development",
                    //     description: "This is a sample description that provides more detailed information about the project, including its goals, challenges, and outcomes. We built this using modern web technologies to deliver a seamless user experience.",
                    //     category: "web",
                    //     liveLink: "http://example.com",
                    //     techStack: "React, Tailwind, Prisma",
                    //     featured: true,
                    //     images: []
                    // }

                    const workById = await axiosInstance.get(`/works/${id}`)
                    console.log("this is work by id", workById.data)
                    setWorkData(workById.data)
                } catch (error) {
                    console.log("error while fetching work by id" , error)
                    toast.error("Failed to load project data")
                } finally {
                    setLoading(false)
                }
            }

            fetchData()
        }
    }, [id])

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

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            // Simulate API call
            // await new Promise(resolve => setTimeout(resolve, 1000))
            setSaving(true)
            console.log("this is workdata " , workData)
            console.log("this is endpoint" , `/works/${id}`)
            const updatedWork = await axiosInstance.put(`/works/${id}` , workData)
            console.log("updated work" , updatedWork)
            setSaving(false)
            toast.success("Project updated successfully!")
            router.push('/dashboard/work')
        } catch (error:unknown) {
            if (error instanceof Error) {
                console.log("error while updating the work " , error.message)
                
            } else {
                console.log("Unknown error occurred while updating the work");
            }
            toast.error("Failed to update project")
        } finally {
            setSaving(false)
        }
    }

    const handleImagesUpload = async (files: File[]) => {
        // Handle multiple image uploads
        console.log('Images uploaded:', files)
        const formData = new FormData()

        files.forEach((file) => {
            formData.append('images', file) // append 'images' multiple times
        })

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/images/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            // setWorkData(prevWork => {...prevWork , images : res.data})
            console.log("these are the uploaded images", res.data.images)
            //@ts-expect-error can be error here
            setWorkData(prevWork => {
                //@ts-expect-error can be error here
                const updatedImages = res.data.images.map(img => ({
                  url: img.url,
                  alt: "work image",
                }))
              
                return { ...prevWork, images: updatedImages }
              })
              
              
            return res.data
        } catch (error) {
            console.error('Image upload failed:', error)
            throw error
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading project data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Page Header */}
            <div className="mb-8">
                <Link
                    href="/dashboard/work"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to projects
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
                <p className="text-gray-600 mt-2">Update your project details and showcase images</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Form Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden text-black">
                    <div className="p-6 space-y-6">
                        {/* Project Images */}
                        <MultiImageUpload
                            onImagesUpload={handleImagesUpload}
                            //@ts-expect-error can resolve later
                            initialImages={workData.images}
                            label="Project Images"
                            description="Upload multiple images to showcase your project"
                            maxImages={10}
                            className="mb-6"
                        />

                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={workData?.title}
                                    onChange={(e) => setWorkData({ ...workData!, title: e.target.value })}
                                    placeholder="Enter project title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={workData?.category}
                                    onChange={(e) => setWorkData({ ...workData!, category: e.target.value })}
                                >
                                    <option value="web">Web Development</option>
                                    <option value="app">Mobile App</option>
                                    <option value="design">UI/UX Design</option>
                                    <option value="ui/ux">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Short Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Short Description
                            </label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                value={workData?.shortDescription}
                                onChange={(e) => setWorkData({ ...workData!, shortDescription: e.target.value })}
                                placeholder="Brief overview of your project"
                            />
                        </div>

                        {/* Detailed Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Detailed Description
                            </label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                rows={6}
                                value={workData?.description}
                                onChange={(e) => setWorkData({ ...workData!, description: e.target.value })}
                                placeholder="Provide detailed information about your project"
                            />
                        </div>

                        {/* Tech Stack and Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <div className="flex items-center">
                                        <Code className="w-4 h-4 mr-2" />
                                        Tech Stack
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={workData?.techStack}
                                    onChange={(e) => setWorkData({ ...workData!, techStack: e.target.value })}
                                    placeholder="e.g., React, Node.js, MongoDB"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <div className="flex items-center">
                                        <Globe className="w-4 h-4 mr-2" />
                                        Live Link
                                    </div>
                                </label>
                                <input
                                    type="url"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={workData?.liveLink}
                                    onChange={(e) => setWorkData({ ...workData!, liveLink: e.target.value })}
                                    placeholder="https://example.com"
                                />
                            </div>
                        </div>

                        {/* Featured Toggle */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="featured"
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={workData?.featured}
                                onChange={(e) => setWorkData({ ...workData!, featured: e.target.checked })}
                            />
                            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                                Feature this project on the homepage
                            </label>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                        <Link href="/dashboard/work">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditWorkPage