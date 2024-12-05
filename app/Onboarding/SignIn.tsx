import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Layout from './Layout';
import { router } from 'expo-router';
import Textinput from '@/components/Reuseables/Input/TextInput';
import { FontAwesome5 } from '@expo/vector-icons';
import AnimatedInput from '@/components/Reuseables/Input/AnimatedInput';


const SignIn = () => {
  const [data, setData] = useState<Record<InputField, string>>({
    email: '',
    password: '',
  });

  const onChange = (id: InputField, value: string) => {
    setData({ ...data, [id]: value });
  };

  const [shift, setShift] = useState<string>("")

  const [show, setshow] = useState(false)


  return (
    <Layout text="sign up" onPress={() => router.replace('/(tabs)')} shift={shift}>
      <View className=' my-5'>
        <AnimatedInput
         id="email"
         onChangeText={onChange}
         setShift={setShift}
        />
         
        <View className='flex bg-white w-[267px] h-[45px] flex-row items-center mb-5'>
          <AnimatedInput 
            id="password"
            onChangeText={onChange}
            secure={!show}
            className='w-[90%] mb-0 h-full'
            setShift={setShift}
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

// 
//   container: {
//     marginVertical: 16,
//   },
//   inputWrapper: {
//     position: 'relative',
//     width: 'auto',
//   },
//   placeholder: {
//     position: 'absolute',
//     zIndex: 99,
//     top: '40%',
//     left: '5%',
//   },
// });