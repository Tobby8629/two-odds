import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { RelativePathString, router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { load } from '@/constants/data';
import Logo from '@/assets/SVGs/Logo';
import Button from '@/components/Reuseables/Button';
import { useAuth } from './(Onboarding)/OnboardContext';

const Screens = () => {
  // const { userId } = useAuth();
  let userId = "tobby";
  // console.log("userId", userId);

  useEffect(() => {
    if (userId) {
      setTimeout(() => {
        router.replace('/(tabs)' as RelativePathString);
      }, 0);
    }
  }, [userId]);

  // if (userId) return null;

  return (
    <View className="h-screen w-screen">
      <Swiper autoplay autoplayTimeout={3} showsPagination={false}>
        {load.map((e) => (
          <e.component key={e.name} width={"100%"} height={"100%"} />
        ))}
      </Swiper>
      <View className="bg-pry-fade h-[100vh] w-full absolute justify-end items-center z-[99]">
        <Logo />
        <View className='mt-52 mb-36'>
          <Button text='sign Up' onPress={() => router.push('/(Onboarding)/SignUp')} />
          <Button text='sign In' onPress={() => router.push('/(Onboarding)/SignIn')} />
        </View>
      </View>
    </View>
  );
};

export default Screens;

const styles = StyleSheet.create({});
