import React from 'react'

// navigation components
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import {
  File,
  FileOutlined,
  Home as HomeIcon,
  HomeOutlined,
  Settings as SettingsIcon,
  SettingsOutlined,
} from '../../components/custom_comps/Icons'

// screens
import Home from './screens/Home'
import Documents from './screens/Documents'
import Settings from './screens/Settings/Settings'

import { Box, useTheme } from '../../context/theme/theme'
import { SessionParamList } from './SessionparamList'
import { useWindowDimensions } from 'react-native'
import { backgroundColor } from '@shopify/restyle'

const Stack = createNativeStackNavigator<SessionParamList>()
const Tab = createBottomTabNavigator()

export default function Navigation() {
  const theme = useTheme()
  const { width, height } = useWindowDimensions()

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors.backgroundAccent },
            headerTitleStyle: { color: theme.colors.fontHeader },
          }}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    )
  }

  function DocumentsStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors.backgroundAccent },
            headerTitleStyle: { color: theme.colors.fontHeader },
          }}
          name="Documents"
          component={Documents}
        />
      </Stack.Navigator>
    )
  }

  function SettingsStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: theme.colors.backgroundAccent },
            headerTitleStyle: { color: theme.colors.fontHeader },
          }}
          name="Settings"
          component={Settings}
        />
      </Stack.Navigator>
    )
  }

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.iconInactive,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.colors.backgroundAccent,
              borderTopColor: theme.colors.divider,
            },
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name == 'HomeStack') {
                return focused ? (
                  <HomeIcon width={size + 3} height={size + 3} color={color} />
                ) : (
                  <HomeOutlined width={size} height={size} color={color} />
                )
              } else if (route.name == 'DocumentsStack') {
                return focused ? (
                  <File width={size} height={size} color={color} />
                ) : (
                  <FileOutlined width={size} height={size} color={color} />
                )
              } else {
                return focused ? (
                  <SettingsIcon
                    width={size + 3}
                    height={size + 3}
                    color={color}
                  />
                ) : (
                  <SettingsOutlined width={size} height={size} color={color} />
                )
              }
            },
          })}
        >
          <Tab.Screen name="HomeStack" component={HomeStack} />
          <Tab.Screen name="DocumentsStack" component={DocumentsStack} />
          <Tab.Screen name="SettingsStack" component={SettingsStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </Box>
  )
}
