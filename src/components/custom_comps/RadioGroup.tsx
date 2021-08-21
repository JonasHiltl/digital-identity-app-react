import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Box, useTheme, Text } from '../../context/theme/theme'
import { TouchableOpacity } from 'react-native'

interface Props {
  label?: string
  selectedValue: string
  flexDireaction: 'row' | 'column' | 'row-reverse' | 'column-reverse'
  buttons: { label: string; value: string; onPress: () => void }[]
}

const RadioGroup: React.FC<Props> = ({
  label,
  selectedValue,
  flexDireaction,
  buttons,
}) => {
  const theme = useTheme()
  return (
    <Box marginVertical="xs">
      <Text variant="inputLabel">{label}</Text>
      <Box flexDirection={flexDireaction}>
        {buttons.map((button, index) => {
          return (
            <Box
              key={button.label}
              flex={1}
              backgroundColor="inputBG"
              padding="m"
              borderRadius="m"
              marginRight={index == buttons.length - 1 ? undefined : 'm'}
              marginBottom={
                flexDireaction == 'column' || flexDireaction == 'column-reverse'
                  ? index == buttons.length - 1
                    ? undefined
                    : 'm'
                  : undefined
              }
            >
              <TouchableOpacity
                onPress={button.onPress}
                style={{ alignItems: 'center', flexDirection: 'row' }}
              >
                <Ionicons
                  name={
                    selectedValue === button.value
                      ? 'radio-button-on-outline'
                      : 'md-radio-button-off-outline'
                  }
                  color={theme.colors.primary}
                  size={22}
                />
                <Text marginLeft="m">{button.label}</Text>
              </TouchableOpacity>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default RadioGroup
