import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AVATARS } from "@/constants/avatars";
import { useRouter } from "expo-router";

interface ProfileHeaderProps {
  avatarId: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ avatarId }) => {
  const router = useRouter();
  const avatar = AVATARS.find((a) => a.id === avatarId) || AVATARS[0];
  const AvatarComponent = avatar.component;

  // Navigate to Avatar Screen
  const handleChangeAvatar = () => {
    router.push("/(settings)/(profile)/avatar");
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Avatar */}
        <View style={styles.avatarWrapper}>
          <AvatarComponent width={80} height={80} />
        </View>

        {/* Change Avatar Button */}
        <TouchableOpacity
          onPress={handleChangeAvatar}
          style={styles.changeButton}
          activeOpacity={0.7}
        >
          <Text style={[styles.changeText, { marginRight: 15 }]}>Change Avatar</Text>
<Ionicons name="chevron-forward" size={18} color="#DFDFDF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "bg-pry",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  changeText: {
    color: "#FFA500",
    fontWeight: "400",
    fontSize: 18,
    marginRight: 4,
  },
});
