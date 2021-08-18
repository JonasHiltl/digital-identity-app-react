import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Box } from '../context/theme/theme'

const Loading: React.FC = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator />
    </Box>
  )
}

export default Loading
