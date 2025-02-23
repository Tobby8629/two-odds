import { Alert, Animated, Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Layout from './Layout';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput';
import { validate} from '@/constants/data';
import { validateOutput } from '@/interface';
import Button from '@/components/Reuseables/Button';

interface data {
  email: string
  password: string
}

const SignIn = () => {
  const [data, setData] = useState<data>({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState({
    email: false,
    text: "",
  })

  const [passwordError, setPasswordError] = useState({
    password: false,
    text: "",
  })

  const onChange = (value: string, id?: InputID) => {
    setData((prevData) => (id ? { ...prevData, [id]: value } : prevData));
  };

  const [shift, setShift] = useState<string>("")

  const [show, setshow] = useState(false)

  const disable = data.email === '' || data.password === '';


const navigate = () => {
  // Validate email
  const emailValid  = validate({
    email: data.email,
  }) as validateOutput;

  // Validate password
  const passwordValid = validate({
    password: data.password,
  }) as validateOutput;

  // Update error state for better feedback
  setEmailError((prev) => ({
    ...prev,
    email: emailValid.state,
    text: emailValid.text,
  }));

  setPasswordError((prev) => ({
    ...prev,
    password: passwordValid.state,
    text: passwordValid.text,
  }));

  // Navigate or show errors
  if (!emailValid.state && !passwordValid.state) {
    router.replace('/Onboarding/Welcome');
  } 
  // else {
  //   const errorMessage =
  //     (emailValid.state ? emailValid.text : '') +
  //     (passwordValid.state ? passwordValid.text : '');
  //   Alert.alert(errorMessage.trim());
  // }
};



  return (
    <Layout shift={shift} redirect={true} redirectLink='/Onboarding/SignUp' redirectText='Create an account'>
      <View className='my-5 w-full'>
        <View className='w-full mb-7'>
          <AnimatedInput
          type="email"
          id="email"
          onChangeText={onChange}
          setShift={setShift}
          placeholder="email"
          inputStyle={`bg-white w-full ${emailError.email ? 'border-red-500 border-2' : ''}`}
          />
          {emailError.email ? <Text className='text-red-700 text-lg font-semibold w-85% mr-auto pl-[8%]'>{emailError.text}</Text> : null}
        </View>
        
        <View className='mb-3'>
          <View 
            className={`flex justify-between pr-2 w-[85%] mx-auto bg-white rounded-xl h-[55px] flex-row items-center ${passwordError.password ? 'border-red-500 border-2' : ''}`}
          > 
            <AnimatedInput 
              type="password"
              id="password"
              onChangeText={onChange}
              secure={!show}
              className='w-[90%] h-full mb-[0]'
              setShift={setShift}
              placeholder="password"
              inputStyle='bg-white'
            />
            <Pressable onPress={()=> setshow(!show)}>
              <FontAwesome5 name={show ? "eye" : "eye-slash"} color={"black"} size={15} />
            </Pressable>
          </View>
          {passwordError.password ? <Text className='text-red-700 text-lg font-semibold w-85% mr-auto pl-[8%]'>
          {passwordError.text}</Text> : null}
        </View>
        <TouchableOpacity onPress={()=> router.replace('/Onboarding/forgot_password/Forget')}>
          <Text className='text-white text-lg font-semibold w-85% ml-auto pr-[8%]'>Forgot password?</Text>
        </TouchableOpacity>
        <View className='w-85% mx-auto mt-5'>
          <Button disable={disable} text="Sign In" onPress={navigate} />
        </View>
      </View>
    </Layout>
  );
};

export default SignIn;
