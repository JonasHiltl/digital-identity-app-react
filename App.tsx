import React, { useState } from 'react'
import { CustomThemeProvider } from './src/theme/CustomThemeProvider'
import Navigation from './src/screens/session/Navigation'
import { LogBox } from 'react-native'
import AuthNavigation from './src/screens/auth/AuthNavigation'

LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
])

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <CustomThemeProvider>
      {isAuthenticated ? <Navigation /> : <AuthNavigation />}
    </CustomThemeProvider>
  )
}
