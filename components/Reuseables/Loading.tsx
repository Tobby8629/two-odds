import { loading } from '@/assets/images'
import { Image, View } from 'react-native'

const Loading = () => {
  return (
    <View style={{zIndex: 99, backgroundColor: "#808080c9"}} className='h-screen top-0 w-full absolute items-center justify-center'>
      <Image source={loading} className='rounded-lg w-[100px] h-[100px]' resizeMode="contain"/>
    </View> 
  )
}

export default Loading
