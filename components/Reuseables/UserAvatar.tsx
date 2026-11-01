import React from "react";
import { Image, View } from "react-native";
import { avatarById, avatarForKey } from "@/constants/avatars";

interface UserAvatarProps {
  /** avatarUrl from the API; falls back to a local SVG when null. */
  uri?: string | null;
  /** An exact avatar id ("1".."16"), looked up directly. */
  avatarId?: string;
  /** An arbitrary key (a bet or user id) hashed to a stable avatar. */
  fallbackKey?: string;
  size?: number;
}

const UserAvatar = ({
  uri,
  avatarId,
  fallbackKey,
  size = 40,
}: UserAvatarProps) => {
  /* The API stores a locally chosen SVG as "local:<id>", not a real URL. */
  const localId = uri?.startsWith("local:") ? uri.slice(6) : undefined;

  if (uri && !localId) {
    return (
      <Image
        source={{ uri }}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
    );
  }

  const Fallback = localId
    ? avatarById(localId).component
    : avatarId
    ? avatarById(avatarId).component
    : avatarForKey(fallbackKey).component;

  return (
    <View style={{ width: size, height: size }}>
      <Fallback width={size} height={size} />
    </View>
  );
};

export default UserAvatar;
