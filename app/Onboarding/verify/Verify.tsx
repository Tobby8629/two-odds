import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import SmallLogo from '@/assets/SVGs/SmallLogo'
import Button from '@/components/Reuseables/Button'
import { Link, RelativePathString, router, useLocalSearchParams } from 'expo-router'
import OTPInput from '@/components/ui/Otp'
import useKeyboard from '@/hooks/useKeyboard'
import useMutate from '@/hooks/useMutate'
import { useUser } from '../OnboardContext'

const Verify = () => {
  const {isKeyboardVisible} = useKeyboard()
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const { email} = useLocalSearchParams();
  const { userId } = useUser()
  const { mutate, isPending } = useMutate({
    link: "/Onboarding/verify/Verified" as RelativePathString,
    params: {userId}
  });
  const handleOtpSubmit = (otp: string) => {
    mutate({
      url: `/auth/verify/${userId}`,
      data: { 
         otp: `${otp}`
       },
    })
  }

  return (
    <View className={`h-screen bg-pry ${isKeyboardVisible ? "pt-[80px]": "justify-center"} items-center`}>
      <View className='mb-20'>
        <SmallLogo />
      </View>
      
      <Text className=' text-3xl text-white font-bold mb-8'>Verify your email address</Text>
      <Text className='text-xl font-light text-white'>We’ve sent a verification code to </Text>
      <Text className='text-xl font-semibold text-white'>{email}</Text>
      <View className='my-5'>
        <OTPInput length={4} otp={otp} setOtp={setOtp} onSubmit={handleOtpSubmit} />
      </View>

      <Text className='w-8/12 text-center text-white font-light text-base'>
        Didn’t receive your verification code? <Link className='t"xt-sec"' href={"/"}>Click here to 
        resend</Link>
      </Text>
      
      <Button disable={isPending} text={isPending ? 'verifying' :'verify'} onPress={()=>handleOtpSubmit(otp.join(""))}
         className={` m-auto mt-14 h-[45px] rounded-3xl ${isPending ? "bg-gray-400" : "bg-sec"} `}
       />
    </View>
  )
}

export default Verify

const styles = StyleSheet.create({})