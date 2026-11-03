import { View } from 'react-native'
import { useVideoPlayer, VideoView } from 'expo-video'

const LOGO_ANIMATION = require('@/assets/video/logoAnimation.mp4')

interface LoadingProps {
  /** Inline drops the full-screen scrim, for use inside a list or a button. */
  inline?: boolean
  size?: number
}

const Loading = ({ inline, size }: LoadingProps) => {
  const dimension = size ?? (inline ? 40 : 100)

  const player = useVideoPlayer(LOGO_ANIMATION, (p) => {
    p.loop = true
    p.muted = true
    p.play()
  })

  const video = (
    <VideoView
      player={player}
      style={{ width: dimension, height: dimension }}
      contentFit="contain"
      nativeControls={false}
      /* Never hand the loader to the system player. */
      allowsPictureInPicture={false}
    />
  )

  if (inline) {
    return (
      <View className='items-center justify-center'>{video}</View>
    )
  }

  return (
    <View style={{zIndex: 99, backgroundColor: "#808080c9"}} className='h-screen top-0 w-full absolute items-center justify-center'>
      {video}
    </View>
  )
}

export default Loading
