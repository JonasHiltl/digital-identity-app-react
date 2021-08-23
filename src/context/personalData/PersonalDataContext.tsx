import { createContext, useContext } from 'react'
import { PersonalDataCredential } from '../../types'

export type ContextType = {
  credential: PersonalDataCredential | null
  setCredential: (credential: PersonalDataCredential) => void
  removeCredential: () => void
}

const PersonalDataContext = createContext<ContextType>({
  credential: null,
  setCredential: () =>
    console.warn('No Personal Data provider above component'),
  removeCredential: () =>
    console.warn('No Personal Data provider above component'),
})

export const usePersonalData = () => useContext(PersonalDataContext)

export default PersonalDataContext
