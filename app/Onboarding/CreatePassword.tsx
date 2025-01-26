import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SmallLogo from '@/assets/SVGs/SmallLogo'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'
import CheckBox from '@/components/Reuseables/Input/CheckBox'
import { passwordverification } from '@/constants/data'
import Button from '@/components/Reuseables/Button'
import { router } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import useKeyboard from '@/hooks/useKeyboard'

interface data {
  password: ""
  confirm_password: ""
}

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

  const verifying = (val: data) => {
    const hasLength = val.password.length >= 8;
    const hasUppercase = /[A-Z]/.test(val.password); 
    const hasLowercase = /[a-z]/.test(val.password); 
    const hasNumber = /[0-9]/.test(val.password);
    const hasSpecialChar = /[@$!%*?&]/.test(val.password); // Special character check
    const confirmCase = val.confirm_password === val.password; // Ensure passwords match
  
    setcheckvalue({
      ...checkvalue,
      length: hasLength,
      uppercase: hasUppercase,
      lowercase: hasLowercase,
      number: hasNumber,
      specialChar: hasSpecialChar, // New key for special character validation
      confirmed: confirmCase,
    });
  };
  

  useEffect(()=>{
    verifying(data)
  },[data])

  const hasFalseValue = Object.values(checkvalue).some(value => value === false);

  const onChange = (value: string, id: InputField | undefined) => {
    if(id){
      setData({ ...data, [id]: value });
    }
  };

  const{isKeyboardVisible}=useKeyboard()

  return (
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
          value={checkvalue[verify.val]}
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
      
      <Button text='continue' onPress={hasFalseValue ? null : () => router.replace('/Onboarding/Wallet/Create')}
         className={` m-auto mt-14 h-[45px] rounded-3xl`}
         style={hasFalseValue ?  {backgroundColor: "gray"} : {backgroundColor: "#FFC107"}}
       />
    </View>
    </ScrollView>
  )
}

export default CreatePassword

const styles = StyleSheet.create({})