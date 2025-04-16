import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import '../global.css'
import { useColorScheme } from '@/hooks/useColorScheme';
import SplashScreen from './SplashScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryclient = new QueryClient
  const [ splash, setsplash] = useState(true)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setsplash(false)
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <>
      {splash ? <SplashScreen /> : 
      
      <QueryClientProvider client={queryclient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name='index' /> 
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
      }
    </>
    
  );
}
