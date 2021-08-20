import { ThemeContext } from '@shopify/restyle/dist/context'
import React, { useContext } from 'react'
import { Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Paper from '../../../../../components/custom_comps/paper'
import { Box, Text, useTheme } from '../../../../../context/theme/theme'
import { useThemeContext } from '../../../../../context/theme/ThemeContext'

const Preferences = () => {
  const theme = useTheme()

  const { isDark, toggleTheme } = useThemeContext()
  return (
    <Box>
      <Text variant="subheader" paddingHorizontal="m" paddingBottom="xs">
        Preferences
      </Text>
      <Paper>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flexDirection="row" alignItems="center">
            <Ionicons
              name="moon"
              size={24}
              color={theme.colors.icon}
              style={{ paddingRight: theme.spacing.m }}
            />
            <Text variant="subtitle">Dark Mode</Text>
          </Box>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </Box>
      </Paper>
    </Box>
  )
}

export default Preferences
