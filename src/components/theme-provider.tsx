"use client"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const htmlEl = document.documentElement
    let observer: MutationObserver

    const syncTheme = () => {
      const hasDarkmode = htmlEl.classList.contains("darkmode")
      const currentHasDark = htmlEl.classList.contains("dark")
      const currentHasLight = htmlEl.classList.contains("light")
      
      if (hasDarkmode && !currentHasDark) {
        observer?.disconnect()
        setTheme("dark")
        htmlEl.classList.add("dark")
        htmlEl.classList.remove("light")
        htmlEl.style.colorScheme = "dark"
        observer?.observe(htmlEl, { attributes: true, attributeFilter: ["class"] })
      } else if (!hasDarkmode && !currentHasLight) {
        observer?.disconnect()
        setTheme("light")
        htmlEl.classList.add("light") 
        htmlEl.classList.remove("dark")
        htmlEl.style.colorScheme = "light"
        observer?.observe(htmlEl, { attributes: true, attributeFilter: ["class"] })
      }
    }

    syncTheme()

    observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          syncTheme()
        }
      })
    })

    observer.observe(htmlEl, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
}