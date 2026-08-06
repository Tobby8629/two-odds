import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Layout from '../Layout'
import QuestionMarkCircle from '@/assets/SVGs/icons/QuestionMarkCircle'
import { ToggleRightIcon } from 'lucide-react-native'
import AngleRight from '@/assets/SVGs/Angle-right'
import { flex, flexCenter } from '@/constants/style'
import { RelativePathString, router } from 'expo-router'
import ToggleButton from '@/components/Reuseables/ToggleBtn'

interface MenuOption {
  name: string;
  link: string;
}

const Index = () => {
  const menuOptions = [
    {
      name: "Change Password",
      link: "/(settings)/(security)/change_password",
    },
    {
      name: "Two-Factor Authentication (2FA)",
      link: "/(settings)/(security)/two-factor-authentication",
    },
    {
      name: "withdrawal PIN",
      link: "/(settings)/(security)/withdrawal-pin",
    },
    {
      name: "delete account",
      link: "/(settings)/(security)/delete_account",
    }
  ]
  return (
    <Layout header="Security">
      <View className='pt-6 p-7'>
        {menuOptions.map((e, i) => (
          e.name === "Two-Factor Authentication (2FA)" ? (
            <TwoFactorAuth key={e.name} e={e} i={i} menuOptions={menuOptions} />
          ) : ( 
          <Pressable
            key={e.name}
            onPress={() => router.push(e.link as RelativePathString)}
            className={`py-5 border-b border-[#1F5079] ${flex} `}
          >
            <Text className='text-white capitalize font-poppins text-base font-normal'>{e.name}</Text>
            <AngleRight />
          </Pressable>
          )
        ))}
      </View>
    </Layout>
  )
}

export default Index

const styles = StyleSheet.create({})


interface TwoFactorAuthProps {
  e: MenuOption;
  i: number;
  menuOptions?: MenuOption[];
}

const TwoFactorAuth = ({ e , i, menuOptions }: TwoFactorAuthProps) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  return (
    <Pressable
      onPress={()=> router.push(e.link as RelativePathString)}
      className={`py-5 border-b border-[#1F5079] flex-row justify-between items-center`}
    >
      <View>
        <View className='flex-row items-center gap-2 mb-2'>
          <Text className='text-white font-poppins text-base font-normal'>{e.name}</Text>
          <QuestionMarkCircle className='absolute right-7 top-4' />
        </View>
        <Text className='text-white text-xs font-poppins font-normal'>{twoFactorEnabled ? "Enabled" : "Disabled"}</Text>
      </View>
    
        <ToggleButton 
          value={twoFactorEnabled}
          onValueChange={setTwoFactorEnabled}
          activeColor="#F5AE00"
          inactiveColor="#9A9A9A"
        />
    
    </Pressable>
  )
} 