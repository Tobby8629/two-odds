import { Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { RelativePathString, router } from 'expo-router'
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput'
import Logo from '@/assets/SVGs/Logo'
import CheckBox from '@/components/Reuseables/Input/CheckBox'
import Button from '@/components/Reuseables/Button'
import { Err, InputField, InputID, register, validateOutput } from '@/interface'
import { validate } from '@/constants/functions'
import useMutate from '@/hooks/useMutate'
import { useAuth } from './OnboardContext'
import Loading from '@/components/Reuseables/Loading'
import Error from '@/components/Reuseables/Error'

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

  const [err, setErr] = useState<Err>({
    message:"" ,
    status: false
  })
  
  const onChange = (value: string, type: InputID | undefined) => {
    setErr({message: "", status: false})
    setEmailError({...emailError, email: false})
    if(type){
      setRegisterData({ ...registerData, [type]: value });
    }
  };

  const {mutate, isPending, data, isSuccess, error} = useMutate({
    link: "/(Onboarding)/verify/Verify" as RelativePathString, 
    params: {email: registerData.email}
  });

  const {setUserId} = useAuth()

  const changeBox = (type: keyof register | undefined) => {
    if(type){
      setRegisterData((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
  };

  const submit = async () => {
    const emailValid  = validate({
      email: registerData.email,
    }) as validateOutput;

    setEmailError((prev) => ({
      ...prev,
      email: emailValid.state,
      text: emailValid.text,
    }));

    if(!emailValid.state && registerData.tc){
      mutate({
        url: "/auth/register",
        data: {email: registerData.email}
    })
    }
  }

  useEffect(() => {
    if (isSuccess && data?.user?._id) {
      setUserId(data.user._id);
    }
    if (error) {
      setErr({
        message: error?.response?.data.message,
        status: true
      })
      setEmailError({
        text: " ", 
        email: true
      })
    }
  }, [isSuccess, error, data]);

  
  
  return (
    <View className='h-screen w-full bg-pry justify-center items-center'>
      {isPending && <Loading />}
      {err.status && <Error setError={setErr} error={err.message}/>}
      {/* <Error setError={setErr} error={err.message}/> */}
      <View className='w-full px-[8%]'>
        <View className='flex-row justify-center'>
          <Logo />
        </View>
        <View className='w-full  mb-5'>
          <Text className=' my-8 w-full text-left text-white text-[26px] font-bold'>Enter your email address</Text>
          <AnimatedInput 
            type='email'
            id="email"
            inputStyle='rounded-lg bg-white'
            className={`w-full h-[50px] ${emailError.email ? "border-red-500 border-2 rounded-xl" : ""} ` }
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

        <Button 
          text={isPending ? "loading..." : 'verify' }
          disable={isPending || !registerData.email || !registerData.tc}
          onPress={submit}
          className={` m-auto mt-14 h-[45px] rounded-3xl `}
          style={ isPending || !registerData.email || !registerData.tc ? {backgroundColor: "gray"} : {backgroundColor: "#FFC107"}}
        />
      </View>
      <View className='absolute bottom-10 flex-row items-center justify-center w-full'>
        <Text className='text-white text-xl'>Already Have An Account? </Text>
        <TouchableOpacity onPress={()=>router.replace("/(Onboarding)/SignIn")}>
          <Text className='text-sec font-bold text-xl border-b-[1px] border-blue-400 py-[.3px]'>Login</Text>
        </TouchableOpacity> 
      </View>
    </View>
  )
}

export default Signup


