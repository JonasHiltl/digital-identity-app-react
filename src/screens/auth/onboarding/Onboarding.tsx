import React from 'react'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Box } from '../../../context/theme/theme'
import { Dimensions } from 'react-native'
import SlidePage from '../../../components/SlidePage'
import { FlatButton } from '../../../components/custom_comps/Button'
import Indicator from './Indicator'
import { AuthParamList } from '../AuthParamList'
import i18n from '../../../i18n'

const slides = [
  {
    title: i18n.t('onboarding.title1'),
    desc: i18n.t('onboarding.desc1'),
  },
  {
    title: i18n.t('onboarding.title2'),
    desc: i18n.t('onboarding.desc2'),
  },
  {
    title: i18n.t('onboarding.title3'),
    desc: i18n.t('onboarding.desc3'),
  },
]

const { height, width } = Dimensions.get('window')

const Onboarding = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<AuthParamList, 'Onboarding'>
}) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const translationX = useSharedValue(0)
  const currentIndex = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x
    if (event.contentOffset.x < width * 0.5 && currentIndex.value != 0) {
      currentIndex.value = 0
    } else if (
      event.contentOffset.x > width * 0.5 &&
      event.contentOffset.x < width * 1.5 &&
      currentIndex.value != 1
    ) {
      currentIndex.value = 1
    } else if (event.contentOffset.x > width * 1.5 && currentIndex.value != 2) {
      currentIndex.value = 2
    }
  })

  return (
    <Box justifyContent="space-between" height={height} flex={1}>
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
          label={i18n.t('next')}
          onPress={() => {
            if (scrollRef.current) {
              if (currentIndex.value == 1) {
                scrollRef.current.getNode().scrollToEnd({ animated: true })
              } else if (currentIndex.value == 0) {
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
