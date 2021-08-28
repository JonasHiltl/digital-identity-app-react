import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { Switch } from 'react-native-gesture-handler'

import Paper from '../../../../../components/custom_comps/paper'
import { Box, Text, useTheme } from '../../../../../context/theme/theme'
import i18n from '../../../../../i18n'
import { useAuth } from '../../../../../context/auth/AuthContext'

const Security: React.FC = () => {
  const theme = useTheme()
  const { usesLocalAuth, toggleLocalAuth } = useAuth()

  return (
    <Box>
      <Text variant="subheader" paddingHorizontal="m" paddingBottom="xs">
        {i18n.t('settings.security')}
      </Text>
      <Paper>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flexDirection="row">
            <Ionicons
              name="finger-print"
              size={24}
              color={theme.colors.icon}
              style={{ paddingRight: theme.spacing.m }}
            />
            <Text variant="subtitle">
              {Platform.OS === 'ios' || Platform.OS === 'macos'
                ? i18n.t('settings.touchId')
                : i18n.t('settings.fingerprint')}
            </Text>
          </Box>
          <Switch value={usesLocalAuth} onValueChange={toggleLocalAuth} />
        </Box>
      </Paper>
    </Box>
  )
}

export default Security
