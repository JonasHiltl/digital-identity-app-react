import React, { useState, useEffect } from 'react'
import { FlatButton } from '../../../../components/custom_comps/Button'
import CountryPicker from '../../../../components/custom_comps/CountryPicker'
import Input from '../../../../components/custom_comps/Input'
import { usePersonalData } from '../../../../context/personalData/PersonalDataContext'
import { Box } from '../../../../context/theme/theme'
import i18n from '../../../../i18n'
import { Country } from '../../../../types'
import CountryUtils from '../../../../utils/countryUtils'

const Residence = () => {
  const { credential } = usePersonalData()
  const [residenceForm, setResidenceForm] = useState({
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
  const [displayedCountry, setDisplayedCountry] = useState<Country | null>(null)

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
  } = residenceForm

  useEffect(() => {
    let isMounted = true
    const getCountryByCode = async (code: string) => {
      const loadedCountry = await CountryUtils.getCountryByCode(code)
      setDisplayedCountry(loadedCountry)
    }
    getCountryByCode(country!)
    return () => {
      isMounted = false
    }
  }, [country])

  return (
    <Box flex={1} padding="m" justifyContent="space-between">
      <Box>
        <Input
          label={i18n.t('creation.streetNumber')}
          value={streetNumber}
          placeholder={i18n.t('creation.streetNumber')}
          onChange={(text) =>
            setResidenceForm({ ...residenceForm, streetNumber: text })
          }
          errorMessage={
            !streetNumber ? i18n.t('messages.valueEmpty') : undefined
          }
        />
        <Box flexDirection="row">
          <Box flex={1} marginRight="m">
            <Input
              label={i18n.t('creation.postalCode')}
              value={postalCode}
              placeholder={i18n.t('creation.postalCode')}
              onChange={(text) =>
                setResidenceForm({ ...residenceForm, postalCode: text })
              }
              errorMessage={
                !postalCode ? i18n.t('messages.valueEmpty') : undefined
              }
              keyboardType="numeric"
            />
          </Box>
          <Box flex={1}>
            <Input
              label={i18n.t('creation.city')}
              value={city}
              placeholder={i18n.t('creation.city')}
              onChange={(text) =>
                setResidenceForm({ ...residenceForm, city: text })
              }
              errorMessage={!city ? i18n.t('messages.valueEmpty') : undefined}
            />
          </Box>
        </Box>
        <Box flexDirection="row">
          <Box flex={1} marginRight="m">
            <Input
              label={i18n.t('creation.state')}
              value={state}
              placeholder={i18n.t('creation.state')}
              onChange={(text) =>
                setResidenceForm({ ...residenceForm, state: text })
              }
              errorMessage={!state ? i18n.t('messages.valueEmpty') : undefined}
            />
          </Box>
          <Box flex={1}>
            <CountryPicker
              label={i18n.t('creation.country')}
              value={displayedCountry}
              onCountrySelected={(country) => {
                setResidenceForm({ ...residenceForm, country: country })
              }}
            />
          </Box>
        </Box>
      </Box>
      <FlatButton
        label={i18n.t('save')}
        disabled={!streetNumber || !postalCode || !city || !state || !country}
        onPress={() => {}}
      />
    </Box>
  )
}

export default Residence
