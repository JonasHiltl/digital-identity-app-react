import React, { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { Box, Text } from '../context/theme/theme'
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'

interface PageProps {
  title: string
  desc: string
  index: number
  translationX: Animated.SharedValue<number>
}

const { width } = Dimensions.get('window')

const SlidePage: React.FC<PageProps> = ({
  title,
  desc,
  index,
  translationX,
}) => {
  const rStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [-2, 1, -2],
    )

    return {
      opacity: opacity,
    }
  })

  return (
    <Box width={width} justifyContent="center" alignItems="center" padding="m">
      <Animated.View style={rStyle}>
        <Text variant="heading">{title}</Text>
        <Text textAlign="center">{desc}</Text>
      </Animated.View>
    </Box>
  )
}

export default SlidePage
