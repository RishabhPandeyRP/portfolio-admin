'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Code, Globe, Layers, FileImage } from 'lucide-react'
import axios from 'axios'
import axiosInstance from '@/lib/axios'
import { MultiImageUpload } from '@/components/ImageUpload'
import { useAuthContext } from '@/context/AppContext'
import { useEffect } from 'react'

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    shortDescription: z.string().min(1, "Short description is required"),
    description: z.string().min(1, "Description is required"),
    category: z.enum(['web', 'app', 'ui/ux'], {
        required_error: "Please select a category"
    }),
    liveLink: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
    techStack: z.string().min(1, "Tech stack is required"),
    featured: z.boolean().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function NewWorkPage() {
    const router = useRouter()
    const [isFeatured, setIsFeatured] = useState(false)
    const [images, setImages] = useState<string[]>([])
    // const [previews, setPreviews] = useState<string[]>([])
    // const [dragActive, setDragActive] = useState(false)
    // const [posting , setPosting] = useState<Boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { featured: false }
    })

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
           
            setImages(prevWork => {
                //@ts-expect-error possibility of error
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

    // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    //     setDragActive(false)

    //     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
    //         const newFiles = Array.from(e.dataTransfer.files)
    //         const newPreviews = newFiles.map(file => URL.createObjectURL(file))

    //         setImages(prev => [...prev, ...newFiles])
    //         setPreviews(prev => [...prev, ...newPreviews])
    //     }
    // }

    // const removeImage = (index: number) => {
    //     const updatedFiles = [...images]
    //     const updatedPreviews = [...previews]
    //     URL.revokeObjectURL(updatedPreviews[index])
    //     updatedFiles.splice(index, 1)
    //     updatedPreviews.splice(index, 1)
    //     setImages(updatedFiles)
    //     setPreviews(updatedPreviews)
    // }

    const onSubmit = async (data: FormData) => {
        console.log({
            ...data,
            featured: isFeatured,
            //@ts-expect-error possibility of error
            images: images.images,
            techStack:data.techStack.split(", ")
        })

        try {
            // setPosting(true)
            const newWork = await axiosInstance.post(`/works` , {
                ...data,
                featured: isFeatured,
                //@ts-expect-error possibility of error
                images: images.images,
                techStack:data.techStack.split(", ")
            })

            console.log("new work posted" , newWork.data)

            toast.success('Project created successfully!', {
                description: 'Your new project has been added to your portfolio.'
            })

            // setPosting(false)
            setTimeout(() => {
                router.push('/dashboard/work')
            }, 1500)
        } catch (error:unknown) {
            // setPosting(false)
            if (error instanceof Error) {
                
                console.log("error occured while posting work" , error.message)
            } else {
                console.log("Unknown error occurred while posting the work");
            }
            toast.error("error while uploading new work")
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Create New Project
                </h1>
                <p className="text-gray-500 mt-2">
                    Showcase your latest work with compelling details and visuals
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden text-black">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-gray-800">Project Details</h2>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Main Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                                        Project Title
                                    </label>
                                    <Input
                                        {...register('title')}
                                        className="border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg"
                                        placeholder="Enter a memorable title"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                                        Short Description
                                    </label>
                                    <Input
                                        {...register('shortDescription')}
                                        className="border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg"
                                        placeholder="Brief overview of your project"
                                    />
                                    {errors.shortDescription && (
                                        <p className="mt-1 text-sm text-red-500">{errors.shortDescription.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                                        <div className="flex items-center">
                                            <Layers className="w-4 h-4 mr-1.5 text-gray-500" />
                                            Category
                                        </div>
                                    </label>
                                    <select
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-gray-800 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        {...register('category')}
                                    >
                                        <option value="">Select a category</option>
                                        <option value="web">Web Development</option>
                                        <option value="app">Mobile Application</option>
                                        <option value="ui/ux">UI/UX Design</option>
                                    </select>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                                        <div className="flex items-center">
                                            <Code className="w-4 h-4 mr-1.5 text-gray-500" />
                                            Tech Stack
                                        </div>
                                    </label>
                                    <Input
                                        {...register('techStack')}
                                        className="border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg"
                                        placeholder="React, Tailwind CSS, Node.js, etc."
                                    />
                                    {errors.techStack && (
                                        <p className="mt-1 text-sm text-red-500">{errors.techStack.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                                        <div className="flex items-center">
                                            <Globe className="w-4 h-4 mr-1.5 text-gray-500" />
                                            Live Link
                                        </div>
                                    </label>
                                    <Input
                                        {...register('liveLink')}
                                        className="border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg"
                                        placeholder="https://your-project.com"
                                    />
                                    {errors.liveLink && (
                                        <p className="mt-1 text-sm text-red-500">{errors.liveLink.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                                        Detailed Description
                                    </label>
                                    <Textarea
                                        rows={10}
                                        {...register('description')}
                                        className="border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-lg"
                                        placeholder="Provide comprehensive details about your project, including your approach, challenges, and outcomes."
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-4 mt-4">
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            checked={isFeatured}
                                            onChange={setIsFeatured}
                                            className="data-[state=checked]:bg-blue-600"
                                        />
                                        <label className="text-sm font-medium text-gray-700">
                                            Feature this project on homepage
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="pt-4 border-t border-gray-100">
                            <label className="text-sm font-medium text-gray-700 block mb-2">
                                <div className="flex items-center">
                                    <FileImage className="w-4 h-4 mr-1.5 text-gray-500" />
                                    Project Images
                                </div>
                            </label>

                            {/* <div
                                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                                onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true); }}
                                onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); }}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="file-input"
                                />
                                <label htmlFor="file-input" className="cursor-pointer">
                                    <div className="flex flex-col items-center justify-center">
                                        <Upload className="w-10 h-10 text-gray-400 mb-2" />
                                        <p className="text-sm font-medium text-gray-700">
                                            Drag and drop images or click to browse
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            PNG, JPG, GIF up to 5MB each
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {previews.length > 0 && (
                                <div className="mt-6">
                                    <p className="text-sm font-medium text-gray-700 mb-3">
                                        {previews.length} {previews.length === 1 ? 'image' : 'images'} selected
                                    </p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {previews.map((src, idx) => (
                                            <div key={idx} className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-200">
                                                <div className="aspect-video relative">
                                                    <Image
                                                        src={src}
                                                        alt={`Project image ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200" />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 bg-white bg-opacity-80 text-red-600 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={() => removeImage(idx)}
                                                        title="Remove image"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )} */}

                            <MultiImageUpload
                                onImagesUpload={handleImagesUpload}
                                initialImages={images}
                                label="Project Images"
                                description="Upload multiple images to showcase your project"
                                maxImages={10}
                                className="mb-6"
                            />
                        </div>
                    </div>

                    {/* Form Footer */}
                    <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/dashboard/work')}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
                                    Creating Project...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-1.5" />
                                    Create Project
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}