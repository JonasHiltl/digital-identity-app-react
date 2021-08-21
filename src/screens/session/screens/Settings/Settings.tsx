import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { ScrollView, Switch } from 'react-native-gesture-handler'

import { Box, Text, useTheme } from '../../../../context/theme/theme'
import { SessionParamList } from '../../SessionparamList'
import Preferences from './components/Preferences'
import Profile from './components/Profile'
import Security from './components/Security'

const Settings = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<SessionParamList, 'Settings'>
}) => {
  const theme = useTheme()
  return (
    <ScrollView style={{ paddingVertical: theme.spacing.m }}>
      <Profile
        onPersonalPress={() => navigation.push('PersonalData')}
        onResidencePress={() => navigation.push('Residence')}
        onContactPress={() => navigation.push('ContactInformation')}
      />
      <Preferences />
      <Security />
    </ScrollView>
  )
}

export default Settings
