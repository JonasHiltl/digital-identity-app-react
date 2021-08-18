import React from 'react'
import { SafeAreaView } from 'react-native'

import { Box, Text } from '../../../context/theme/theme'

const Documents: React.FC = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Documents Screen</Text>
    </SafeAreaView>
  )
}

export default Documents
