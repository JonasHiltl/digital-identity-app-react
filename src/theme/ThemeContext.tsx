import { createContext, useContext } from 'react'

export type ContextType = {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ContextType>({
  isDark: true,
  toggleTheme: () => console.warn('Still using initial value'),
})

export const useTheme = () => useContext(ThemeContext)

export default ThemeContext
