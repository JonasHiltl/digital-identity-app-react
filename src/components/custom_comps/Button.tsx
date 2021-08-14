import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Box, Text } from '../../theme/theme'

interface Props {
  onPress: () => void
  label: string
  disabled?: boolean
}

export const FlatButton: React.FC<Props> = ({ onPress, label, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Box
        backgroundColor={disabled ? 'buttonDisabled' : 'primary'}
        padding="m"
        borderRadius="m"
        alignItems="center"
      >
        <Text variant="button">{label}</Text>
      </Box>
    </TouchableOpacity>
  )
}

export const OutlinedButton: React.FC<Props> = ({
  onPress,
  label,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Box
        padding="m"
        borderRadius="m"
        alignItems="center"
        borderColor={disabled ? 'buttonDisabled' : 'primary'}
        borderWidth={2}
      >
        <Text variant={disabled ? 'outlinedButtonDisabled' : 'outlinedButton'}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
