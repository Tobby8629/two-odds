interface errorInt {
  error: string | []
  setError: React.Dispatch<React.SetStateAction<Err>>
}

import Cancel from '@/assets/SVGs/Cancel'
import ErrorCancel from '@/assets/SVGs/ErrorCancel'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { ZoomIn, ZoomInDown, ZoomInUp } from 'react-native-reanimated'
import Button from './Button'
import { FontAwesome5 } from '@expo/vector-icons'

const Error = ({error, setError}: errorInt) => {
  return (
    <Animated.View style={{zIndex: 99}} className='top-[50px] w-[95%] mx-auto absolute' entering={ZoomInUp.duration(30000).springify()}>
    <View>
      {/* <FontAwesome5 name={} /> */}
      <View style={{backgroundColor: "#8080808a"}} className='rounded-lg p-3 justify-center items-center'>
        {/* <ErrorCancel /> */}
        <Text className=' text-white text-center font-semibold capitalize text-xl my-3 w-full'>
            {error}
        </Text>
        {/* <Pressable>
          <Button  text='cancel' onPress={()=> setError({message: "", status: false})} />
        </Pressable> */}
      </View>
    </View>
    </Animated.View>
  )
}

export default Error

const styles = StyleSheet.create({})


// style={{zIndex: 99}} className='top-[20px] w-full absolute'



// import React, { useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

// export default function Error() {
//   const positionY = useRef(new Animated.Value(300)).current; // start hidden

//   useEffect(() => {
//     // Animate banner sliding up automatically after 2s
//     const timer = setTimeout(() => {
//       Animated.spring(positionY, {
//         toValue: 0,
//         useNativeDriver: true,
//       }).start();
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: (_, gesture) => {
//         return Math.abs(gesture.dy) > 10; // detect vertical movement
//       },
//       onPanResponderMove: Animated.event(
//         [null, { dy: positionY }],
//         { useNativeDriver: false }
//       ),
//       onPanResponderRelease: (_, gesture) => {
//         if (gesture.dy > 50) {
//           // If swiped down enough, hide
//           Animated.spring(positionY, {
//             toValue: 300,
//             useNativeDriver: true,
//           }).start();
//         } else {
//           // Otherwise snap back to visible
//           Animated.spring(positionY, {
//             toValue: 0,
//             useNativeDriver: true,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   return (
//     <Animated.View
//       style={[styles.banner, { transform: [{ translateY: positionY }] }]}
//       {...panResponder.panHandlers}
//     >
//       <Text style={styles.text}>🎉 Hello! Swipe me down to hide!</Text>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   banner: {
//     position: 'absolute',
//     top: -200,
//     width: '100%',
//     height: 120,
//     backgroundColor: '#222',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingHorizontal: 20,
//   },
//   text: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });
