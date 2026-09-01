import { Tabs } from 'expo-router';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Nav } from '@/interface';
import { nav } from '@/constants/data';
import { useTabStore } from '@/store/useTabStore';
import { useP2PStore } from '@/store/useP2PStore';
import * as Haptics from 'expo-haptics';
import { useMatches } from '@/hooks';
import SolidRoundSpinner from '@/components/Reuseables/SolidSpinner';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const game = true; // This should be determined based on your app's logic
  const bets = 14;

  const selectedleague = "cmsuhhp0k000d1fq9cdq0w0bi"
  const {isLoading } = useMatches(selectedleague)
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#123456", alignItems: 'center' }}>
        <SolidRoundSpinner />
      </View>
    ) 
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {nav.map((item: Nav) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.name,
            headerTitleStyle: { display: 'none' },
            tabBarIcon: ({ focused }) => (
              <item.icon
                bets={item.name === 'bets' ? (bets ? bets : null) : false}
                game={item.name === 'betslip' ? (game ? true : false) : false}
                color={focused ? "#ffa500" : colorScheme === 'dark' ? "white" : "black"}
              />
            ),
            // Added Home button reset logic using resetToHome
            tabBarButton: (props) => (
              <HapticTab
                {...props}
                onPressIn={(ev) => {
                  if (process.env.EXPO_OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }

                  // Reset P2P flow when Home tab is pressed
                  if (item.name === 'index') {
                    const { setActiveTab } = useTabStore.getState();
                    const { resetToHome } = useP2PStore.getState();

                    setActiveTab('bets');  // Switch to main Bets tab
                    resetToHome();          // Reset P2P flow to landing
                  }

                  props.onPressIn?.(ev);
                }}
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