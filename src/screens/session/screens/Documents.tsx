import React from 'react'
import { SafeAreaView } from 'react-native'

import { Box, Text, useTheme } from '../../../context/theme/theme'

const Documents: React.FC = () => {
  const theme = useTheme()
  return (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Documents Screen</Text>
    </Box>
  )
}

export default Documents
