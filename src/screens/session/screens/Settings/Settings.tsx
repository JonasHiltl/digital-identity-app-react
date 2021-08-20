import React from 'react'
import { ScrollView, Switch } from 'react-native-gesture-handler'

import { Box, Text, useTheme } from '../../../../context/theme/theme'
import Preferences from './components/Preferences'

const Settings: React.FC = () => {
  const theme = useTheme()
  return (
    <Box
      style={{
        flex: 1,
        backgroundColor: theme.colors.mainBackground,
      }}
    >
      <ScrollView style={{ paddingVertical: theme.spacing.m }}>
        <Preferences />
      </ScrollView>
    </Box>
  )
}

export default Settings
