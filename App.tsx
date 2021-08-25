import './shim'
import 'fastestsmallesttextencoderdecoder'
import { Buffer } from 'buffer'

/* global.Buffer = Buffer */

import React, { useState, useEffect, useMemo } from 'react'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClient, QueryClientProvider } from 'react-query'

import { CustomThemeProvider } from './src/context/theme/CustomThemeProvider'
import Navigation from './src/screens/session/Navigation'
import { LogBox } from 'react-native'
import AuthNavigation from './src/screens/auth/AuthNavigation'
import { DID } from './src/types'
import SecureStorage from './src/utils/secureStorage'
import AuthContext from './src/context/auth/AuthContext'
import Loading from './src/screens/Loading'
import JWTUtils from './src/utils/jwtUtils'

import 'fastestsmallesttextencoderdecoder'
import PersonalDataProvider from './src/context/personalData/PersonalDataCredentialProvider'
import NotificationsProvider from './src/context/notifications/NotificationsProvider'
import ContactInformationProvider from './src/context/contactInformation/ContactInformationProvider'

LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component is no longer necessary. You can now directly use the ref instead. This method will be removed in a future release.',
])

const queryClient = new QueryClient()

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [did, setDid] = useState<DID | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
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

  const authProvider = useMemo(
    () => ({ isAuthenticated, logout, login, did, jwt }),
    [isAuthenticated, did, jwt],
  )

  useEffect(() => {
    let mounted = true
    if (!isAuthenticated) {
      const getDid = async () => {
        /* await SecureStorage.delete('did')
        await SecureStorage.delete('personal-data') */
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
        }
      }
      getDid().catch((error) => console.warn(error))
    }

    setLoading(false)
    return () => {
      mounted = false
    }
  }, [isAuthenticated])

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
