import { createContext, useContext } from 'react'
import { ContactInformationCredential } from '../../types'

export type ContextType = {
  contactCredential: ContactInformationCredential | null
  setCredential: (credential: ContactInformationCredential) => void
  removeCredential: () => void
}

const ContactInformationContext = createContext<ContextType>({
  contactCredential: null,
  setCredential: () =>
    console.warn('No Personal Data provider above component'),
  removeCredential: () =>
    console.warn('No Personal Data provider above component'),
})

export const useContactInformation = () => useContext(ContactInformationContext)

export default ContactInformationContext
