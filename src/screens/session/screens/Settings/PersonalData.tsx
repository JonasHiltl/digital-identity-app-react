import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { FlatButton } from '../../../../components/custom_comps/Button'
import CountryPicker from '../../../../components/custom_comps/CountryPicker'
import Input from '../../../../components/custom_comps/Input'
import RadioGroup from '../../../../components/custom_comps/RadioGroup'
import { Box, Text } from '../../../../context/theme/theme'
import i18n from '../../../../i18n'

const PersonalData = () => {
  return (
    <Box flex={1} padding="m" justifyContent="space-between">
      <Box>
        <Box flexDirection="row">
          <Box marginRight="m" flex={1}>
            <Input
              label={i18n.t('creation.firstName')}
              value="Jonas"
              placeholder={i18n.t('creation.firstName')}
              onChange={(text) => console.log(text)}
            />
          </Box>
          <Box flex={1}>
            <Input
              label={i18n.t('creation.lastName')}
              value="Hiltl"
              placeholder={i18n.t('creation.lastName')}
              onChange={(text) => console.log(text)}
            />
          </Box>
        </Box>
        <RadioGroup
          label={i18n.t('creation.sex')}
          selectedValue={'male'}
          flexDireaction="row"
          buttons={[
            {
              label: i18n.t('creation.male'),
              value: 'male',
              onPress: () => {
                console.log('set Male')
              },
            },
            {
              label: i18n.t('creation.female'),
              value: 'female',
              onPress: () => {
                console.log('set Female')
              },
            },
          ]}
        />
        <Input
          label={i18n.t('creation.dateOfBirth')}
          variant="date"
          placeholder={i18n.t('creation.dateOfBirth')}
          onChange={(text) => console.log(text)}
          keyboardType="numeric"
        />
      </Box>
      <FlatButton label={i18n.t('save')} onPress={() => {}} />
    </Box>
  )
}

export default PersonalData
