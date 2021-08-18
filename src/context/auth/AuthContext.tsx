import { createContext, useContext } from 'react'
import { DID } from '../../types'

export type ContextType = {
  isAuthenticated: boolean
  logout: () => void
  login: (did: DID) => void
  did: DID | null
}

const AuthContext = createContext<ContextType>({
  isAuthenticated: false,
  logout: () => console.warn('Not Auth provider above component'),
  login: () => console.warn('Not Auth provider above component'),
  did: null,
})

export const useAuth = () => useContext(AuthContext)

export default AuthContext
