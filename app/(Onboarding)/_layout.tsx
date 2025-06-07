import { RelativePathString, router, Stack } from 'expo-router';
import { useAuth } from './OnboardContext';
import { useEffect } from 'react';

export default function AuthLayout() {
    const { userId } = useAuth();

    useEffect(() => {
      if (userId) {
        router.replace('/(tabs)/' as RelativePathString);
      }
    }, [userId]);
  
    if (userId) return null; 
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  );
}