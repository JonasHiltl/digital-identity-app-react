import React, { useEffect, RefObject } from 'react'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { Box, useTheme } from '../../../theme/theme'
import { useWindowDimensions, StyleSheet } from 'react-native'

interface Props {
  slides: {
    title: string
    desc: string
  }[]
  translationX: Animated.SharedValue<number>
}

const Indicator: React.FC<Props> = ({ slides, translationX }) => {
  const { width } = useWindowDimensions()
  const theme = useTheme()

  return (
    <Box flexDirection="row">
      {slides.map((_, i) => {
        const rStyle = useAnimatedStyle(() => {
          const dotWidth = interpolate(
            translationX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [8, 14, 8],
            Extrapolate.CLAMP,
          )

          const opacity = interpolate(
            translationX.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [0.5, 1, 0.5],
            Extrapolate.CLAMP,
          )

          return {
            opacity: opacity,
            width: dotWidth,
          }
        }, [translationX.value])

        return (
          <Animated.View
            key={i.toString()}
            style={[
              classes.dot,
              { backgroundColor: theme.colors.primary },
              rStyle,
            ]}
          />
        )
      })}
    </Box>
  )
}

const classes = StyleSheet.create({
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
})

export default Indicator
