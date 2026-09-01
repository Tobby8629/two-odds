import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Host } from "react-native-portalize";
import "react-native-reanimated";

import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuthStore } from "@/store/useAuthStore";
import { useSport } from "@/store/useSports";
import useBetslip from "@/store/useStore";

import { UserProvider } from "./(public)/(Onboarding)/OnboardContext";
import SplashScreen from "./SplashScreen";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  /*
   * Creating QueryClient directly inside the component would create a new
   * client every time RootLayout re-renders.
   */
  const [queryClient] = useState(() => new QueryClient());

  const [showSplash, setShowSplash] = useState(true);

  const setMatches = useBetslip((state) => state.setMatches);

  // const dataArry = useSport((state) => state.dataArry);

  const user = useAuthStore((state) => state.user);
  
  const initialized = useAuthStore(
    (state) => state.initialized
  );
  const initializeAuth = useAuthStore(
    (state) => state.initializeAuth
  );

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),

    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),

    PoppinsItalic: require("../assets/fonts/Poppins/Poppins-Italic.ttf"),

    PoppinsSemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    
    PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),

    SansitaOneBoldItalic: require(
      "../assets/fonts/Sansita/Sansita-BoldItalic.ttf"
    ),

    NoyhRegular: require(
      "../assets/fonts/Noyh-Geometric-Font-Family/Demo_Fonts/Fontspring-DEMO-noyhgeometric-black.otf"
    ),

    NoyhBold: require(
      "../assets/fonts/Noyh-Geometric-Font-Family/Demo_Fonts/Fontspring-DEMO-noyhgeometric-bold.otf"
    ),
  });

  /*
   * Restore the stored session when the app starts.
   *
   * initializeAuth checks SecureStore for the refresh token,
   * obtains a new access token, and retrieves the logged-in user.
   */
  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  /*
   * Custom splash screen delay.
   */
  useEffect(() => {
    if (!fontsLoaded || !initialized) {
      return;
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [fontsLoaded, initialized]);

  /*
   * Update matches whenever sports data changes.
   */
  // useEffect(() => {
  //   const matches = dataArry.flatMap((sport) =>
  //     sport.leagues?.flatMap((league) => league.matches ?? []) ??
  //     []
  //   );

  //   setMatches(matches);
  // }, [dataArry, setMatches]);

  /*
   * Keep showing the splash screen until:
   *
   * 1. Fonts have loaded
   * 2. Authentication has been restored
   * 3. Your custom splash delay has completed
   */
  if (!fontsLoaded || !initialized || showSplash) {
    return <SplashScreen />;
  }

  // console.log("User in RootLayout:", user);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Host>
          <ThemeProvider
            value={
              colorScheme === "dark"
                ? DarkTheme
                : DefaultTheme
            }
          >
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Protected guard={!user}>
                <Stack.Screen
                  name="index"
                  options={{
                    gestureEnabled: false,
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="(public)/(Onboarding)"
                  options={{
                    gestureEnabled: false,
                    headerShown: false,
                  }}
                />
              </Stack.Protected>

              <Stack.Protected guard={Boolean(user)}>
                <Stack.Screen
                  name="(protected)/(tabs)"
                  options={{
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />

                <Stack.Screen
                  name="(protected)/bet-history"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Protected>
            </Stack>

            <StatusBar style="auto" />
          </ThemeProvider>
        </Host>
      </UserProvider>
    </QueryClientProvider>
  );
}