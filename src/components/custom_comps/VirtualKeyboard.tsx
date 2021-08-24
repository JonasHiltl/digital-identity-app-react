import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import { Box, Text, useTheme } from '../../context/theme/theme'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from '@gorhom/bottom-sheet'

interface Props {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  maxLength: number
}

const VirtualKeyboard: React.FC<Props> = ({ input, setInput, maxLength }) => {
  const theme = useTheme()

  const onPress = (number: number, type: 'add' | 'back') => {
    let newInput = input
    if (type == 'back') {
      newInput = newInput.slice(0, -1)
    } else if (input.length < maxLength) {
      newInput += number
    }
    setInput(newInput)
  }

  return (
    <Box>
      <Box flexDirection="row">
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(1, 'add')
          }}
        >
          <Text fontSize={18}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(2, 'add')
          }}
        >
          <Text fontSize={18}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(3, 'add')
          }}
        >
          <Text fontSize={18}>3</Text>
        </TouchableOpacity>
      </Box>
      <Box flexDirection="row">
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(4, 'add')
          }}
        >
          <Text fontSize={18}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(5, 'add')
          }}
        >
          <Text fontSize={18}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(6, 'add')
          }}
        >
          <Text fontSize={18}>6</Text>
        </TouchableOpacity>
      </Box>
      <Box flexDirection="row">
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(7, 'add')
          }}
        >
          <Text fontSize={18}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(8, 'add')
          }}
        >
          <Text fontSize={18}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(9, 'add')
          }}
        >
          <Text fontSize={18}>9</Text>
        </TouchableOpacity>
      </Box>
      <Box flexDirection="row">
        <Box flex={1} padding="m" />
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(0, 'add')
          }}
        >
          <Text fontSize={18}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[classes.key, { padding: theme.spacing.m }]}
          onPress={() => {
            onPress(0, 'back')
          }}
        >
          <Ionicons
            name="backspace-outline"
            size={22}
            color={theme.colors.fontHeader}
          />
        </TouchableOpacity>
      </Box>
    </Box>
  )
}

const classes = StyleSheet.create({
  key: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default VirtualKeyboard
