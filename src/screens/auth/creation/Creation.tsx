import React, { useState, useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useWindowDimensions, StyleSheet } from 'react-native'

import { FlatButton } from '../../../components/custom_comps/Button'
import Input from '../../../components/custom_comps/Input'
import { Box, useTheme } from '../../../context/theme/theme'
import { AuthParamList } from '../AuthParamList'
import CreationStep from './CreationStep'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioGroup from '../../../components/custom_comps/RadioGroup'
import CountryPicker from '../../../components/custom_comps/CountryPicker'
import CountryUtils from '../../../utils/countryUtils'
import { Country } from '../../../types'
import i18n from '../../../i18n'

const Creation = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthParamList, 'Onboarding'>
}) => {
  const theme = useTheme()
  const { width, height } = useWindowDimensions()
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const translationX = useSharedValue(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedCountry, setDisplayedCountry] = useState<Country | null>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    sex: '',
    streetNumber: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  })

  const {
    firstName,
    lastName,
    dateOfBirth,
    sex,
    streetNumber,
    city,
    state,
    postalCode,
    country,
  } = formData

  const rStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationX.value,
      [0, width, 2 * width],
      [0.2, 1, 1],
      Extrapolate.CLAMP,
    )

    return {
      opacity: opacity,
    }
  })

  const rStyle3 = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationX.value,
      [width, 2 * width, 3 * width],
      [0.2, 1, 1],
      Extrapolate.CLAMP,
    )

    return {
      opacity: opacity,
    }
  })

  const toggleIndex = (index: number) => {
    setCurrentIndex(index)
  }

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x
    if (event.contentOffset.x < width * 0.5 && currentIndex != 0) {
      runOnJS(toggleIndex)(0)
    } else if (
      event.contentOffset.x > width * 0.5 &&
      event.contentOffset.x < width * 1.5 &&
      currentIndex != 1
    ) {
      runOnJS(toggleIndex)(1)
    } else if (event.contentOffset.x > width * 1.5 && currentIndex != 2) {
      runOnJS(toggleIndex)(2)
    }
  })

  const getCountryByCode = async (code: string) => {
    const loadedCountry = await CountryUtils.getCountryByCode(code)
    setDisplayedCountry(loadedCountry)
  }

  useEffect(() => {
    let isMounted = true
    getCountryByCode(country)
    return () => {
      isMounted = false
    }
  }, [country])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
        extraHeight={95}
      >
        <Box flex={1}>
          <Animated.ScrollView
            ref={scrollRef}
            horizontal
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            snapToInterval={width}
            scrollEventThrottle={16}
            onScroll={scrollHandler}
            scrollEnabled={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <CreationStep
              title={i18n.t('creation.header')}
              subtitle={i18n.t('creation.subheader1')}
            >
              <Input
                placeholder={i18n.t('creation.firstName')}
                onChange={(text) => {
                  setFormData({ ...formData, firstName: text })
                }}
                value={firstName}
              />
              <Input
                placeholder={i18n.t('creation.lastName')}
                onChange={(text) => {
                  setFormData({ ...formData, lastName: text })
                }}
                value={lastName}
              />
            </CreationStep>
            <CreationStep
              title={i18n.t('creation.header2')}
              subtitle={i18n.t('creation.subheader2')}
              goBack={() =>
                scrollRef.current?.getNode().scrollTo({ x: 0, animated: true })
              }
            >
              <RadioGroup
                selectedValue={sex}
                flexDireaction="row"
                buttons={[
                  {
                    label: i18n.t('creation.male'),
                    value: 'male',
                    onPress: () => {
                      setFormData({ ...formData, sex: 'male' })
                    },
                  },
                  {
                    label: i18n.t('creation.female'),
                    value: 'female',
                    onPress: () => {
                      setFormData({ ...formData, sex: 'female' })
                    },
                  },
                ]}
              />
              <Input
                variant="date"
                placeholder={i18n.t('creation.dateOfBirth')}
                onChange={(text) => {
                  setFormData({ ...formData, dateOfBirth: text })
                }}
                keyboardType="numeric"
                value={dateOfBirth}
              />
            </CreationStep>
            <CreationStep
              title={i18n.t('creation.header3')}
              subtitle={i18n.t('creation.subheader3')}
              goBack={() =>
                scrollRef.current
                  ?.getNode()
                  .scrollTo({ x: width, animated: true })
              }
            >
              <Input
                placeholder={i18n.t('creation.streetNumber')}
                onChange={(text) => {
                  setFormData({ ...formData, streetNumber: text })
                }}
                value={streetNumber}
              />
              <Input
                placeholder={i18n.t('creation.postalCode')}
                onChange={(text) => {
                  setFormData({ ...formData, postalCode: text })
                }}
                value={postalCode}
                keyboardType="numeric"
              />
              <Input
                placeholder={i18n.t('creation.city')}
                onChange={(text) => {
                  setFormData({ ...formData, city: text })
                }}
                value={city}
              />
              <Input
                placeholder={i18n.t('creation.state')}
                onChange={(text) => {
                  setFormData({ ...formData, state: text })
                }}
                value={state}
              />
              <CountryPicker
                value={displayedCountry}
                onCountrySelected={(country) => {
                  setFormData({ ...formData, country: country })
                }}
              />
            </CreationStep>
          </Animated.ScrollView>
          <Box margin="m">
            <FlatButton
              label={i18n.t('next')}
              disabled={
                (currentIndex == 0 && (!firstName || !lastName)) ||
                (currentIndex == 1 &&
                  (!dateOfBirth || !sex || dateOfBirth.length < 10)) ||
                (currentIndex == 2 &&
                  (!streetNumber || !postalCode || !city || !state || !country))
              }
              onPress={() => {
                if (currentIndex == 0) {
                  scrollRef.current
                    ?.getNode()
                    .scrollTo({ x: width, animated: true })
                } else if (currentIndex == 1) {
                  scrollRef.current?.getNode().scrollToEnd({ animated: true })
                }
              }}
            />
          </Box>
          <Box flexDirection="row" marginHorizontal="m" marginBottom="m">
            <Box flex={1} height={3} backgroundColor="primary" />
            <Box width={6} />
            <Animated.View
              style={[
                rStyle2,
                classes.indicator,
                { backgroundColor: theme.colors.primary },
              ]}
            />
            <Box width={6} />
            <Animated.View
              style={[
                rStyle3,
                classes.indicator,
                { backgroundColor: theme.colors.primary },
              ]}
            />
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

const classes = StyleSheet.create({
  indicator: {
    flex: 1,
    height: 3,
  },
})

export default Creation
