import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Layout from './Layout';
import { router } from 'expo-router';
import Textinput from '@/components/Reuseables/Input/TextInput';
import { FontAwesome5 } from '@expo/vector-icons';


const SignIn = () => {
  const [data, setData] = useState<Record<InputField, string>>({
    email: '',
    password: '',
  });
  const [focus, setFocus] = useState<Record<InputField, boolean>>({
    email: false,
    password: false,
  });

  const animatedValue = React.useRef<Record<InputField, Animated.Value>>({
    email: new Animated.Value(0),
    password: new Animated.Value(0),
  }).current;

  const onChange = (id: InputField, value: string) => {
    setData({ ...data, [id]: value });
  };

  const [className, setClassName] = useState('')

  const handleFocus = (id: InputField) => {
    setFocus((prev) => ({ ...prev, [id]: true }));
    Animated.timing(animatedValue[id], {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setClassName("mt-[-200px]")
  };

  const handleBlur = (id: InputField) => {
    if (data[id] == '') {
      setFocus((prev) => ({ ...prev, [id]: false }));
      Animated.timing(animatedValue[id], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
    setClassName("")
  };

  const getAnimatedStyle = (id: InputField) => ({
    transform: [
      {
        translateY: animatedValue[id].interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20], // Adjust values as needed
        }),
      },
    ],

    // fontSize: focus[id] ? 10 : 20,?

    color: focus[id] ? 'gold' : '#999', // Change color on focus
  });

  const [show, setshow] = useState(false)
  


  return (
    <Layout text="sign up" onPress={() => router.replace('/(tabs)')} className={className}>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Animated.Text style={[styles.placeholder, getAnimatedStyle('email')]}>
            E-mail address
          </Animated.Text>
          <Textinput
            id={"email" as InputField}
            onChangeText={onChange}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Animated.Text
            style={[styles.placeholder, getAnimatedStyle('password')]}
          >
            Password
          </Animated.Text>
          <View className='bg-white w-[267px] h-[39px] flex flex-row items-center'>
            <Textinput
              id={"password" as InputField}
              onChangeText={onChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              className=' w-[92%]'
              secure={!show}
            />
            <Pressable onPress={()=> setshow(!show)}>
              <FontAwesome5 name={show ? "eye" : "eye-slash"} color={"black"}/>
            </Pressable>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  inputWrapper: {
    marginBottom: 7,
    position: 'relative',
    width: 'auto',
  },
  placeholder: {
    position: 'absolute',
    zIndex: 99,
    top: '40%',
    left: '5%',
  },
});