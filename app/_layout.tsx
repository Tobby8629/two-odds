import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css'
import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreen from './SplashScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './(Onboarding)/OnboardContext';
import { useSport } from '@/store/useSports';
import useBetslip from '@/store/useStore';
// import betHistory from './bet-history';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryclient = new QueryClient
  const [ splash, setsplash] = useState(true)
  const { setMatches } = useBetslip()
  const { dataArry, updateDataArry, selectedsport } = useSport()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    SansitaOneBoldItalic: require('../assets/fonts/Sansita/Sansita-BoldItalic.ttf')
  });

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setsplash(false)
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  useEffect(()=>{
    setMatches(dataArry.flatMap((e)=>e.leagues?.flatMap((e)=>e.matches)))
  },[dataArry])

  // Show splasscreen

  if (!loaded || splash) {
    return <SplashScreen />;
  }


  return (
    <>
      <QueryClientProvider client={queryclient}>
        <UserProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{headerShown: false}}>
              <Stack.Screen name="index"  
              options={{
                gestureEnabled: false, // disables swipe back on iOS
                headerShown: false,    // optional: hide header
              }}/>
              <Slot />
            </Stack>
          <StatusBar style="auto" />
          </ThemeProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
    
  );
}
