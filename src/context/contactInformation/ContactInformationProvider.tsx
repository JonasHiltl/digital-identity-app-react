import React, { useEffect, useMemo, useState } from 'react'
import { ContactInformationCredential } from '../../types'
import SecureStorage from '../../utils/secureStorage'
import { useAuth } from '../auth/AuthContext'
import ContactInformationContext from './ContactInformation'

const ContactInformationProvider: React.FC = ({ children }) => {
  const [contactInformation, setContactInformation] =
    useState<ContactInformationCredential | null>(null)
  const { isAuthenticated } = useAuth()

  function setCredential(credential: ContactInformationCredential) {
    setContactInformation(credential)
  }
  function removeCredential() {
    setContactInformation(null)
  }

  const contactInformationProvider = useMemo(
    () => ({
      contactCredential: contactInformation,
      setCredential: setCredential,
      removeCredential: removeCredential,
    }),
    [contactInformation],
  )

  useEffect(() => {
    let mounted = true
    if (isAuthenticated && mounted) {
      const getContactInformation = async () => {
        const contactInformationJson = await SecureStorage.get(
          'contact-information',
        )
        if (contactInformationJson) {
          const contactInformation: ContactInformationCredential = JSON.parse(
            contactInformationJson,
          )
          setContactInformation(contactInformation)
        }
      }
      getContactInformation().catch((error) => console.warn(error))
    }

    return () => {
      mounted = false
    }
  }, [isAuthenticated])

  return (
    <ContactInformationContext.Provider value={contactInformationProvider}>
      {children}
    </ContactInformationContext.Provider>
  )
}

export default ContactInformationProvider
