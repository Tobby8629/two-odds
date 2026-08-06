// import { Pressable, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import Layout from '../Layout'
// import { ThemedText } from '@/components/ThemedText'
// import Button from '@/components/Reuseables/Button'

// type DELETE_ACCOUNT = "delete" | "exclusion"
// interface comp {
//   option: DELETE_ACCOUNT,
//   setoption: React.Dispatch<React.SetStateAction<DELETE_ACCOUNT>>
// }

// const delete_account = () => {
//   const [option, setoption] = useState<DELETE_ACCOUNT>("delete")
//   return (
//    <Layout header='Delete Account' navigator='xmark'>
//       {option === "delete" ?  <Delete setoption={setoption} option={option}/>
//        : <Exclusion setoption={setoption} option={option} />}
//       <View>
//         <ThemedText className='leading-7 text-lg'>Customer service</ThemedText>
//         <ThemedText className='leading-7 text-lg'>Lorem ipsum dolor sit amet consectetur. Facilisi arcu cursus pellentesque dui urna.</ThemedText>
//       </View>
//    </Layout>
//   )
// }

// const Exclusion = ({setoption}: comp) => {
//   return (
//     <View>
//       <ThemedText>
//         Lorem ipsum dolor sit amet consectetur. 
//         Habitasse at phasellus venenatis non eu egestas arcu lectus.
//         Molestie duis amet sit et. Vitae feugiat lacus faucibus 
//         tincidunt convallis. Nunc.Lorem ipsum dolor sit amet 
//         consectetur. Habitasse at phasellus venenatis non eu egestas
//         arcu lectus. Molestie duis amet sit et. Vitae feugiat lacus faucibus 
//         tincidunt convallis. Nunc.Lorem ipsum dolor sit amet consectetur. 
//         Habitasse at phasellus venenatis non eu egestas arcu lectus. Molestie duis amet sit et. 
//         Vitae feugiat lacus faucibus tincidunt convallis. Nunc.
//       </ThemedText>
//       <ThemedText>
//         If you are considering the self exclusion you need to withdraw your money. 
//         You won’t be able to withdraw until you back.
//       </ThemedText>
//       <Button text='Set up Self-Exclusion' onPress={()=>console.log("cancel")}/>
//     </View>
//   )
// }

// const Delete = ({setoption}: comp) => {
//   return (
//     <View className='p-6'>
//       <ThemedText className='text-2xl my-6 leading-9'>Are You Sure You Wish to Delete Your Account</ThemedText>
//       <ThemedText className='leading-7 text-lg'>
//         Lorem ipsum dolor sit amet consectetur. 
//         Habitasse at phasellus venenatis non eu egestas arcu lectus.
//          Molestie duis amet sit et.
//          Vitae feugiat lacus faucibus tincidunt convallis. Nunc.
//       </ThemedText>
//       <ThemedText className='my-5 text-lg'>
//         Lorem ipsum dolor sit amet consectetur. 
//         Habitasse at phasellus venenatis non eu egestas 
//       </ThemedText>
//       <ThemedText className='leading-7 text-lg'>
//         If you wish to close your account temporarily and use it in the future 
//         you will need to contact support directly or self exclude yourself
//         <Pressable onPress={()=> setoption("exclusion")}>
//           <ThemedText className='!text-sec text-lg'> Click Here. </ThemedText>
//         </Pressable>
//       </ThemedText>
//       <Button className='mx-auto my-3' text='Close Your Account' onPress={()=>console.log("cancel")}/>
      
//     </View>
//   )
// }

// export default delete_account

// const styles = StyleSheet.create({})


