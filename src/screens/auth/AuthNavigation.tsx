import React from 'react'

// navigation components
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Onboarding from './onboarding/Onboarding'
import Creation from './creation/Creation'
import { AuthParamList } from './AuthParamList'

const AuthStack = createNativeStackNavigator<AuthParamList>()

export default () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Onboarding"
      >
        <AuthStack.Screen name="Onboarding" component={Onboarding} />
        <AuthStack.Screen name="Creation" component={Creation} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}
