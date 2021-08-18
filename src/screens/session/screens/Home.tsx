import React from 'react'
import { SafeAreaView } from 'react-native'

import { Box, Text } from '../../../context/theme/theme'

const Home: React.FC = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text>Home Screen</Text>
    </SafeAreaView>
  )
}

export default Home
