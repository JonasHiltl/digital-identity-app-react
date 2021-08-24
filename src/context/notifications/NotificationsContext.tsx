import { createContext, useContext } from 'react'
import { Notification } from '../../types'

export type ContextType = {
  notifications: Notification[]
  addNotification: (notification: Notification) => void
}

export const NotificationContext = createContext<ContextType>({
  notifications: [],
  addNotification: (notification) =>
    console.warn('No Notification provider above component'),
})

const useNotification = () => useContext(NotificationContext)

export default useNotification
