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
      const hasLightmode = htmlEl.classList.contains("lightmode")
      const currentHasDark = htmlEl.classList.contains("dark")
      const currentHasLight = htmlEl.classList.contains("light")
      
      let shouldBeDark = false
      
      if (hasDarkmode) {
        shouldBeDark = true
        console.log("Theme check: forced dark mode")
      } else if (hasLightmode) {
        shouldBeDark = false
        console.log("Theme check: forced light mode")
      } else {
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        console.log(`Theme check: system theme, prefers-color-scheme dark: ${shouldBeDark}`)
      }
      
      console.log(`Current classes: dark=${currentHasDark}, light=${currentHasLight}, should be dark=${shouldBeDark}`)
      
      if (shouldBeDark && !currentHasDark) {
        console.log("Theme sync: switching to dark")
        observer?.disconnect()
        setTheme("dark")
        htmlEl.classList.add("dark")
        htmlEl.classList.remove("light")
        htmlEl.style.colorScheme = "dark"
        setTimeout(() => observer?.observe(htmlEl, { attributes: true, attributeFilter: ["class"] }), 0)
      } else if (!shouldBeDark && !currentHasLight) {
        observer?.disconnect()
        setTheme("light")
        htmlEl.classList.add("light") 
        htmlEl.classList.remove("dark")
        htmlEl.style.colorScheme = "light"
        setTimeout(() => observer?.observe(htmlEl, { attributes: true, attributeFilter: ["class"] }), 0)
      }
    }

    syncTheme()

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      syncTheme()
    }
    
    mediaQuery.addEventListener('change', handleSystemThemeChange)

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
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
}