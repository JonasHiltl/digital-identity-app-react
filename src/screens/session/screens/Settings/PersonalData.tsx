import React, { useState, useEffect } from 'react'
import { FlatButton } from '../../../../components/custom_comps/Button'
import Input from '../../../../components/custom_comps/Input'
import RadioGroup from '../../../../components/custom_comps/RadioGroup'
import { usePersonalData } from '../../../../context/personalData/PersonalDataContext'
import { Box } from '../../../../context/theme/theme'
import i18n from '../../../../i18n'

const PersonalData = () => {
  const { credential } = usePersonalData()
  const [personalDataForm, setPersonalDataForm] = useState({
    firstName: credential?.credentialSubject.firstName,
    lastName: credential?.credentialSubject.lastName,
    dateOfBirth: credential?.credentialSubject.dateOfBirth,
    sex: credential?.credentialSubject.sex,
    streetNumber: credential?.credentialSubject.streetNumber,
    postalCode: credential?.credentialSubject.postalCode,
    city: credential?.credentialSubject.city,
    state: credential?.credentialSubject.state,
    country: credential?.credentialSubject.country,
  })

  const {
    firstName,
    lastName,
    sex,
    dateOfBirth,
    streetNumber,
    postalCode,
    city,
    state,
    country,
  } = personalDataForm

  return (
    <Box flex={1} padding="m" justifyContent="space-between">
      <Box>
        <Box flexDirection="row">
          <Box marginRight="m" flex={1}>
            <Input
              label={i18n.t('creation.firstName')}
              value={firstName}
              placeholder={i18n.t('creation.firstName')}
              errorMessage={
                !firstName ? i18n.t('messages.valueEmpty') : undefined
              }
              onChange={(text) =>
                setPersonalDataForm({ ...personalDataForm, firstName: text })
              }
            />
          </Box>
          <Box flex={1}>
            <Input
              label={i18n.t('creation.lastName')}
              value={lastName}
              placeholder={i18n.t('creation.lastName')}
              errorMessage={
                !lastName ? i18n.t('messages.valueEmpty') : undefined
              }
              onChange={(text) =>
                setPersonalDataForm({ ...personalDataForm, lastName: text })
              }
            />
          </Box>
        </Box>
        <RadioGroup
          label={i18n.t('creation.sex')}
          selectedValue={sex || 'male'}
          flexDireaction="row"
          buttons={[
            {
              label: i18n.t('creation.male'),
              value: 'male',
              onPress: () => {
                setPersonalDataForm({ ...personalDataForm, sex: 'male' })
              },
            },
            {
              label: i18n.t('creation.female'),
              value: 'female',
              onPress: () => {
                setPersonalDataForm({ ...personalDataForm, sex: 'female' })
              },
            },
          ]}
        />
        <Input
          label={i18n.t('creation.dateOfBirth')}
          value={dateOfBirth}
          variant="date"
          placeholder={i18n.t('creation.dateOfBirth')}
          errorMessage={
            !dateOfBirth
              ? i18n.t('messages.valueEmpty')
              : dateOfBirth.length < 10
              ? i18n.t('messages.invalid')
              : undefined
          }
          onChange={(text) =>
            setPersonalDataForm({ ...personalDataForm, dateOfBirth: text })
          }
          keyboardType="numeric"
        />
      </Box>
      <FlatButton
        label={i18n.t('save')}
        disabled={
          !firstName || !lastName || !dateOfBirth || dateOfBirth.length < 10
        }
        onPress={() => {}}
      />
    </Box>
  )
}

export default PersonalData
