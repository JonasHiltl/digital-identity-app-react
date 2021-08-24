import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Box, Text, useTheme } from '../../context/theme/theme'
import { Animated } from 'react-native'
import { Notification } from '../../types'
import { NotificationContext } from './NotificationsContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeProvider } from '@react-navigation/native'

interface NotificationProps {
  message: string
  type: 'success' | 'error' | 'warning'
  onHide: () => void
}

const DisplayNotification: React.FC<NotificationProps> = ({
  message,
  type,
  onHide,
}) => {
  const theme = useTheme()
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide()
    })
  }, [])

  return (
    <Animated.View
      style={{
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          },
        ],
        marginHorizontal: theme.spacing.m,
        marginBottom: theme.spacing.s,
        backgroundColor:
          type === 'success'
            ? theme.colors.notiSuccessBG
            : type === 'error'
            ? theme.colors.notiErrorBG
            : 'white',
        padding: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor:
          type === 'success'
            ? theme.colors.notiSuccessBorder
            : type === 'error'
            ? theme.colors.notiErrorBorder
            : 'white',
      }}
    >
      <Text
        color={
          type === 'success' ? 'success' : type === 'error' ? 'error' : 'white'
        }
      >
        {message}
      </Text>
    </Animated.View>
  )
}

const NotificationsProvider: React.FC = ({ children }) => {
  const theme = useTheme()
  const [notifications, setNotifications] = useState<Notification[]>([])

  function addNotification(notification: Notification) {
    setNotifications([...notifications, notification])
  }

  const notificationProvider = useMemo(
    () => ({ notifications, addNotification }),
    [notifications],
  )

  return (
    <NotificationContext.Provider value={notificationProvider}>
      <SafeAreaView
        style={{
          position: 'absolute',
          zIndex: 2,
          right: 0,
          left: 0,
          top: theme.spacing.m,
        }}
      >
        {notifications.map((notification, index) => (
          <DisplayNotification
            key={`${notification.message}${index}`}
            message={notification.message}
            type={notification.type}
            onHide={() => {
              setNotifications((notifications) =>
                notifications.filter(
                  (currentNotification) =>
                    currentNotification.message !== notification.message,
                ),
              )
            }}
          />
        ))}
      </SafeAreaView>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationsProvider