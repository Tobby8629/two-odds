import { Alert, Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Layout from './Layout';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput';

interface data {
  email: string
  password: string
}

const SignIn = () => {
  const [data, setData] = useState<data>({
    email: '',
    password: '',
  });

  const onChange = (value: string, id?: InputField) => {
    setData((prevData) => (id ? { ...prevData, [id]: value } : prevData));
  };
  ;

  const [shift, setShift] = useState<string>("")

  const [show, setshow] = useState(false)

  const navigate = () => {
    if(data.email && data.password){
      router.replace("/Onboarding/Welcome")
  }
  else {
    Alert.alert("Please fill in all fields")
  }
}

console.log(data)

  return (
    <Layout text="Sign In" onPress={navigate} shift={shift}
      redirect={true} redirectLink='/Onboarding/SignUp' redirectText='Create an account'
    >
      <View className=' my-5'>
        <AnimatedInput
         id="email"
         onChangeText={onChange}
         setShift={setShift}
         placeholder="email"
         inputStyle='bg-white'
        />
         
        <View className='flex bg-white w-[267px] rounded-xl h-[45px] flex-row items-center mb-5'> 
          <AnimatedInput 
            id="password"
            onChangeText={onChange}
            secure={!show}
            className='w-[90%] h-full mb-[0px]'
            setShift={setShift}
            placeholder="password"
            inputStyle='bg-white'
          />
          <Pressable onPress={()=> setshow(!show)}>
            <FontAwesome5 name={show ? "eye" : "eye-slash"} color={"black"} size={15} />
          </Pressable>
        </View>

      </View>
    </Layout>
  );
};

export default SignIn;
