import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  PlatformColor,
} from 'react-native'
import axios from 'axios'
import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { Box, Text, useTheme } from '../../theme/theme'
import Input from './Input'
import CountryUtils from '../../utils/CountryUtils'

interface Props {
  onCountrySelected: (country: string) => void
  value: string
}

interface renderItemProps {
  item: CountryProps
}

interface CountryProps {
  flag: string
  name: string
  alpha2Code: string
}

const CountryPicker: React.FC<Props> = ({ onCountrySelected, value }) => {
  const theme = useTheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const [countries, setCountries] = useState<CountryProps[]>([])

  const snapPoints = useMemo(() => ['75%', '90%'], [])

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
    const data = await CountryUtils.getCountryByName(name)
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
    getAllCountries()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Box>
      <TouchableWithoutFeedback onPress={handlePresentModalPress}>
        <Box marginVertical="xs">
          <Box
            paddingVertical="inputS"
            paddingHorizontal="inputM"
            borderRadius="s"
            backgroundColor="inputBG"
            borderColor="inputBG"
            borderWidth={2}
          >
            {!value ? (
              <Text style={classes.placeholder}>Country</Text>
            ) : (
              <Text>{value}</Text>
            )}
          </Box>
        </Box>
      </TouchableWithoutFeedback>
      <BottomSheetModal
        onDismiss={handleDismissModalPress}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        style={{
          borderTopLeftRadius: theme.borderRadii.l,
          borderTopRightRadius: theme.borderRadii.l,
          elevation: 5,
          shadowColor: '#000',
          shadowRadius: 8,
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Box marginHorizontal="m">
          <Input placeholder="search" onChange={getCountryByName} />
        </Box>
        {countries.length == 0 ? (
          <Text textAlign="center">No Countries found</Text>
        ) : (
          <BottomSheetFlatList
            data={countries}
            keyExtractor={(item) => item.alpha2Code}
            renderItem={renderCountry}
          />
        )}
      </BottomSheetModal>
    </Box>
  )
}

const classes = StyleSheet.create({
  placeholder: {
    color: PlatformColor('placeholderText'),
  },
})

export default CountryPicker
