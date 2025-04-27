interface errorInt {
  error: string | []
  setError: React.Dispatch<React.SetStateAction<Err>>
}

import Cancel from '@/assets/SVGs/Cancel'
import ErrorCancel from '@/assets/SVGs/ErrorCancel'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { ZoomIn } from 'react-native-reanimated'
import Button from './Button'

const Error = ({error, setError}: errorInt) => {
  return (
    <View style={{zIndex: 99, backgroundColor: "#808080c9"}} className='h-screen top-0 w-full absolute items-center justify-center'>
      <View className=' bg-gray-500 p-5 justify-center items-center'>
        <View className=' border-2 rounded-full border-red-500 p-2 mb-3'>
          <Animated.View entering={ZoomIn.duration(20000).springify()}>
            <ErrorCancel />
          </Animated.View>
        </View>
        <Text className=' text-white font-semibold capitalize text-xl my-3 w-full'>
            {error}
        </Text>
        <Pressable>
          <Button  text='cancel' onPress={()=> setError({message: "", status: false})} />
        </Pressable>
      </View>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({})