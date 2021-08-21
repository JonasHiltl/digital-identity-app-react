import React from 'react'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { Box, Text, useTheme } from '../../../context/theme/theme'

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
  const theme = useTheme()

  return (
    <Box width={width} padding="m">
      {goBack ? (
        <TouchableOpacity onPress={goBack}>
          <Box flexDirection="row" alignItems="center">
            <Ionicons
              name="arrow-back"
              size={20}
              style={{ color: theme.colors.fontHeader }}
            />
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
