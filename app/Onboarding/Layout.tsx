import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BigLogo from '@/assets/SVGs/BigLogo'
import Button from '@/components/Reuseables/Button'
import { Href, router } from 'expo-router'

interface layout {
  children: React.ReactNode
  shift?: string
  redirect?: boolean
  redirectText?: string,
  redirectLink?: Href,
}

const Layout = ({children, shift, redirect, redirectLink, redirectText}: layout) => {
  
  return (
    <View className={`bg-pry h-screen w-full justify-center items-center`}>
      <View className={` items-center ${shift} w-full`}>
        <BigLogo />
        {children}
      </View>
      {redirect && redirectLink ? 
        <View className='absolute bottom-10'>
          <TouchableOpacity onPress={()=>router.replace(redirectLink)}>
              <Text className='text-white text-xl border-b-[1px] border-white py-[.3px]'>{redirectText}</Text>
          </TouchableOpacity>  
        </View>: null  
      }
      
    </View>
  )
}

export default Layout

const styles = StyleSheet.create({})