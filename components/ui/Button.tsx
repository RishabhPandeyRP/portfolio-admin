
import { cn } from "@/lib/utils";
import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
  }


const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ variant = "default", size = "default", className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        
        // Size variations
        size === "default" && "h-10 py-2 px-4",
        size === "sm" && "h-9 px-3 rounded-md",
        size === "lg" && "h-11 px-8 rounded-md",
        size === "icon" && "h-10 w-10",
        
        // Variant styles
        variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "destructive" && "bg-red-500 text-white hover:bg-red-600",
        variant === "outline" && "border border-input hover:bg-accent hover:text-accent-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        variant === "ghost" && "hover:bg-accent hover:text-accent-foreground", // Ghost variant
        variant === "link" && "underline-offset-4 hover:underline text-primary",
        
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

// Export the Button component
export { Button }