import { ScrollView, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Layout from "../Layout";
import { ThemedText } from "@/components/ThemedText";
import Button from "@/components/Reuseables/Button";
import { flex, flexNoJustify } from "@/constants/style";
import Headset from "@/assets/SVGs/icons/Headset";
import useMutate, { useMutateDelete } from "@/hooks/useMutate";
import { RelativePathString } from "@/.expo/types/router";

type DELETE_ACCOUNT = "delete" | "exclusion";

interface CompProps {
  option: DELETE_ACCOUNT;
  setoption: React.Dispatch<React.SetStateAction<DELETE_ACCOUNT>>;
}

const DeleteAccount = () => {
  const [option, setoption] = useState<DELETE_ACCOUNT>("delete");
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const handleContentSizeChange = (contentWidth: number, contentHeight: number) => {
    // Automatically enable scroll if content exceeds available height
    setIsScrollable(contentHeight > 600);
  };

  const Content = (
    <>
      {option === "delete" ? (
        <Delete setoption={setoption} option={option} />
      ) : (
        <Exclusion setoption={setoption} option={option} />
      )}

      {/* Customer Service Section */}
      <View className="mt-12 mb-8 w-[80%] mx-auto items-center">
        <View className={`${flexNoJustify}`}>
          <Text className=" text-[#FFB84C]  font-poppins text-base ">
            Customer Service 
          </Text>
          <View className="w-6 h-6 ml-2">
            <Headset width={"100%"} height={"100%"} />
          </View>
        </View>
        <ThemedText className="text-center text-sm  text-gray-200 leading-6 mt-1">
          Lorem ipsum dolor sit amet consectetur. Facilisi arcu cursus pellentesque dui urna.
        </ThemedText>
      </View>
    </>
  );

  return (
    <Layout header={option === "delete" ? "Delete Account" : "Self-Exclusion"} navigator="xmark">
      {isScrollable ? (
        <ScrollView
          ref={scrollRef}
          onContentSizeChange={handleContentSizeChange}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 32 }}
        >
          {Content}
        </ScrollView>
      ) : (
        <View
          className="flex-1 px-6 py-10 justify-between"
          onLayout={() => setIsScrollable(false)}
        >
          {Content}
        </View>
      )}
    </Layout>
  );
};

const Exclusion = ({ setoption }: CompProps) => {
  return (
    <View>
      <ThemedText className="text-gray-100 text-base leading-7 mb-6">
        Lorem ipsum dolor sit amet consectetur. Habitasse at phasellus venenatis non eu egestas
        arcu lectus. Molestie duis amet sit et. Vitae feugiat lacus faucibus tincidunt convallis.
        Nunc. Lorem ipsum dolor sit amet consectetur. Habitasse at phasellus venenatis non eu
        egestas arcu lectus. Molestie duis amet sit et. Vitae feugiat lacus faucibus tincidunt
        convallis. Nunc.
      </ThemedText>

      <ThemedText className="text-gray-100 text-base leading-7 mb-10">
        If you are considering the self-exclusion, you need to withdraw your money first. You won’t
        be able to withdraw until you’re back.
      </ThemedText>

      <Button
        text="Set up Self-Exclusion"
        className=" w-[60%] mt-4 mx-auto"
        onPress={() => console.log("Set up exclusion")}
      />
    </View>
  );
};

const Delete = ({ setoption }: CompProps) => {
  const { mutateAsync } = useMutateDelete({
    link: "/(Onboarding)/SignIn" as RelativePathString,
  })

  const handleDeleteAccount = async () => {
    try {
      await mutateAsync({
        url: "/auth/account",
        data: {},
      });
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  return (
    <View>
      <ThemedText className="text-2xl font-semibold text-white leading-9 mb-5">
        Are You Sure You Wish to Delete Your Account?
      </ThemedText>

      <ThemedText className="text-gray-100 text-base leading-7 mb-5">
        Lorem ipsum dolor sit amet consectetur. Habitasse at phasellus venenatis non eu egestas arcu
        lectus. Molestie duis amet sit et. Vitae feugiat lacus faucibus tincidunt convallis. Nunc.
      </ThemedText>

      <ThemedText className="text-gray-100 text-base leading-7 mb-5">
        Lorem ipsum dolor sit amet consectetur. Habitasse at phasellus venenatis non eu egestas.
      </ThemedText>

    
        <ThemedText className={`text-gray-100 text-base`}>
          If you wish to close your account temporarily and use it in the future, contact support
          directly or self-exclude yourself{" "}
            <Pressable onPress={() => setoption("exclusion")}>
              <ThemedText className="!text-[#FFB84C] mb-[-4px]"> Click here?</ThemedText>
            </Pressable>
        </ThemedText>
     
      <Button
        text="Close Your Account"
        className=" w-[60%] mt-6 mx-auto"
        onPress={() => handleDeleteAccount()}
      />
    </View>
  );
};

export default DeleteAccount;

const styles = StyleSheet.create({});
