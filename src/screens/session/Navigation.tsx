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
import Settings from './screens/Settings'

import { Box, useTheme } from '../../context/theme/theme'
import { SessionParamList } from './SessionparamList'
import { useWindowDimensions } from 'react-native'

const Stack = createNativeStackNavigator<SessionParamList>()
const Tab = createBottomTabNavigator()

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  )
}

function DocumentsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Documents" component={Documents} />
    </Stack.Navigator>
  )
}

function SettingsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

export default function Navigation() {
  const theme = useTheme()
  const { width, height } = useWindowDimensions()

  return (
    <Box backgroundColor="mainBackground" width={width} height={height}>
      <NavigationContainer>
        <Tab.Navigator
          defaultScreenOptions={{
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.buttonDisabled,
            tabBarShowLabel: false,
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name == 'Home') {
                return focused ? (
                  <HomeIcon width={size + 3} height={size + 3} color={color} />
                ) : (
                  <HomeOutlined width={size} height={size} color={color} />
                )
              } else if (route.name == 'Documents') {
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
