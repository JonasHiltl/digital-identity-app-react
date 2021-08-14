import React from 'react'
import { SafeAreaView } from 'react-native'

import { Box, Text } from '../../../theme/theme'

const Settings: React.FC = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Settings Screen</Text>
    </SafeAreaView>
  )
}

export default Settings
