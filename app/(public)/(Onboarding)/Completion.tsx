import { Pressable, StyleSheet, Text, View } from 'react-native'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'
import CircledMarked from '@/assets/SVGs/Circled-marked';

const Completion = () => {
   const { email } = useLocalSearchParams();
  return (
    <View className='bg-pry h-screen justify-center items-center'>
       <View>
        <CircledMarked />        
       </View>
       <Text className=' font-bold text-2xl my-8 text-white'>Account Created Successfully</Text>
       <Pressable onPress={()=> router.replace({ pathname: "/" as RelativePathString, params: { email: email } })} className='bpx-10 py-3 rounded-lg'>
        <Text className='text-sec text-xl font-semibold'>Continue</Text>
       </Pressable>
    </View>
  )
}

export default Completion

const styles = StyleSheet.create({})