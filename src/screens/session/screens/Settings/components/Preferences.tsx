import React from 'react'
import { Switch, Platform, PlatformColor } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Paper from '../../../../../components/custom_comps/paper'
import { Box, Text, useTheme } from '../../../../../context/theme/theme'
import { useThemeContext } from '../../../../../context/theme/ThemeContext'
import i18n from '../../../../../i18n'

const Preferences = () => {
  const theme = useTheme()

  const { isDark, toggleTheme } = useThemeContext()
  return (
    <Box marginBottom="m">
      <Text variant="subheader" paddingHorizontal="m" paddingBottom="xs">
        {i18n.t('settings.preferences')}
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
            <Text variant="subtitle">{i18n.t('settings.darkMode')}</Text>
          </Box>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={
              Platform.OS === 'ios'
                ? undefined
                : isDark
                ? theme.colors.primary
                : undefined
            }
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default Preferences
