import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import Head from '@/components/Home/Head';
import P2PLandingButton from '@/components/P2P/P2PLandingButton';
import { useP2PStore } from '@/store/useP2PStore';
import { useTabStore } from '@/store/useTabStore';
import P2PToggle from './P2PToggle';
import SmallLogo from '@/assets/SVGs/SmallLogo';
import { useProfileStore } from '@/store/useProfileStore';
import { AVATARS } from '@/constants/avatars';

export default function P2PLanding() {
    const { setScreen } = useP2PStore();
    const { activeTab, setActiveTab } = useTabStore();
    const { profile } = useProfileStore();

    // Always use selected avatar, or default to first in AVATARS
    const selectedAvatar =
        AVATARS.find((item) => item.id === profile?.avatar) || AVATARS[0];
    const AvatarComponent = selectedAvatar.component;

    const handleFindPlayers = () => {
        setScreen('searching');
    };

    const handleLearnMore = () => {
        console.log('Learn More pressed');
    };

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingVertical: 52 }}
            className="bg-[#123456]"
            showsVerticalScrollIndicator={false}
        >
            <P2PToggle active={activeTab} onChange={setActiveTab} />
            <Head />

            <View className="items-center justify-center px-6 mb-8 mt-8">
                <SmallLogo width={75} height={75} />

                <Text className="text-white text-lg text-center mt-8 mb-2">
                    Player To Player Bets
                </Text>

                <Text className="text-white text-3xl text-center mb-8">
                    Connect. Bet. Win.
                </Text>

                {/* Centered Avatar */}
                <View className="items-center justify-center">
                    <AvatarComponent width={75} height={75} />
                </View>

                <Text className="text-white/80 mt-4 text-center text-base leading-7 px-4 mb-8">
                    Connect with other players, set your stakes, and place bets directly with each other.
                </Text>

                <View className="flex-row justify-center items-center mb-10 space-x-4">
                    <P2PLandingButton text="Enter Lobby" onPress={handleFindPlayers} />
                    <P2PLandingButton text="Learn More" onPress={handleLearnMore} showArrow />
                </View>

                <Text className="text-white font-normal text-2xl text-center mt-6">
                    Why Choose 2Odds P2P?
                </Text>
            </View>
        </ScrollView>
    );
}
