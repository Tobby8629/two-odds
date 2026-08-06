import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'
import { verified } from '@/assets/images'
import CircledMarked from '@/assets/SVGs/Circled-marked';

const Verified = () => {
   const { email } = useLocalSearchParams();
  return (
    <View className='bg-pry h-screen justify-center items-center'>
       <View>
        <CircledMarked />        
       </View>
       <Text className=' font-bold text-2xl my-8 text-white'>Email has been verified</Text>
       <Pressable onPress={()=> router.replace({ pathname: "/(Onboarding)/CreatePassword" as RelativePathString, params: { email: email } })} className='bpx-10 py-3 rounded-lg'>
        <Text className='text-sec text-xl font-semibold'>Continue</Text>
       </Pressable>
    </View>
  )
}

export default Verified

const styles = StyleSheet.create({})