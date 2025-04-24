// app/admin/login/page.jsx
"use client";

import { useState } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, ArrowRightIcon } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useAuthContext } from "@/context/AppContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error] = useState("");
    const { login } = useAuthContext()
    const router = useRouter()


    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            
            console.log("this is form data", {email , password})
            const response = await axiosInstance.post(`/user/login`, {email , password})
            
            console.log("login response ", response.data)
            const token= response.data.token;
            const useremail = response.data.user.email

            if (response.status == 200) {

                toast.success("Logged in")
                login(token, useremail)
                setIsLoading(false)
                router.push("/dashboard")
                return
            }

            if (response.status == 500) {

                toast.error("Error while log you in")
                setIsLoading(false)
                return
            }

            toast.error("Some error occured")
            setIsLoading(false)

        } catch (error: unknown) {

            if (error instanceof Error) {
                console.log("error :login", error.message)
            } else {
                console.log("Unknown error occurred at :login");
            }
            toast.error("Error while logging up")
            setIsLoading(false)
        }


    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        loginHandler(e)
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-md border border-gray-200 px-8 py-3 rounded-md shadow-md shadow-gray-300">
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-light text-gray-900 mb-2">Portfolio Admin</h1>
                    <div className="h-1 w-12 bg-blue-500 mx-auto rounded-full"></div>
                </div>

                {/* Form */}
                <div className="space-y-8">
                    {error && (
                        <div className="bg-red-50 text-red-700 text-sm p-3 rounded-md border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full px-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 text-sm transition-all"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                {/* <Link
                                    href="/admin/forgot-password"
                                    className="text-xs text-blue-600 hover:text-blue-500"
                                >
                                    Forgot password?
                                </Link> */}
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="block w-full px-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-gray-900 text-sm transition-all"
                                    placeholder="••••••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>



                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* <div className="text-center text-sm text-gray-500">
                        <p>
                            Need an account?{" "}
                            <Link href="/admin/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Contact administrator
                            </Link>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}