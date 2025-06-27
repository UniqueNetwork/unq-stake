"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(next)
  }

  return (
      <header className={cn("st-sticky st-top-0 st-shadow-sm st-bg-white dark:st-bg-gray-900")}>
        <div className={cn("st-max-w-7xl st-mx-auto st-px-4 sm:st-px-6 lg:st-px-8")}>
          <div className={cn("st-flex st-justify-end st-h-16 st-items-center space-x-4")}>
            <button
                onClick={toggleTheme}
                className={cn("st-p-2 st-rounded-md hover:st-bg-gray-100 dark:hover:st-bg-gray-800 transition")}
            >
              {resolvedTheme === "dark" ? (
                  <Sun className="st-w-5 st-h-5" />
              ) : (
                  <Moon className="st-w-5 st-h-5" />
              )}
            </button>
          </div>
        </div>
      </header>
  )
}
