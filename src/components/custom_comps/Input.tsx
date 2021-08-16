import React, { useState } from 'react'
import { KeyboardTypeOptions, TextInput } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import { Box, Text } from '../../theme/theme'

interface Props {
  variant?: 'plain' | 'date'
  errorMessage?: string
  placeholder: string
  value?: string
  onChange: (text: string) => void
  keyboardType?: KeyboardTypeOptions
}

const Input: React.FC<Props> = ({
  variant,
  errorMessage,
  placeholder,
  onChange,
  value,
  keyboardType,
}) => {
  const [focused, setFocused] = useState(false)

  return (
    <Box marginVertical="xs">
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
            placeholder="dd/mm/yyyy"
            mask={Masks.DATE_DDMMYYYY}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={(formatted) => onChange(formatted)}
            value={value!}
            keyboardType={keyboardType}
          />
        ) : (
          <TextInput
            placeholder={placeholder}
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
