import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  PlatformColor,
} from 'react-native'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Box, Text, useTheme } from '../../context/theme/theme'
import Input from './Input'
import CountryUtils from '../../utils/countryUtils'
import { Country } from '../../types'
import i18n from '../../i18n'
import { useThemeContext } from '../../context/theme/ThemeContext'

interface Props {
  onCountrySelected: (country: string) => void
  value: Country | null
  label?: string
}

interface renderItemProps {
  item: Country
}

const CountryPicker: React.FC<Props> = ({
  onCountrySelected,
  value,
  label,
}) => {
  const theme = useTheme()
  const { isDark } = useThemeContext()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const [countries, setCountries] = useState<Country[]>([])

  const snapPoints = useMemo(() => ['75%', '80%'], [])

  const handlePresentModalPress = useCallback(() => {
    getAllCountries()
    if (bottomSheetModalRef.current) bottomSheetModalRef.current.present()
  }, [])

  const handleDismissModalPress = useCallback(() => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current.close()
  }, [])

  const getAllCountries = async () => {
    const data = await CountryUtils.getAll()
    setCountries(data)
  }

  const getCountryByName = async (name: string) => {
    const data = await CountryUtils.getCountryByName(name.trim())
    setCountries(data)
  }

  const renderCountry = ({ item }: renderItemProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onCountrySelected(item.alpha2Code)
          handleDismissModalPress()
        }}
      >
        <Box
          flexDirection="row"
          alignItems="center"
          marginHorizontal="m"
          marginVertical="xs"
        >
          <Box marginRight="m">
            <Image
              source={{
                height: 32,
                width: 32,
                uri: `https://www.countryflags.io/${item.alpha2Code}/flat/64.png`,
              }}
            />
          </Box>
          <Text variant="body" fontSize={16}>
            {item.name}
          </Text>
        </Box>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) getAllCountries()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Box>
      <TouchableWithoutFeedback onPress={handlePresentModalPress}>
        <Text variant="inputLabel">{label}</Text>
        <Box
          paddingVertical="m"
          paddingHorizontal="inputM"
          borderRadius="s"
          backgroundColor="inputBG"
          borderColor="inputBG"
          borderWidth={2}
        >
          {!value ? (
            <Text
              style={{
                color: isDark
                  ? theme.colors.placeholder
                  : PlatformColor('placeholderText'),
              }}
            >
              {i18n.t('creation.country')}
            </Text>
          ) : (
            <Box justifyContent="space-between" flexDirection="row">
              <Text>{value.name}</Text>
              <Image
                source={{
                  width: 24,
                  height: 16,
                  uri: `https://www.countryflags.io/${value.alpha2Code}/flat/64.png`,
                }}
              />
            </Box>
          )}
        </Box>
      </TouchableWithoutFeedback>
      <BottomSheetModal
        enableOverDrag={false}
        onDismiss={handleDismissModalPress}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: theme.colors.mainBackground,
          borderTopLeftRadius: theme.borderRadii.l,
          borderTopRightRadius: theme.borderRadii.l,
          elevation: 5,
          shadowColor: '#000',
          shadowRadius: 8,
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.mainForeground,
        }}
      >
        <Box paddingHorizontal="m" backgroundColor="mainBackground">
          <Input placeholder={i18n.t('search')} onChange={getCountryByName} />
        </Box>
        {countries.length == 0 ? (
          <Text textAlign="center">No Countries found</Text>
        ) : (
          <BottomSheetFlatList
            style={{ backgroundColor: theme.colors.mainBackground }}
            data={countries}
            keyExtractor={(item) => item.alpha2Code}
            renderItem={renderCountry}
          />
        )}
      </BottomSheetModal>
    </Box>
  )
}

export default CountryPicker
