import { ThemeProvider } from '@shopify/restyle'
import React, { useState, useMemo } from 'react'
import { darkTheme, lightTheme } from './theme'
import ThemeContext from './ThemeContext'

export const CustomThemeProvider: React.FC = ({ children }) => {
  const [isDark, setDark] = useState<boolean>(false)

  const toggleTheme = () => {
    setDark((isDark) => !isDark)
  }

  const providerTheme = useMemo(() => ({ isDark, toggleTheme }), [isDark])

  return (
    <ThemeContext.Provider value={providerTheme}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
