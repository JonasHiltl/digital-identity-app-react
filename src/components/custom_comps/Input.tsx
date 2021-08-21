import React, { useState } from 'react'
import { KeyboardTypeOptions, TextInput } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import { Box, Text, useTheme } from '../../context/theme/theme'
import { useThemeContext } from '../../context/theme/ThemeContext'

interface Props {
  variant?: 'plain' | 'date'
  label?: string
  errorMessage?: string
  placeholder: string
  value?: string
  onChange: (text: string) => void
  keyboardType?: KeyboardTypeOptions
}

const Input: React.FC<Props> = ({
  variant,
  label,
  errorMessage,
  placeholder,
  onChange,
  value,
  keyboardType,
}) => {
  const [focused, setFocused] = useState(false)
  const theme = useTheme()
  const { isDark } = useThemeContext()

  return (
    <Box marginVertical="xs">
      <Text variant="inputLabel">{label}</Text>
      <Box
        borderColor={errorMessage ? 'error' : focused ? 'primary' : 'inputBG'}
        paddingVertical="inputS"
        paddingHorizontal="inputM"
        borderRadius="s"
        borderWidth={2}
        backgroundColor={errorMessage ? 'inputErrorBG' : 'inputBG'}
      >
        {variant === 'date' ? (
          // @ts-ignore
          <MaskInput
            style={{ color: theme.colors.fontHeader }}
            placeholder="dd/mm/yyyy"
            placeholderTextColor={isDark ? theme.colors.placeholder : undefined}
            mask={Masks.DATE_DDMMYYYY}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={(formatted) => onChange(formatted)}
            value={value!}
            keyboardType={keyboardType}
          />
        ) : (
          <TextInput
            style={{ color: theme.colors.fontHeader }}
            placeholder={placeholder}
            placeholderTextColor={isDark ? theme.colors.placeholder : undefined}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
          />
        )}
      </Box>
      {errorMessage ? <Text color="error">{errorMessage}</Text> : null}
    </Box>
  )
}

export default Input
