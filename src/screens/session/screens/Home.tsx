import React from 'react'

import { Box, Text, useTheme } from '../../../context/theme/theme'

const Home: React.FC = () => {
  return (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home Screen</Text>
    </Box>
  )
}

export default Home
