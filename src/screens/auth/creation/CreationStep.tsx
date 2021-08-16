import React from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Box, Text } from '../../../theme/theme'

interface Props {
  title: string
  subtitle: string
  goBack?: () => void
}

const CreationStep: React.FC<Props> = ({
  title,
  subtitle,
  goBack,
  children,
}) => {
  const { width } = useWindowDimensions()

  return (
    <Box width={width} padding="m">
      {goBack ? (
        <TouchableOpacity onPress={goBack}>
          <Box flexDirection="row" alignItems="center">
            <Ionicons name="arrow-back" size={20} />
            <Text>Back</Text>
          </Box>
        </TouchableOpacity>
      ) : null}
      <Box flex={1} justifyContent="space-evenly">
        <Box>
          <Text variant="heading" textAlign="left" paddingBottom="s">
            {title}
          </Text>
          <Text textAlign="left">{subtitle}</Text>
        </Box>
        <Box>{children}</Box>
        <Box />
      </Box>
    </Box>
  )
}

export default CreationStep
