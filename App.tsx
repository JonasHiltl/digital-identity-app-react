import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { BackHandler } from 'react-native'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClient, QueryClientProvider } from 'react-query'
import * as LocalAuthentication from 'expo-local-authentication'

import { CustomThemeProvider } from './src/context/theme/CustomThemeProvider'
import Navigation from './src/screens/session/Navigation'
import { LogBox } from 'react-native'
import AuthNavigation from './src/screens/auth/AuthNavigation'
import { DID } from './src/types'
import SecureStorage from './src/utils/secureStorage'
import AuthContext from './src/context/auth/AuthContext'
import Loading from './src/screens/Loading'
import JWTUtils from './src/utils/jwtUtils'

import PersonalDataProvider from './src/context/personalData/PersonalDataCredentialProvider'
import NotificationsProvider from './src/context/notifications/NotificationsProvider'
import ContactInformationProvider from './src/context/contactInformation/ContactInformationProvider'

LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
  'Face ID is not available in Expo Go. You can use it in a standalone Expo app by providing `NSFaceIDUsageDescription`.',
])

const queryClient = new QueryClient()

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [usesLocalAuth, setUsesLocalAuth] = useState<boolean>(false)
  const [did, setDid] = useState<DID | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [jwt, setJwt] = useState('')

  function logout() {
    setIsAuthenticated(false)
    setDid(null)
  }
  function login(did: DID, jwt: string) {
    setIsAuthenticated(true)
    setJwt(jwt)
    setDid(did)
  }

  const toggleLocalAuth = async () => {
    await SecureStorage.save('local-auth', JSON.stringify(!usesLocalAuth))
    setUsesLocalAuth((usesLocalAuth) => !usesLocalAuth)
  }

  const authProvider = useMemo(
    () => ({
      isAuthenticated: isAuthenticated,
      jwt: jwt,
      usesLocalAuth: usesLocalAuth,
      logout: logout,
      login: login,
      toggleLocalAuth: toggleLocalAuth,
      did: did,
    }),
    [isAuthenticated, usesLocalAuth, did, jwt, logout, login, toggleLocalAuth],
  )

  useEffect(() => {
    let mounted = true

    setLoading(true)
    if (!isAuthenticated && mounted) {
      const getDid = async () => {
        /* await SecureStorage.delete('did')
        await SecureStorage.delete('contact-information')
        await SecureStorage.delete('personal-data') */

        const savedlocalAuth = await SecureStorage.get('local-auth')
        if (savedlocalAuth === 'true') {
          setUsesLocalAuth(() => true)
        } else setUsesLocalAuth(() => false)

        const compatible = await LocalAuthentication.hasHardwareAsync()
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync()

        if (compatible && savedBiometrics && savedlocalAuth === 'true') {
          const result = await LocalAuthentication.authenticateAsync()
          if (result.success) {
            const didJson = await SecureStorage.get('did')
            if (didJson) {
              const did: DID = JSON.parse(didJson)
              const jwt = await JWTUtils.create(
                did.id,
                did.key.secret,
                did.key.public,
              )
              setIsAuthenticated(true)
              setDid(did)
              setJwt(jwt)
              setLoading(false)
            }
          } else {
            BackHandler.exitApp()
          }
        } else {
          const didJson = await SecureStorage.get('did')
          if (didJson) {
            const did: DID = JSON.parse(didJson)
            const jwt = await JWTUtils.create(
              did.id,
              did.key.secret,
              did.key.public,
            )
            setIsAuthenticated(true)
            setDid(did)
            setJwt(jwt)
            setLoading(false)
          }
        }
      }
      getDid()
    }
    setLoading(false)

    return () => {
      mounted = false
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <CustomThemeProvider>
        <AuthContext.Provider value={authProvider}>
          <PersonalDataProvider>
            <ContactInformationProvider>
              <NotificationsProvider>
                <BottomSheetModalProvider>
                  {isLoading ? (
                    <Loading />
                  ) : isAuthenticated ? (
                    <Navigation />
                  ) : (
                    <AuthNavigation />
                  )}
                </BottomSheetModalProvider>
              </NotificationsProvider>
            </ContactInformationProvider>
          </PersonalDataProvider>
        </AuthContext.Provider>
      </CustomThemeProvider>
    </QueryClientProvider>
  )
}
