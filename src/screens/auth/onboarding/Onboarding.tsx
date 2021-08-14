import React from 'react'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Box } from '../../../theme/theme'
import { Dimensions } from 'react-native'
import SlidePage from '../../../components/SlidePage'
import { FlatButton } from '../../../components/custom_comps/Button'
import Indicator from './Indicator'
import { AuthParamList } from '../AuthParamList'

const slides = [
  {
    title: 'Self Sovereign',
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt, sed diam voluptua.',
  },
  {
    title: 'Privacy',
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt, sed diam voluptua.',
  },
  {
    title: 'Self Sovereign',
    desc: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt, sed diam voluptua.',
  },
]

const { height, width } = Dimensions.get('window')

type ScreenNavigationProp = NativeStackNavigationProp<
  { Onboarding: undefined },
  'Onboarding'
>

interface Props {
  navigation: ScreenNavigationProp
}

const Onboarding = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthParamList, 'Onboarding'>
}) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const translationX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x
  })

  return (
    <Box justifyContent="space-between" height={height}>
      <Box
        height={height * 0.6}
        backgroundColor="primary"
        borderBottomRightRadius="xxl"
      />
      <Box alignItems="center" padding="m">
        <Indicator slides={slides} translationX={translationX} />
      </Box>
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
      >
        {slides.map((slide, index: number) => {
          return (
            <SlidePage
              key={index.toString()}
              title={slide.title}
              desc={slide.desc}
              index={index}
              translationX={translationX}
            />
          )
        })}
      </Animated.ScrollView>
      <Box margin="m">
        <FlatButton
          label={translationX.value > width ? 'Get Started' : 'Next'}
          onPress={() => {
            if (scrollRef.current) {
              if (
                parseInt(translationX.value.toFixed(1)) ==
                parseInt(width.toFixed(1))
              ) {
                scrollRef.current.getNode().scrollToEnd()
              } else if (translationX.value == 0) {
                scrollRef.current
                  .getNode()
                  .scrollTo({ x: width, animated: true })
              } else {
                navigation.navigate('Creation')
              }
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default Onboarding
