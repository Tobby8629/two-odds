import { View, StyleSheet } from 'react-native';
import { useRef } from 'react';
import { Redirect, router } from 'expo-router';
import Swiper from 'react-native-swiper';
import { load } from '@/constants/data';
import Logo from '@/assets/SVGs/Logo';
import Button from '@/components/Reuseables/Button';

const Screens = () => {
  let username = null;

  if (username) {
    return <Redirect href={"/Onboarding/Welcome"} />;
  }

 
  const indicatorRef = useRef<(View | null)[]>([]);
  const handleIndexChanged = (index: number) => {
    indicatorRef.current.forEach((indicator, i) => {
      if (indicator) {
        indicator.setNativeProps({
          style: { backgroundColor: i === index ? 'white' : 'gray' },
        });
      }
    });
  };

  const indicator = Array.from({ length: load.length });

  return (
    <View className="h-screen w-screen">
      <Swiper
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={false}
        onIndexChanged={handleIndexChanged} // Callback to update index
      >
        {load.map((e) => (
          <e.component key={e.name} width={"100%"} height={"100%"} />
        ))}
      </Swiper>
      <View className="bg-pry-fade h-[100vh] w-full absolute justify-end items-center z-[99]">
        <Logo />
        <View className='mt-52 mb-36'>
          <View className="flex-row my-4 justify-center">
            {indicator.map((_, index) => (
              <View
                className="h-2 w-2 rounded-full mr-2"
                style={{ backgroundColor: index === 0 ? 'white' : 'gray' }}
                ref={(el) => (indicatorRef.current[index] = el)}
                key={(index + 1).toString()}
              />
            ))}
          </View>
          <Button text='sign Up' onPress={()=> router.push('/Onboarding/SignUp')}/>
          <Button text='sign In' onPress={()=> router.push('/Onboarding/SignIn')}/>
        </View>
      </View>
    </View>
  );
};

export default Screens;

const styles = StyleSheet.create({});
