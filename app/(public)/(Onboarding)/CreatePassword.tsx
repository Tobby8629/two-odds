import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SmallLogo from '@/assets/SVGs/SmallLogo'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'
import CheckBox from '@/components/Reuseables/Input/CheckBox'
import { passwordverification } from '@/constants/data'
import Button from '@/components/Reuseables/Button'
import { RelativePathString, useLocalSearchParams } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import useKeyboard from '@/hooks/useKeyboard'
import { data, InputID, verifyInt } from '@/interface'
import { hasFalseValue, verifying } from '@/constants/functions'
import useMutate from '@/hooks/useMutate'
import Loading from '@/components/Reuseables/Loading'


const CreatePassword = () => {
  const [checkvalue, setcheckvalue] = useState<verifyInt>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false, 
    confirmed: false,
    specialChar: false
  })

  const [data, setData] = useState<data>({
    password: "",
    confirm_password: ""
  })

  const [passwordShow, setPasswordshow] = useState(false)
  const [confirmPasswordShow, setConfirmPasswordshow] = useState(false)

  useEffect(()=>{
    verifying(data, checkvalue, setcheckvalue);
  },[data])

  const check = hasFalseValue(checkvalue)

  const onChange = (value: string, id: InputID | undefined) => {
    if(id){
      setData({ ...data, [id]: value });
    }
  };
 const { email} = useLocalSearchParams();

  const {mutate, isPending} = useMutate({
    link: "/(Onboarding)/Completion" as RelativePathString
  });

  const{isKeyboardVisible}=useKeyboard()

  return (
    <View>
      {isPending && <Loading />}
      <ScrollView className={`h-full bg-pry px-[8%]`}>
        <View className={`${isKeyboardVisible ? "min-h-[120vh]" : "min-h-screen"} w-full`}>
        <View className='flex-row justify-center mt-[100px]'>
          <SmallLogo />
        </View>
        
        <Text className=' font-bold text-2xl my-3 text-white'>Create Password</Text>
        <Text className=' font-semi-bold text-white text-lg mb-5'>Use a minimum of 8 characters, including uppercase letters, lowercase letters and numbers.</Text>
        
        <View className='flex bg-gray-300 py-[5px] pr-[10px] rounded-xl w-[90%] h-[55px] flex-row items-center mb-3'> 
          <AnimatedInput 
            id='password'
            onChangeText={onChange}
            placeholder='password'
            secure={!passwordShow}
            className='w-[90%] h-full bg-transparent mb-[0px]'
            inputStyle='bg-transparent'
          />
          <Pressable onPress={()=> setPasswordshow(!passwordShow)}>
            <FontAwesome5 name={passwordShow ? "eye" : "eye-slash"} color={"black"} size={15} />
          </Pressable>
        </View>

        {passwordverification.map((verify)=>(
          <CheckBox 
            onPress={null}
            value={checkvalue[verify.val as keyof verifyInt]}
            key={verify.id}
          >
          <Text className='text-white mt-[3px]'>{verify.text}</Text>
          </CheckBox>
        ))}

        <View className='flex bg-gray-300 py-[5px] pr-[10px] rounded-xl w-[90%] h-[55px] flex-row items-center mt-3'> 
          <AnimatedInput 
            id='confirm_password'
            onChangeText={onChange}
            placeholder='confirm password'
            secure={!confirmPasswordShow}
            className='w-[90%] h-full bg-transparent mb-[0px]'
            inputStyle='bg-transparent'
          />
          <Pressable onPress={()=> setConfirmPasswordshow(!confirmPasswordShow)}>
            <FontAwesome5 name={confirmPasswordShow ? "eye" : "eye-slash"} color={"black"} size={15} />
          </Pressable>
        </View>
        
        <Button text={isPending ? 'creating...' :'continue'} onPress={check ? null : () => {
          console.log("email", email)
          mutate(
          {url:  `/auth/register`,
          data: {
            email: email as string,
            password: data.password,
          }})}}
          className={` m-auto mt-14 h-[45px] rounded-3xl`}
          style={check || isPending ?  {backgroundColor: "gray"} : {backgroundColor: "#FFC107"}}
        />
      </View>
      </ScrollView>
    </View>
  )
}

export default CreatePassword

const styles = StyleSheet.create({})