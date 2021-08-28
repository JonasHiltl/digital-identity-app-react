import { createContext, useContext } from 'react'
import { DID } from '../../types'

export type ContextType = {
  isAuthenticated: boolean
  usesLocalAuth: boolean
  jwt: string
  logout: () => void
  login: (did: DID, jwt: string) => void
  toggleLocalAuth: () => void
  did: DID | null
}

const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
  jwt: '',
  usesLocalAuth: false,
  logout: () => console.warn('Not Auth provider above component'),
  login: () => console.warn('Not Auth provider above component'),
  toggleLocalAuth: () => console.warn('Not Auth provider above component'),
  did: null,
})

export const useAuth = () => useContext(AuthContext)

export default AuthContext
