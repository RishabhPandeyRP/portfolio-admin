"use client"
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Pencil, Trash2, Plus, ExternalLink, Calendar, Tag } from 'lucide-react'
import axiosInstance from '@/lib/axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuthContext } from '@/context/AppContext'
import { useRouter } from 'next/navigation'

interface Work {
  id: string;
  liveLink: string;
  title: string;
  category: string;
  shortDescription: string;

}

export default function WorkListPage() {
  // const works: Work[] = mockWorks
  const [work, setWork] = useState<Work[] | undefined>(undefined)
  const router = useRouter()

  const { isLoggedIn, isAuthLoading } = useAuthContext()
  useEffect(() => {
    fetcher()
  }, [])

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      router.push("/auth/login")
    }
  }, [isAuthLoading, isLoggedIn, router])

  if (isAuthLoading) {
    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      checking login status
    </div>)
  }


  const fetcher = async () => {
    try {
      const works = await axiosInstance.get(`/works`)
      console.log("these are works ", works.data)
      setWork(works.data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error while fetching the works : ", error.message)
      } else {
        console.log("Unknown error occurred while fetching the works");
      }
    }
  }



  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/works/${id}`)
      const updated = work?.filter(w => w.id !== id);
      setWork(updated);
      toast.success("Deleted successfully")
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("error in deleteing the work", error.message)

      } else {
        console.log("Unknown error occurred while deleting the work");
      }
      toast.error("error while deleting the work")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">All Projects</h1>
              <p className="mt-2 text-gray-600">Manage and organize your portfolio of work</p>
            </div>
            <Link href="/dashboard/work/new">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5">
                <Plus className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {work?.map((work) => (
            <div
              key={work.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image Preview Section */}
              <div className="relative aspect-video overflow-hidden bg-gray-100">
                {/* Replace with actual image when available */}
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <Tag className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">Project Preview</p>
                  </div>
                </div>

                {/* Image Overlay with Quick Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Link href={work.liveLink} target="_blank"
                      rel="noopener noreferrer" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <button className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                    {work.title}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shrink-0">
                    {work.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {work.shortDescription}
                </p>

                {/* Metadata */}
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Updated {new Date().toLocaleDateString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">

                  <Link href={`/dashboard/work/${work.id}/edit`} className="flex-1">
                    <Button
                      className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-all duration-200"
                      variant="secondary"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-all duration-200"
                    variant="destructive"
                    onClick={() => handleDelete(work.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {work?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first project</p>
            <Link href="/dashboard/work/new">
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}