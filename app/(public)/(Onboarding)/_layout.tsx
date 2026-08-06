import { RelativePathString, router, Stack } from 'expo-router';
import { useAuth } from './OnboardContext';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthLayout() {
    const { user } = useAuthStore();

    useEffect(() => {
      if (user) {
        router.replace('/(tabs)/' as RelativePathString);
      }
    }, [user]);
  
    if (user) return null; 
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    />
  );
}