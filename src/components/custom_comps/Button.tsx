import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import { Box, Text } from '../../context/theme/theme'

interface Props {
  loading?: boolean
  onPress: () => void
  label: string
  disabled?: boolean
}

export const FlatButton: React.FC<Props> = ({
  loading,
  onPress,
  label,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Box
        backgroundColor={disabled ? 'buttonDisabled' : 'primary'}
        padding="m"
        borderRadius="m"
        alignItems="center"
        borderColor={disabled ? 'buttonDisabledBorder' : undefined}
        borderWidth={1}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text
            variant="button"
            color={disabled ? 'buttonDisabledBorder' : undefined}
          >
            {label}
          </Text>
        )}
      </Box>
    </TouchableOpacity>
  )
}

export const OutlinedButton: React.FC<Props> = ({
  loading,
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
