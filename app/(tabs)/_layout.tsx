import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Nav } from '@/interface';
import { nav } from '@/constants/data';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const game = true; // This should be determined based on your app's logic
  const bets = 14
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel:  false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {nav.map((item: Nav) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.name,
            headerTitleStyle: { display: 'none' },
            tabBarIcon: ({ focused }) => (
              <item.icon
               bets={item.name === 'bets' ? bets ? bets : null : false}
               game={item.name === 'betslip' ? game ? true : false : false} 
               color={focused ? "#ffa500" : colorScheme === 'dark' ?  "white" :  "black"} 
              />
            ),
          }}
        />
      ))}
       
      {/* <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitleStyle:{display: 'none'},
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      /> */}
    </Tabs>
  );
}
