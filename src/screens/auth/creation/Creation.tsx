import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'
import React from 'react'
import { FlatButton } from '../../../components/custom_comps/Button'
import { Box } from '../../../theme/theme'
import { AuthParamList } from '../AuthParamList'

const Creation = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthParamList, 'Onboarding'>
}) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <FlatButton label="back" onPress={() => navigation.goBack()} />
      <Box margin="m">
        <FlatButton label="Next" onPress={() => {}} />
      </Box>
    </Box>
  )
}

export default Creation
