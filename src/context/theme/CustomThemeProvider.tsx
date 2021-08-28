import React, { useState, useMemo, useEffect } from 'react'
import { ThemeProvider } from '@shopify/restyle'
import SecureStorage from '../../utils/secureStorage'
import { darkTheme, lightTheme } from './theme'
import ThemeContext from './ThemeContext'

export const CustomThemeProvider: React.FC = ({ children }) => {
  const [isDark, setDark] = useState<boolean>(false)

  const toggleTheme = async () => {
    await SecureStorage.save('isDark', `${!isDark}`)
    setDark((isDark) => !isDark)
  }

  const providerTheme = useMemo(() => ({ isDark, toggleTheme }), [isDark])

  useEffect(() => {
    let mounted = true
    if (mounted) {
      const getTheme = async () => {
        const isDarkString = await SecureStorage.get('isDark')
        if (isDarkString === 'true') {
          setDark(true)
        } else setDark(false)
      }
      getTheme()
    }
    return () => {
      mounted = false
    }
  }, [])

  return (
    <ThemeContext.Provider value={providerTheme}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
