import { Pressable, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import TextB from '@/components/Text/BasicText'
import { router } from 'expo-router'


interface layoutprop {
  children: React.ReactNode
}

const Layout = ({children}: layoutprop) => {
  const goBack = () => {
      router.replace("/Onboarding/SignIn")
  }
  return (
    <View className='h-screen bg-pry p-7 py-[85px]'>
      <TouchableOpacity onPress={goBack} className='w-[35px] h-[35px] justify-center items-center border-[1px] border-white rounded-full'>
        <FontAwesome5 name="arrow-left" size={20} color="white" />
      </TouchableOpacity>
      <TextB className='text-3xl font-bold my-8'>Forgot Password</TextB>
      {children}
      <View className='flex-row justify-center items-center'>
        <TextB className='text-white text-lg font-semibold'>Remember your password?</TextB>
        <Pressable onPress={goBack}>
          <TextB className='text-white text-lg font-semibold underline '> Sign In</TextB>
        </Pressable>
      </View>
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({})