import React from 'react'
import { FlatButton } from '../../../../components/custom_comps/Button'
import CountryPicker from '../../../../components/custom_comps/CountryPicker'
import Input from '../../../../components/custom_comps/Input'
import { Box } from '../../../../context/theme/theme'
import i18n from '../../../../i18n'

const Residence = () => {
  return (
    <Box flex={1} padding="m" justifyContent="space-between">
      <Box>
        <Input
          label={i18n.t('creation.streetNumber')}
          placeholder={i18n.t('creation.streetNumber')}
          onChange={(text) => console.log(text)}
        />
        <Box flexDirection="row">
          <Box flex={1} marginRight="m">
            <Input
              label={i18n.t('creation.postalCode')}
              placeholder={i18n.t('creation.postalCode')}
              onChange={(text) => console.log(text)}
              keyboardType="numeric"
            />
          </Box>
          <Box flex={1}>
            <Input
              label={i18n.t('creation.city')}
              placeholder={i18n.t('creation.city')}
              onChange={(text) => console.log(text)}
            />
          </Box>
        </Box>
        <Box flexDirection="row">
          <Box flex={1} marginRight="m">
            <Input
              label={i18n.t('creation.state')}
              placeholder={i18n.t('creation.state')}
              onChange={(text) => console.log(text)}
            />
          </Box>
          <Box flex={1}>
            <CountryPicker
              label={i18n.t('creation.country')}
              value={null}
              onCountrySelected={(country) => {
                console.log(country)
              }}
            />
          </Box>
        </Box>
      </Box>
      <FlatButton label={i18n.t('save')} onPress={() => {}} />
    </Box>
  )
}

export default Residence
