import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import React, { useMemo, useEffect } from 'react'
import {
  CodeField,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field'
import VirtualKeyboard from '../../../../../components/custom_comps/VirtualKeyboard'
import { Box, useTheme, Text } from '../../../../../context/theme/theme'

interface Props {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  maxLength: number
  sheetRef: React.RefObject<BottomSheetModalMethods>
  dismissSheet: () => void
  onFinished: () => void
}

const OTPverification: React.FC<Props> = ({
  input,
  setInput,
  maxLength,
  sheetRef,
  dismissSheet,
  onFinished,
}) => {
  const theme = useTheme()
  const snapPoints = useMemo(() => ['50%', '75%'], [])
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: input,
    setValue: setInput,
  })

  useEffect(() => {
    if (input.length === maxLength) {
      onFinished()
    }
  }, [input])

  return (
    <BottomSheetModal
      enableOverDrag={false}
      onDismiss={dismissSheet}
      ref={sheetRef}
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
      <Box flex={1}>
        <CodeField
          {...props}
          cellCount={maxLength}
          value={input}
          editable={false}
          onEndEditing={() => console.log('end reached')}
          rootStyle={{
            marginVertical: theme.spacing.m,
            justifyContent: 'space-evenly',
          }}
          textContentType="oneTimeCode"
          renderCell={({ index, symbol }) => (
            <Box
              key={index}
              width={50}
              height={50}
              backgroundColor="inputBG"
              justifyContent="center"
              alignItems="center"
              borderWidth={2}
              borderColor={input.length === index ? 'primary' : 'inputBG'}
              borderRadius="s"
            >
              <Text
                key={index}
                style={[
                  {
                    fontSize: 20,
                  },
                ]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol}
              </Text>
            </Box>
          )}
        />
        <VirtualKeyboard
          input={input}
          setInput={setInput}
          maxLength={maxLength}
        />
      </Box>
    </BottomSheetModal>
  )
}

export default OTPverification
