import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Star } from 'lucide-react-native';
import { useP2PStore } from '@/store/useP2PStore';

interface P2PBetCardProps {
  bet: {
    id: string;
    playerName: string;
    playerAvatarImage?: any;
    rating?: number;
    successRate: string;
    totalBets: string;
    preferredBets: string;
    responseTime: string;
    status: 'available' | 'accepted' | 'completed';
  };
}

export default function P2PBetCard({ bet }: P2PBetCardProps) {
  const updateBetStatus = useP2PStore((state) => state.updateBetStatus);

  const handlePress = () => {
    if (bet.status === 'available') {
      updateBetStatus(bet.id, 'accepted');
    } else if (bet.status === 'accepted') {
      updateBetStatus(bet.id, 'completed');
    }
  };

  const getButtonLabel = () => {
    switch (bet.status) {
      case 'available':
        return 'Connect';
      case 'accepted':
        return 'Start Bet';
      case 'completed':
        return 'Completed';
      default:
        return 'Connect';
    }
  };

  const getButtonColor = () => {
    switch (bet.status) {
      case 'available':
        return '#E59A0B';
      case 'accepted':
        return '#E59A0B';
      case 'completed':
        return '#9E9E9E'; // greyed out
      default:
        return '#E59A0B';
    }
  };

  return (
    <View
      className="bg-[#E3F2FD] w-[330px] h-[206px] max-w-[360px] rounded-2xl shadow-md p-4 mb-4"
      style={{
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Image
            source={bet.playerAvatarImage || require('@/assets/images/user.png')}
            className="w-10 h-10 rounded-full border-2 border-black mr-2"
          />
          <View>
            <Text className="font-semibold text-[#000000] text-base">
              {bet.playerName}
            </Text>
            <View className="flex-row items-center">
              <Star size={14} color="#FFC107" fill="#FFC107" />
              <Text className="ml-1 text-xs text-[#000000]">
                {bet.rating || '4.5'}
              </Text>
            </View>
          </View>
        </View>

        {/* Status Badge */}
        <View
          className="px-3 py-1 rounded-full"
          style={{
            backgroundColor:
              bet.status === 'completed'
                ? '#9E9E9E'
                : bet.status === 'accepted'
                ? '#E59A0B'
                : '#E59A0B',
          }}
        >
          <Text className="text-[#FFFFFF] text-xs font-medium">
            {bet.status === 'completed'
              ? 'Completed'
              : bet.status === 'accepted'
              ? 'Active'
              : 'Online'}
          </Text>
        </View>
      </View>

      {/* Metrics Grid */}
      <View className="flex-row justify-between flex-wrap mb-4">
        <View className="w-[48%] mb-2">
          <Text className="text-xs [#959595]-500">Success Rate</Text>
          <Text className="text-[#00000]">{bet.successRate}</Text>
        </View>
        <View className="w-[48%] mb-2">
          <Text className="text-xs [#959595]-500">Total Bets</Text>
          <Text className="text-[#00000]">{bet.totalBets}</Text>
        </View>
        <View className="w-[48%] mb-2">
          <Text className="text-xs [#959595]-500">Preferred Bets</Text>
          <Text className="text-[#00000]">
            {bet.preferredBets}
          </Text>
        </View>
        <View className="w-[48%] mb-2">
          <Text className="text-xs [#959595]-500">Response Time</Text>
          <Text className="text-[#00000]">
            {bet.responseTime}
          </Text>
        </View>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        onPress={handlePress}
        disabled={bet.status === 'completed'}
        style={{
          backgroundColor: getButtonColor(),
          opacity: bet.status === 'completed' ? 0.6 : 1,
          borderRadius: 12,
          paddingVertical: 12,
          alignItems: 'center',
        }}
      >
        <Text className="text-[#FFFFFF] font-semibold text-base">
          {getButtonLabel()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
