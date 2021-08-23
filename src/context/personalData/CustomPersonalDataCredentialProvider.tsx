import React, { useEffect, useMemo, useState } from 'react'
import { PersonalDataCredential } from '../../types'
import SecureStorage from '../../utils/secureStorage'
import { useAuth } from '../auth/AuthContext'
import PersonalDataContext from './PersonalDataContext'

const CustomPersonalDataProvider: React.FC = ({ children }) => {
  const [personalData, setPersonalData] =
    useState<PersonalDataCredential | null>(null)
  const { isAuthenticated } = useAuth()

  function setCredential(credential: PersonalDataCredential) {
    setPersonalData(credential)
  }
  function removeCredential() {
    setPersonalData(null)
  }

  const personalDataProvider = useMemo(
    () => ({
      credential: personalData,
      setCredential: setCredential,
      removeCredential: removeCredential,
    }),
    [personalData],
  )

  useEffect(() => {
    let mounted = true
    if (isAuthenticated) {
      const getPersonalData = async () => {
        const personalDataJson = await SecureStorage.get('personal-data')
        if (personalDataJson) {
          const personalData: PersonalDataCredential =
            JSON.parse(personalDataJson)
          setPersonalData(personalData)
          console.log('Personal Data set')
          console.log(personalData.credentialSubject.firstName)
        }
      }
      getPersonalData().catch((error) => console.warn(error))
    }

    return () => {
      mounted = false
    }
  }, [isAuthenticated])

  return (
    <PersonalDataContext.Provider value={personalDataProvider}>
      {children}
    </PersonalDataContext.Provider>
  )
}

export default CustomPersonalDataProvider
