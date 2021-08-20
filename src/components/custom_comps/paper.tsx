import React from 'react'
import { Box, Text } from '../../context/theme/theme'

const Paper: React.FC = ({ children }) => {
  return (
    <Box backgroundColor="backgroundAccent" borderRadius="m" padding="m">
      {children}
    </Box>
  )
}

export default Paper
