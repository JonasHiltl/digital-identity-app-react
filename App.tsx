import React, { useState, useEffect, useMemo } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClient, QueryClientProvider } from 'react-query'

import { CustomThemeProvider } from './src/context/theme/CustomThemeProvider'
import Navigation from './src/screens/session/Navigation'
import { ActivityIndicator, LogBox } from 'react-native'
import AuthNavigation from './src/screens/auth/AuthNavigation'
import { DID } from './src/types'
import SecureStorage from './src/utils/secureStorage'
import AuthContext from './src/context/auth/AuthContext'
import Loading from './src/screens/Loading'

LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
])

const queryClient = new QueryClient()

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [did, setDid] = useState<DID | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)

  function logout() {
    setIsAuthenticated(false)
    setDid(null)
  }

  function login(did: DID) {
    setIsAuthenticated(true)
    setDid(did)
  }

  const providerAuth = useMemo(
    () => ({ isAuthenticated, logout, login, did }),
    [isAuthenticated, did],
  )

  useEffect(() => {
    setLoading(true)
    let mounted = true

    const getDid = async () => {
      const didJson = await SecureStorage.get('did')
      if (!didJson) {
        return didJson
      } else {
        const did: DID = JSON.parse(didJson)
        console.log(did)
        setIsAuthenticated(true)
        setDid(did)
        return did
      }
    }

    getDid().catch(() => console.warn('Error validating stored did'))
    setLoading(false)
    return () => {
      mounted = false
    }
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <AuthContext.Provider value={providerAuth}>
          <BottomSheetModalProvider>
            {isLoading ? (
              <Loading />
            ) : isAuthenticated ? (
              <Navigation />
            ) : (
              <AuthNavigation />
            )}
          </BottomSheetModalProvider>
        </AuthContext.Provider>
      </CustomThemeProvider>
    </QueryClientProvider>
  )
}
