import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import TextB from '@/components/Text/BasicText'
import ForgotImage from '@/assets/SVGs/Forgot'
import { FontAwesome5 } from '@expo/vector-icons'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'
import { useState } from 'react'
import Button from '@/components/Reuseables/Button'
import { router } from 'expo-router'
import Layout from './Layout'


const Forget = () => {
  const [email, setEmail] = useState({
    email: "",
    emailError: false,
    emailText: "",
  })

  const onChangeText = (value: string) => {
    setEmail({
      ...email,
      email: value
    })
  }


  return (
    <Layout>
      <View className=' flex-1 items-center'>
        {/* <Image source={forgot} alt={"forgot password"}/> */}
        <ForgotImage />
        <View className='w-full mb-7'>
          <AnimatedInput id="email"  type="email" placeholder='Email-address' onChangeText={onChangeText}
          inputStyle={`bg-white w-full ${email.emailError ? 'border-red-500 border-2' : ''}`}
          />
        </View>
        <Button text="Send Reset Link" 
        disable={email.emailError || email.email.length < 1} 
        onPress={()=> router.replace("/Onboarding/forgot_password/Reset")}
        />
      </View>
    </Layout>
      
  )
}

export default Forget

const styles = StyleSheet.create({})