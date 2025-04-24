import React from "react"
import { Users, Code, Briefcase, Settings } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
    return (
        <div>
            {/* Quick Links Section */}
            <div className="bg-white border-t border-gray-200 py-4 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-6 text-sm">
                        <Link href="/dashboard/work" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                            <Briefcase className="w-4 h-4 mr-2" />
                            Work Portfolio
                        </Link>
                        <Link href="/dashboard/developer" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                            <Users className="w-4 h-4 mr-2" />
                            Team Members
                        </Link>
                        <Link href="/dashboard/skills" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                            <Code className="w-4 h-4 mr-2" />
                            Skills
                        </Link>
                        <Link href="/dashboard/settings" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <p className="text-sm text-gray-500 text-center">
                        © {new Date().getFullYear()} Your Portfolio. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Footer