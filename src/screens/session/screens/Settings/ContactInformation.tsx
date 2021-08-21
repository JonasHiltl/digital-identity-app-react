import React from 'react'
import { FlatButton } from '../../../../components/custom_comps/Button'
import Input from '../../../../components/custom_comps/Input'
import { Box, Text } from '../../../../context/theme/theme'
import i18n from '../../../../i18n'

const ContactInformation = () => {
  return (
    <Box flex={1} padding="m" justifyContent="space-between">
      <Box>
        <Input
          label={i18n.t('settings.email')}
          value="jonashiltl2003@gmail.com"
          placeholder={i18n.t('settings.email')}
          onChange={(text) => console.log(text)}
        />
        <Input
          label={i18n.t('settings.phoneNumber')}
          value="017636949666"
          placeholder={i18n.t('settings.phoneNumber')}
          onChange={(text) => console.log(text)}
        />
      </Box>
      <FlatButton label="Save" onPress={() => {}} />
    </Box>
  )
}

export default ContactInformation
