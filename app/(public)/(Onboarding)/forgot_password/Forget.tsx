import { StyleSheet, View } from 'react-native'
import TextB from '@/components/Text/BasicText'
import ForgotImage from '@/assets/SVGs/Forgot'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'
import { useState } from 'react'
import Button from '@/components/Reuseables/Button'
import { RelativePathString, router } from 'expo-router'
import Layout from './Layout'
import { validate } from '@/constants/functions'
import useMutate from '@/hooks/useMutate'


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

  const { mutate, isPending } = useMutate({
    link: "/(public)/(Onboarding)/forgot_password/ResetOtp" as RelativePathString,
    params: {
      email: email.email
    }
  })

  const disable = email.email === '';

  const navigate = () => {
    const checkEmail = validate({email: email.email})
    setEmail((prev)=>({
      ...prev,
      emailError: checkEmail.state,
      emailText: checkEmail.text
    }))
    if (!checkEmail.state) {
      mutate({url: "/auth/forgot-password", data: {email: email.email}})
    }
  }


  return (
    <Layout>
      <View className=' flex-1 items-center'>
        {/* <Image source={forgot} alt={"forgot password"}/> */}
        <View className='my-7'>
          <ForgotImage />
        </View>
        
        <View className= {`bg-white rounded-lg w-full ${email.emailError ? 'border-red-500 border-2' : ''}`}>
          <AnimatedInput id="email" type="email" placeholder='Email-address' onChangeText={onChangeText}
          className='w-[95%]'
          />
        </View>
        {email.emailError ? <TextB className='!text-red-700 text-lg font-semibold w-85% my-3 mr-auto'>
          {email.emailText}</TextB> : null}
        <Button 
        text={ isPending ? "Sending..." : "Send Reset Link"} 
        disable={disable || isPending} 
        onPress={navigate}
        />
      </View>
    </Layout>
      
  )
}

export default Forget

const styles = StyleSheet.create({})