import React from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'

import Paper from '../../../../../components/custom_comps/paper'
import { Box, Text, useTheme } from '../../../../../context/theme/theme'
import i18n from '../../../../../i18n'
import { TouchableOpacity } from '@gorhom/bottom-sheet'

interface Props {
  onPersonalPress: () => void
  onResidencePress: () => void
  onContactPress: () => void
}

const Profile: React.FC<Props> = ({
  onContactPress,
  onResidencePress,
  onPersonalPress,
}) => {
  const theme = useTheme()

  return (
    <Box marginBottom="m">
      <Text variant="subheader" paddingHorizontal="m" marginBottom="xs">
        {i18n.t('settings.profile')}
      </Text>
      <Paper>
        <TouchableOpacity onPress={onPersonalPress}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="m"
          >
            <Box flexDirection="row">
              <Ionicons
                name="person"
                size={22}
                color={theme.colors.icon}
                style={{ paddingRight: theme.spacing.m }}
              />
              <Text variant="subtitle">{i18n.t('settings.personalData')}</Text>
            </Box>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={22}
              color={theme.colors.icon}
            />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={onResidencePress}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginBottom="m"
          >
            <Box flexDirection="row">
              <Ionicons
                name="home-sharp"
                size={22}
                color={theme.colors.icon}
                style={{ paddingRight: theme.spacing.m }}
              />
              <Text variant="subtitle">{i18n.t('creation.residence')}</Text>
            </Box>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={22}
              color={theme.colors.icon}
            />
          </Box>
        </TouchableOpacity>
        <TouchableOpacity onPress={onContactPress}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box flexDirection="row">
              <Ionicons
                name="call"
                size={22}
                color={theme.colors.icon}
                style={{ paddingRight: theme.spacing.m }}
              />
              <Text variant="subtitle">
                {i18n.t('settings.contactInformation')}
              </Text>
            </Box>
            <MaterialIcons name="add" size={22} color={theme.colors.icon} />
          </Box>
        </TouchableOpacity>
      </Paper>
    </Box>
  )
}

export default Profile
