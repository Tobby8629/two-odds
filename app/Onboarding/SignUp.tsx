import { Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'
import Logo from '@/assets/SVGs/Logo'
import CheckBox from '@/components/Reuseables/Input/CheckBox'
import Button from '@/components/Reuseables/Button'
import { validate } from '@/constants/data'
import { validateOutput } from '@/interface'


const Signup = () => {

  const [registerData, setRegisterData] = useState<register>({
    email: "" as InputField,
    tc: false,
    subscribe: false,
  })

  const [emailError, setEmailError] = useState({
    email: false,
    text: "",
  })
  
  const onChange = (value: string, type: InputField | undefined) => {
    if(type){
      setRegisterData({ ...registerData, [type]: value });
    }
  };
  const changeBox = (type: keyof register | undefined) => {
    if(type){
      setRegisterData((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  const submit = () => {
    const emailValid  = validate({
      email: registerData.email,
    }) as validateOutput;

    setEmailError((prev) => ({
      ...prev,
      email: emailValid.state,
      text: emailValid.text,
    }));

    if(!emailValid.state && registerData.tc){
      router.replace('/Onboarding/verify/Verify')
    }
  }
  
  return (
    <View className='h-screen w-full bg-pry justify-center items-center px-[8%]'>
       <View className='flex-row justify-center'>
         <Logo />
       </View>
       <View className='w-full  mb-5'>
        <Text className=' my-8 w-full text-left text-white text-[26px] font-bold'>Enter your email address</Text>
        <AnimatedInput 
          type='email'
          inputStyle='rounded-lg bg-white'
          className='w-full h-[50px]'
          placeholder='Email address'
          onChangeText={onChange}
        />
        {emailError.email ? <Text className='text-red-700 text-lg font-semibold w-85% mr-auto'>{emailError.text}</Text> : null}
       </View>
       
       <CheckBox onPress={changeBox} id="tc" value={registerData.tc}>
          <Text className='text-white text-[14px] font-light leading-[20px]'>I have read and agree to 2Odds 
            <Text className="font-semibold"> Terms of Service</Text> and 
            <Text className="font-semibold"> Privacy Policy</Text>
          </Text>
       </CheckBox>
       <CheckBox onPress={changeBox} id="subscribe" value={registerData.subscribe}> 
         <Text className='text-white text-[14px] leading-[20px]'>Sign me up to receive newsletters, offers and tips from 2Odds (you can opt out at any time) <Text className='text-sec'>OPTIONAL</Text> </Text> 
       </CheckBox>

       <Button text='verify' onPress={submit}
         className={` m-auto mt-14 h-[45px] rounded-3xl `}
         style={ !registerData.email || !registerData.tc ? {backgroundColor: "gray"} : {backgroundColor: "#FFC107"}}
       />

       <View className='absolute bottom-10 flex-row items-center justify-center w-full'>
        <Text className='text-white text-xl'>Already Have An Account? </Text>
        <TouchableOpacity onPress={()=>router.replace("/Onboarding/SignIn")}>
          <Text className='text-sec font-bold text-xl border-b-[1px] border-blue-400 py-[.3px]'>Login</Text>
        </TouchableOpacity> 
       </View>
        
    </View>
  )
}

export default Signup
