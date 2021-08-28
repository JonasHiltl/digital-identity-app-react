import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Text, useTheme } from '../../context/theme/theme'
import { Animated } from 'react-native'
import { Notification } from '../../types'
import { NotificationContext } from './NotificationsContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

interface NotificationProps {
  message: string
  type: 'success' | 'error'
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
    let mounted = true
    if (mounted) {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(1500),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onHide()
      })
    }
    return () => {
      mounted = false
    }
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
        position: 'absolute',
        zIndex: 2,
        right: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:
          type === 'success'
            ? theme.colors.notiSuccessBG
            : theme.colors.notiErrorBG,
        paddingVertical: theme.spacing.m,
        paddingHorizontal: theme.spacing.m,
        borderBottomWidth: 1,
        borderColor:
          type === 'success'
            ? theme.colors.notiSuccessBorder
            : theme.colors.notiErrorBorder,
      }}
    >
      <SafeAreaView style={{ flexDirection: 'row' }}>
        <Ionicons
          size={18}
          name={type === 'success' ? 'checkmark-circle' : 'close-circle'}
          color={type === 'success' ? theme.colors.success : theme.colors.error}
        />
        <Text
          marginLeft="xs"
          color={
            type === 'success'
              ? 'success'
              : type === 'error'
              ? 'error'
              : 'white'
          }
        >
          {message}
        </Text>
      </SafeAreaView>
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
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationsProvider
