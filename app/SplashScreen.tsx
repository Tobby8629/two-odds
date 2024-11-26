import { View } from 'react-native'
import React from 'react'
import SplashSvg from '@/assets/SVGs/Splash'
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner'


const SplashScreen = () => {
  return (
    <View className='h-screen bg-pry justify-center items-center'>
      <SplashSvg />
      <View className=' h-20 my-3 500 w-20 items-center justify-center'>
          <SolidRoundSpinner style={{borderColor: "#FFC107"}} /> 
        </View>
      {/* <SolidRoundSpinner className='border-sec' /> */}
    </View>
  )
}

export default SplashScreen