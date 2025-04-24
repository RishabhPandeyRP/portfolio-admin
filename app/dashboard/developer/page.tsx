// /app/dashboard/developer/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import { 
  UserPlus, 
  Edit, 
  Loader2, 
  Users,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import axiosInstance from '@/lib/axios';
import { useAuthContext } from '@/context/AppContext';

interface Developer {
  id: string;
  name: string;
  designation: string;
  imageUrl: string;
}

const DeveloperPage = () => {
  const router = useRouter();
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const {isLoggedIn , isAuthLoading} = useAuthContext()

  useEffect(() => {
    // Simulate fetching developer data (replace with an API call later)
    const fetchDevelopers = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        // await new Promise(resolve => setTimeout(resolve, 800));

        const developers = await axiosInstance.get(`/developers`)
        console.log("developers are : " , developers.data)
        
        setDevelopers(developers.data);
      } catch (error) {
        toast.error("Failed to load developers");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDevelopers();
  }, []); 

    useEffect(() => {
      if (!isAuthLoading && !isLoggedIn ) {
        router.push("/auth/login")
      }
    }, [isLoggedIn, router])
  
    if (isAuthLoading) {
      return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        checking login status
      </div>)
    }

  

  const handleEditClick = (id: string) => {
    router.push(`/dashboard/developer/${id}/edit`);
  };

  const handleCreateClick = () => {
    router.push('/dashboard/developer/create');
  };

  const filteredDevelopers = developers.filter(dev =>
    dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dev.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-8 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
              <Users className="mr-2 h-7 w-7 text-blue-500" />
              Team Members
            </h1>
            <p className="text-gray-500 mt-1">Manage your team of developers and designers</p>
          </div>
          
          <Button 
            variant="primary" 
            onClick={handleCreateClick}
            className="shadow-md"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mt-6 relative text-black">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search team members..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-500">Loading team members...</p>
        </div>
      ) : (
        <>
          {/* Empty State */}
          {developers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-md border border-gray-100">
              <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No team members found</h3>
              <p className="text-gray-500 mb-6">Get started by adding your first team member</p>
              <Button variant="default" onClick={handleCreateClick}>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          ) : (
            <>
              {/* Filtered Results Message */}
              {searchTerm && (
                <div className="mb-4 text-sm text-gray-500">
                  Found {filteredDevelopers.length} results for &quot;{searchTerm}&quot;
                </div>
              )}

              {/* Developer Grid */}
              {filteredDevelopers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredDevelopers.map((developer) => (
                    <div 
                      key={developer.id} 
                      className="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg group"
                    >
                      {/* Card Header with accent color */}
                      <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                      
                      <div className="p-6">
                        <div className="relative w-24 h-24 mx-auto mb-4 border-0 border-red-500">
                          <Image
                            src={developer.imageUrl}
                            alt={developer.name}
                            fill
                            className="border-0 border-red-500 rounded-full shadow-md object-center"
                          />
                        </div>
                        
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-800">{developer.name}</h3>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full mt-1">
                            {developer.designation}
                          </span>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-center border-t border-gray-100 pt-4 mt-2">
                          <Button 
                            variant="outline"
                            onClick={() => handleEditClick(developer.id)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8 bg-white rounded-xl shadow-md">
                  <Search className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No matching results</h3>
                  <p className="text-gray-500">Try adjusting your search terms</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DeveloperPage;