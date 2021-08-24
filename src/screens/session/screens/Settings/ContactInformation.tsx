import React, { useCallback, useRef, useState, useEffect } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { FlatButton } from '../../../../components/custom_comps/Button'
import Input from '../../../../components/custom_comps/Input'
import { Box } from '../../../../context/theme/theme'
import i18n from '../../../../i18n'
import { generate4DigitString, validateEmail } from '../../../../utils/common'
import OTPverification from './components/OTPverification'

const ContactInformation = () => {
  const [generatedEmailCode, setGeneratedEmailCode] = useState<string>('')
  const [generatedPhoneCode, setGeneratedPhoneCode] = useState<string>('')
  const [contactInformation, setContactInformation] = useState({
    email: '',
    phoneNumber: '',
  })
  const { email, phoneNumber } = contactInformation

  // email verification props
  const [emailCode, setEmailCode] = useState('')
  const emailSheetRef = useRef<BottomSheetModal>(null)
  const openEmailSheet = useCallback(() => {
    if (emailSheetRef.current) emailSheetRef.current.present()
  }, [])
  const closeEmailSheet = useCallback(() => {
    if (emailSheetRef.current) emailSheetRef.current.close()
  }, [])

  // sms verification props
  const [phoneCode, setPhoneCode] = useState('')
  const phoneSheetRef = useRef<BottomSheetModal>(null)
  const openPhoneSheet = useCallback(() => {
    if (phoneSheetRef.current) phoneSheetRef.current.present()
  }, [])
  const closePhoneSheet = useCallback(() => {
    if (phoneSheetRef.current) phoneSheetRef.current.close()
  }, [])

  const compareEmailCodes = () => {
    console.log(generatedEmailCode)
    console.log(emailCode)
    if (generatedEmailCode === emailCode) {
      console.log('Email codes are valid')
    }
  }
  const comparePhoneCodes = () => {
    if (generatedPhoneCode === phoneCode) {
      console.log('Phone codes are valid')
    }
  }

  useEffect(() => {
    console.log('generating')
    setGeneratedPhoneCode(generate4DigitString())
    setGeneratedEmailCode(generate4DigitString())
  }, [])

  return (
    <Box flex={1} padding="m" justifyContent="space-between">
      <Box>
        <Box flexDirection="row" alignItems="flex-end">
          <Box flex={1} marginRight="m">
            <Input
              label={i18n.t('settings.email')}
              value={email}
              placeholder={i18n.t('settings.email')}
              onChange={(text) =>
                setContactInformation({ ...contactInformation, email: text })
              }
              keyboardType="email-address"
            />
          </Box>
          <Box marginBottom="xs">
            <FlatButton
              label="Send"
              disabled={!email || !validateEmail(email)}
              onPress={() => {
                openEmailSheet()
              }}
            />
          </Box>
        </Box>
        <Box flexDirection="row" alignItems="flex-end">
          <Box flex={1} marginRight="m">
            <Input
              label={i18n.t('settings.phoneNumber')}
              value={phoneNumber}
              placeholder={i18n.t('settings.phoneNumber')}
              keyboardType="numbers-and-punctuation"
              onChange={(text) =>
                setContactInformation({
                  ...contactInformation,
                  phoneNumber: text,
                })
              }
            />
          </Box>
          <Box marginBottom="xs">
            <FlatButton
              label="Send"
              disabled={!phoneNumber}
              onPress={() => {
                openPhoneSheet()
              }}
            />
          </Box>
        </Box>
      </Box>
      <FlatButton
        label={i18n.t('save')}
        disabled={!email || !phoneNumber}
        onPress={() => {}}
      />
      <OTPverification
        input={emailCode}
        setInput={setEmailCode}
        maxLength={4}
        sheetRef={emailSheetRef}
        dismissSheet={closeEmailSheet}
        onFinished={compareEmailCodes}
      />
      <OTPverification
        input={phoneCode}
        setInput={setPhoneCode}
        maxLength={4}
        sheetRef={phoneSheetRef}
        dismissSheet={closePhoneSheet}
        onFinished={comparePhoneCodes}
      />
    </Box>
  )
}

export default ContactInformation
