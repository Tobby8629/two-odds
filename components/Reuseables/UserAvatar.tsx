import React from "react";
import { Image, View } from "react-native";
import { avatarForKey } from "@/constants/avatars";

interface UserAvatarProps {
  /** avatarUrl from the API; falls back to a local SVG when null. */
  uri?: string | null;
  /** Seeds the fallback so the same person keeps the same face. */
  fallbackKey?: string;
  size?: number;
}

const UserAvatar = ({ uri, fallbackKey, size = 40 }: UserAvatarProps) => {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
    );
  }

  const Fallback = avatarForKey(fallbackKey).component;

  return (
    <View style={{ width: size, height: size }}>
      <Fallback width={size} height={size} />
    </View>
  );
};

export default UserAvatar;
