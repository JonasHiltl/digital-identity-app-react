import React, { useCallback, useRef, useState, useEffect } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'

import { FlatButton } from '../../../../components/custom_comps/Button'
import Input from '../../../../components/custom_comps/Input'
import { Box, useTheme } from '../../../../context/theme/theme'
import i18n from '../../../../i18n'
import { generate4DigitString, validateEmail } from '../../../../utils/common'
import OTPverification from './components/OTPverification'
import useNotification from '../../../../context/notifications/NotificationsContext'
import ContactInformationUtils from '../../../../utils/contactInformation'
import { useAuth } from '../../../../context/auth/AuthContext'
import api from '../../../../utils/axios'
import { useContactInformation } from '../../../../context/contactInformation/ContactInformation'

const ContactInformation = () => {
  const theme = useTheme()
  const { addNotification } = useNotification()
  const { contactCredential, setCredential } = useContactInformation()
  const { jwt } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [smsConfirmed, setSmsConfirmed] = useState<boolean>(false)
  const [emailConfirmed, setEmailConfirmed] = useState<boolean>(false)
  const [generatedEmailCode, setGeneratedEmailCode] = useState<string>('')
  const [generatedPhoneCode, setGeneratedPhoneCode] = useState<string>('')
  const [contactInformation, setContactInformation] = useState({
    email: contactCredential?.credentialSubject.email ?? '',
    phoneNumber: contactCredential?.credentialSubject.phoneNumber ?? '',
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
    if (generatedEmailCode === emailCode) {
      setEmailConfirmed(true)
      addNotification({
        type: 'success',
        message:
          contactCredential !== null
            ? i18n.t('notifications.success.newEmailConfirmed')
            : i18n.t('notifications.success.emailConfirmed'),
      })
      closeEmailSheet()
    } else {
      addNotification({
        type: 'error',
        message: i18n.t('notifications.error.emailConfirmed'),
      })
    }
  }
  const comparePhoneCodes = () => {
    if (generatedPhoneCode === phoneCode) {
      setSmsConfirmed(true)
      addNotification({
        type: 'success',
        message:
          contactCredential !== null
            ? i18n.t('notifications.success.newPhoneConfirmed')
            : i18n.t('notifications.success.phoneConfirmed'),
      })
      closePhoneSheet()
    } else {
      addNotification({
        type: 'error',
        message: i18n.t('notifications.error.phoneConfirmed'),
      })
    }
  }

  const sendEmail = async () => {
    try {
      const body = {
        email: email.trim(),
        code: generatedEmailCode,
      }
      const res = await api.post('/contact-information/send-email', body)
      if (res.status === 201) {
        addNotification({
          type: 'success',
          message: i18n.t('notifications.success.emailSent'),
        })
      }
    } catch (error) {
      addNotification({
        type: 'error',
        message: i18n.t('notifications.error.emailSent'),
      })
    }
  }

  const sendSMS = async () => {
    try {
      const body = {
        phoneNumber: phoneNumber.trim(),
        code: generatedEmailCode,
      }
      const res = await api.post('/contact-information/send-sms', body)
      if (res.status === 201) {
        addNotification({
          type: 'success',
          message: i18n.t('notifications.success.smsSent'),
        })
      }
    } catch (error) {
      addNotification({
        type: 'error',
        message: i18n.t('notifications.error.smsSent'),
      })
    }
  }

  const createContactInformation = async () => {
    setLoading(true)
    try {
      const credential = await ContactInformationUtils.create(
        jwt,
        email,
        phoneNumber,
      )
      setCredential(credential)
      addNotification({
        type: 'success',
        message:
          contactCredential !== null
            ? i18n.t('notifications.success.contactInformationUpdated')
            : i18n.t('notifications.success.contactInformationCreated'),
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message:
          contactCredential !== null
            ? i18n.t('notifications.error.contactInformationUpdated')
            : i18n.t('notifications.error.contactInformationCreated'),
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    const smsCode = generate4DigitString()
    const emailCode = generate4DigitString()
    setGeneratedPhoneCode(smsCode)
    setGeneratedEmailCode(emailCode)

    console.log(`SMS Code: ${smsCode}`)
    console.log(`Email Code: ${emailCode}`)
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
              onChange={(text) => {
                if (!emailConfirmed)
                  setContactInformation({ ...contactInformation, email: text })
              }}
              prefix={
                emailConfirmed ||
                contactCredential?.credentialSubject.email === email ? (
                  <Ionicons
                    name="checkmark-circle"
                    color={theme.colors.success}
                    size={16}
                  />
                ) : null
              }
              keyboardType="email-address"
            />
          </Box>
          <Box marginBottom="xs">
            <FlatButton
              label={i18n.t('send')}
              disabled={
                !email ||
                !validateEmail(email) ||
                emailConfirmed ||
                contactCredential?.credentialSubject.email === email
              }
              onPress={() => {
                sendEmail()
                openEmailSheet()
              }}
            />
          </Box>
        </Box>
        <Box flexDirection="row" alignItems="flex-end">
          <Box flex={1} marginRight="m">
            <Input
              editable={validateEmail(email)}
              label={i18n.t('settings.phoneNumber')}
              value={phoneNumber}
              placeholder={i18n.t('settings.phoneNumber')}
              keyboardType="numbers-and-punctuation"
              prefix={
                smsConfirmed ||
                contactCredential?.credentialSubject.phoneNumber ===
                  phoneNumber ? (
                  <Ionicons
                    name="checkmark-circle"
                    color={theme.colors.success}
                    size={16}
                  />
                ) : null
              }
              onChange={(text) => {
                if (!smsConfirmed)
                  setContactInformation({
                    ...contactInformation,
                    phoneNumber: text,
                  })
              }}
            />
          </Box>
          <Box marginBottom="xs">
            <FlatButton
              label={i18n.t('send')}
              disabled={
                !phoneNumber ||
                smsConfirmed ||
                contactCredential?.credentialSubject.phoneNumber === phoneNumber
              }
              onPress={() => {
                sendSMS()
                openPhoneSheet()
              }}
            />
          </Box>
        </Box>
      </Box>
      <FlatButton
        label={i18n.t('save')}
        disabled={
          loading ||
          !validateEmail(email) || // Disabled if inputted email is not valid
          (!contactCredential && (!smsConfirmed || !emailConfirmed)) || // Disabled when sms and email is not confirmed and no credential alreaady exists
          (contactCredential !== null && // Disabled if credentials already exist, email has been changed but new one not yet confirmed
            contactCredential?.credentialSubject.email !== email &&
            !emailConfirmed) ||
          (contactCredential !== null && // Disabled if credentials already exist, phone number has been changed but new one not yet confirmed
            contactCredential?.credentialSubject.phoneNumber !== phoneNumber &&
            !smsConfirmed) ||
          (contactCredential?.credentialSubject.phoneNumber === phoneNumber && // Disabled if new PhoneNumber is the same as old one
            contactCredential?.credentialSubject.email === email) // Disabled if new Email is same as old one
        }
        loading={loading}
        onPress={() => {
          createContactInformation()
        }}
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
