import React from 'react'

// navigation components
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Onboarding from './onboarding/Onboarding'
import Creation from './creation/Creation'
import { AuthParamList } from './AuthParamList'
import { Box, useTheme } from '../../context/theme/theme'
import { useWindowDimensions } from 'react-native'

const AuthStack = createNativeStackNavigator<AuthParamList>()

export default () => {
  const theme = useTheme()
  const { width, height } = useWindowDimensions()

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.mainBackground,
      primary: theme.colors.primary,
      card: theme.colors.backgroundAccent,
    },
  }

  return (
    <NavigationContainer theme={MyTheme}>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Onboarding" component={Onboarding} />
        <AuthStack.Screen name="Creation" component={Creation} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}
