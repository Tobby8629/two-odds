import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from './Layout'
import ForgotImage from '@/assets/SVGs/Forgot'
import OTPInput from '@/components/ui/Otp'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'
import Button from '@/components/Reuseables/Button'
import useMutate from '@/hooks/useMutate'

const ResetOtp = () => {
  const email = useLocalSearchParams().email as string;
  const [otp, setOtp] = React.useState<string[]>(Array(4).fill(""));
  // const { mutate, isPending} = useMutate({
  //   link: "/(public)/(Onboarding)/forgot_password/Reset" as RelativePathString,
  // })
  const disable = otp.some((digit) => digit === "");
  const handleSubmit = () => {
    if (!disable) {
      // const otpString = otp.join("");
      // mutate({url: "/auth/verify-otp", data: {email, otp: otpString}})
      router.push({
        pathname: "/(public)/(Onboarding)/forgot_password/Reset",
        params: {
          email,
          otp: otp.join(""),
        },
      });
    }
  }
  return (
     <Layout>
      <View className=' flex-1 items-center'>
        {/* <Image source={forgot} alt={"forgot password"}/> */}
        <View className='my-7'>
          <ForgotImage />
        </View>
        <View>
          <Text className='text-white text-2xl font-semibold mb-5 text-center'>
            We’ve sent an OTP code to {email}
          </Text>
          <OTPInput
            length={4}
            onSubmit={handleSubmit}
            otp={otp}
            setOtp={setOtp}
          />
        </View>
        <Button 
        text='continue'
        // text={isPending ? "verifying..." : "continue"} 
        disable={disable}
        onPress={handleSubmit}
        />
      </View>
    </Layout>
  )
}

export default ResetOtp

const styles = StyleSheet.create({})