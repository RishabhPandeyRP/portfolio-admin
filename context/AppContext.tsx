"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import Cookies from "js-cookie"
import axiosInstance from "@/lib/axios";

interface AuthContextInterface {
    email: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
    token: string | null;
    isLoggedIn: boolean;
    isAuthLoading:boolean;
    // userId:string | null
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [email, setEmail] = useState<string | null>(Cookies.get("admin-email") || null)
    const [token, setToken] = useState<string | null>(Cookies.get("admin-token") || null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAuthLoading , setIsAuthLoading] = useState<boolean>(true)
    // const [userId , setUserId] = useState<string | null>(Cookies.get("userid") || null);

    useEffect(() => {
        const cookieToken = Cookies.get("admin-token")
        const cookieEmail = Cookies.get("admin-email")

        const validateToken = async () => {
            if (cookieToken && cookieEmail) {
                try {
                    console.log("this is token and mail from cookie" , cookieEmail , cookieToken)
                    const res = await axiosInstance.post(`/user/verify`, {"token" : cookieToken})

                    if (res.status == 200) {
                        setToken(cookieToken)
                        setEmail(cookieEmail)
                        setIsLoggedIn(true)
                    } else {
                        logout()
                    }
                } catch (err) {
                    console.error("Token validation failed:", err)
                    logout()
                }
            } else {
                logout()
            }
            setIsAuthLoading(false);
        }

        validateToken()
    }, [])

    const login = (token: string, email: string) => {
        Cookies.set("admin-token", token, {
            expires: 1, secure: true,
            sameSite: 'strict'
        })
        Cookies.set("admin-email", email, {
            expires: 1, secure: true,
            sameSite: 'strict'
        })
        // Cookies.set("userid" , userid , {expires:1,secure: true,
        //     sameSite: 'strict'})
        setEmail(email)
        setToken(token)
        setIsLoggedIn(true)
        // setUserId(userid)
    }

    const logout = () => {
        Cookies.remove("admin-token")
        Cookies.remove("admin-email")
        // Cookies.remove("userid")
        setEmail(null)
        setToken(null)
        setIsLoggedIn(false)
        // setUserId(null)
    }
    return (
        <AuthContext.Provider value={{ email, token, login, logout, isLoggedIn, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("UseAuth error")
    }
    return context
}