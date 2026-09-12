import { loading } from '@/assets/images'
import { Image, View } from 'react-native'

interface LoadingProps {
  /** Inline drops the full-screen scrim, for use inside a list or a button. */
  inline?: boolean
  size?: number
}

const Loading = ({ inline, size }: LoadingProps) => {
  const dimension = size ?? (inline ? 40 : 100)

  if (inline) {
    return (
      <View className='items-center justify-center'>
        <Image
          source={loading}
          style={{ width: dimension, height: dimension }}
          resizeMode="contain"
        />
      </View>
    )
  }

  return (
    <View style={{zIndex: 99, backgroundColor: "#808080c9"}} className='h-screen top-0 w-full absolute items-center justify-center'>
      <Image source={loading} style={{ width: dimension, height: dimension }} className='rounded-lg' resizeMode="contain"/>
    </View> 
  )
}

export default Loading
