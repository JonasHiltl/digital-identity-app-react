import React from 'react'
import { useRestyle, spacing, border, backgroundColor } from '@shopify/restyle'
import { Box, Text, Theme } from '../../context/theme/theme'

const restyleFunctions = [spacing, border, backgroundColor]
interface Props {
  title: string
}

const Paper: React.FC<Props> = ({ title, children }) => {
  return (
    <Box>
      <Text variant="heading">{title}</Text>
      {children}
    </Box>
  )
}

export default Paper
