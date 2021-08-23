import { createContext, useContext } from 'react'
import { DID } from '../../types'

export type ContextType = {
  isAuthenticated: boolean
  jwt: string
  logout: () => void
  login: (did: DID, jwt: string) => void
  did: DID | null
}

const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
  jwt: '',
  logout: () => console.warn('Not Auth provider above component'),
  login: () => console.warn('Not Auth provider above component'),
  did: null,
})

export const useAuth = () => useContext(AuthContext)

export default AuthContext
