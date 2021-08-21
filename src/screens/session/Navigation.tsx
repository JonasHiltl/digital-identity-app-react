import React from 'react'

// navigation components
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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
import ContactInformation from './screens/Settings/ContactInformation'
import { useThemeContext } from '../../context/theme/ThemeContext'
import i18n from '../../i18n'
import PersonalData from './screens/Settings/PersonalData'
import Residence from './screens/Settings/Residence'

const Stack = createNativeStackNavigator<SessionParamList>()
const Tab = createBottomTabNavigator()

export default function Navigation() {
  const theme = useTheme()
  const { isDark } = useThemeContext()
  const { width, height } = useWindowDimensions()

  const stackOptions: NativeStackNavigationOptions = {
    headerBackTitle: i18n.t('back'),
    headerStyle: { backgroundColor: theme.colors.backgroundAccent },
    headerTintColor: theme.colors.primary,
    headerTitleStyle: { color: theme.colors.fontHeader },
  }

  function HomeStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen options={stackOptions} name="Home" component={Home} />
      </Stack.Navigator>
    )
  }

  function DocumentsStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            ...stackOptions,
            headerTitle: i18n.t('documents.documents'),
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
            ...stackOptions,
            headerTitle: i18n.t('settings.settings'),
          }}
          name="Settings"
          component={Settings}
        />
        <Stack.Screen
          options={{
            ...stackOptions,
            headerTitle: i18n.t('settings.contactInformation'),
          }}
          name="ContactInformation"
          component={ContactInformation}
        />
        <Stack.Screen
          options={{
            ...stackOptions,
            headerTitle: i18n.t('creation.residence'),
          }}
          name="Residence"
          component={Residence}
        />
        <Stack.Screen
          options={{
            ...stackOptions,
            headerTitle: i18n.t('settings.personalData'),
          }}
          name="PersonalData"
          component={PersonalData}
        />
      </Stack.Navigator>
    )
  }

  return (
    <Box backgroundColor="mainBackground" flex={1}>
      <NavigationContainer
        theme={{
          dark: isDark,
          colors: {
            ...DefaultTheme.colors,
            primary: theme.colors.primary,
            background: theme.colors.mainBackground,
            card: theme.colors.backgroundAccent,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: theme.colors.navigationIcon,
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
