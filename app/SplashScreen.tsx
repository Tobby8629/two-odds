import { View } from 'react-native'
import { MotiView } from 'moti'
import SplashSvg from '@/assets/SVGs/newSplash'
import Two from './Two'
import Odds from './Odds'

const SplashScreen = () => {
  return (
    <View className='h-screen bg-pry justify-center items-center'>
      <SplashSvg />

      <MotiView
        className='flex-row my-12 gap-2'
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          loop: true,
          type: 'timing',
          duration: 1500,
          repeatReverse: true,
        }}
      >
        <Two />
        <Odds />
      </MotiView>
    </View>
  )
}

export default SplashScreen
