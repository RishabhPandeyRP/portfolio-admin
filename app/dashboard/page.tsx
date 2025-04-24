"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaCog, FaUsers, FaTasks, FaComments } from 'react-icons/fa';
import { toast } from 'sonner';
import { useAuthContext } from '@/context/AppContext';
import { useEffect } from 'react';

const DashboardPage = () => {
  const router = useRouter();
  
  const navigateToSection = (section: string) => {
    router.push(`/dashboard/${section}`);
  };

  const {isLoggedIn , isAuthLoading} = useAuthContext()
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Welcome back! Manage your workspace, developers, reviews, and settings from a single place.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Work"
            icon={<FaTasks className="w-6 h-6" />}
            onClick={() => navigateToSection('work')}
            description="Manage projects, tasks, and workflows efficiently."
            color="blue"
          />
          <DashboardCard
            title="Developers"
            icon={<FaUsers className="w-6 h-6" />}
            onClick={() => navigateToSection('developer')}
            description="Oversee your development team and assignments."
            color="emerald"
          />
          <DashboardCard
            title="Reviews"
            icon={<FaComments className="w-6 h-6" />}
            onClick={() => navigateToSection('reviews')}
            description="Monitor and manage customer testimonials."
            color="purple"
          />
          <DashboardCard
            title="Settings"
            icon={<FaCog className="w-6 h-6" />}
            onClick={() => toast('Settings page coming soon!')}
            description="Configure your dashboard preferences."
            color="orange"
          />
        </div>

        {/* Activity Overview Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center h-32 text-gray-500">
              <p>No recent activity to display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  description: string;
  color: 'blue' | 'emerald' | 'purple' | 'orange';
}

const DashboardCard = ({ title, icon, onClick, description, color }: DashboardCardProps) => {
  const colorClasses = {
    blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    emerald: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800',
    purple: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
    orange: 'from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800',
  };

  const glowClasses = {
    blue: 'after:bg-blue-500/20',
    emerald: 'after:bg-emerald-500/20',
    purple: 'after:bg-purple-500/20',
    orange: 'after:bg-orange-500/20',
  };

  return (
    <div
      onClick={onClick}
      className="relative group transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Card Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        {/* Icon Header */}
        <div className={`bg-gradient-to-r ${colorClasses[color]} p-6 transition-colors duration-300`}>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              {icon}
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          
          {/* Hover Arrow */}
          <div className="mt-4 flex items-center text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            <span>View details</span>
            <svg 
              className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 after:absolute after:inset-0 after:rounded-xl ${glowClasses[color]} after:blur-xl after:-z-10`}></div>
    </div>
  );
};

export default DashboardPage;