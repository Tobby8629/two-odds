import { Alert, Animated, Keyboard, Pressable, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { InputID, Err } from '@/interface';
import Layout from './Layout';
import { RelativePathString, router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput';
import { validateOutput } from '@/interface';
import Button from '@/components/Reuseables/Button';
import { validate } from '@/constants/functions';
import useMutate from '@/hooks/useMutate';
import Loading from '@/components/Reuseables/Loading';
import Error from '@/components/Reuseables/Error';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation } from '@tanstack/react-query';

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
  const [err, setErr] = useState<Err>({
    message:"",
    status: false
  })

  const [passwordError, setPasswordError] = useState({
    password: false,
    text: "",
  })

  const loginErrors = (errMessage: any) => {
    if (errMessage.includes("401")) {
      setErr({
        message: "Invalid email or password.",
        status: true,
      });
    }
    else if (errMessage.includes("403")) {
      setErr({
        message: "Email not verified or account suspended",
        status: true,
      });
    }
  } 

  const mutation = useMutation({
    mutationFn: async () => {
      await login({ email: data.email, password: data.password });
    },
    // onSuccess: () => {
    //   router.replace('/(tabs)' as RelativePathString);
    // },
    onError: (error: any) => {
     loginErrors(error?.message);
    },
  })


  const onChange = (value: string, id?: InputID) => {
    setErr({message: "", status: false})
    setEmailError({...emailError, email: false})
    setData((prevData) => (id ? { ...prevData, [id]: value } : prevData));
  };

  const [shift, setShift] = useState<string>("")

  const [show, setshow] = useState(false)

  const { login, user} = useAuthStore()

  const disable = data.email === '' || data.password === '';


const navigate = async () => {
  Keyboard.dismiss();

  const emailValid = validate({
    email: data.email,
  }) as validateOutput;

  const passwordValid = validate({
    password: data.password,
  }) as validateOutput;

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

  const formIsValid = !emailValid.state && !passwordValid.state;

  if (!formIsValid) return;
  
 mutation.mutate()
};


  useEffect(() => {
    if (user?.id) {
      router.replace("/(protected)/(tabs)" as RelativePathString); // Navigate only after context is set
    }
  }, [user, mutation.isSuccess]);

  return (
    <View className='h-screen'>
    {mutation.isPending && <Loading />} 
    <View className='z-[99]'>
      {err.status && <Error error={err.message} setError={setErr} />}
    </View> 
    <Layout shift={shift} redirect={true} redirectLink='/(Onboarding)/SignUp' redirectText='Create an account'>
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
        <TouchableOpacity onPress={()=> router.replace('/(Onboarding)/forgot_password/Forget')}>
          <Text className='text-white text-lg font-semibold w-85% ml-auto pr-[8%]'>Forgot password?</Text>
        </TouchableOpacity>
        <View className='w-85% mx-auto mt-5'>
          <Button disable={disable} text="Sign In" onPress={navigate} />
        </View>
      </View>
    </Layout>
    </View>
  );
};

export default SignIn;
