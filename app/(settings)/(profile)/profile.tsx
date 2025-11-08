import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../Layout";
import { useProfileStore } from "@/store/useProfileStore";
import ProfileHeader from "@/app/(settings)/(profile)/ProfileHeader";
import ProfileField from "@/app/(settings)/(profile)/ProfileField";
import { ThemedText } from "@/components/ThemedText";
import { UserProfile } from "@/types/profile.types";

interface PROFILE {
  profile: UserProfile;
}

export function ProfileSection({ profile }: PROFILE) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();

  // Recalculate scrollability on mount and whenever contentHeight or screenHeight changes
  useEffect(() => {
    setIsScrollable(contentHeight > screenHeight - 200);
  }, [contentHeight, screenHeight]);

  const handleContentSizeChange = (contentWidth: number, height: number) => {
    setContentHeight(height);
  };
  const Content = (
    <View
      className="bg-pry mx-4 mb-4 rounded-2xl mt-28"
    >
      <ProfileField label="User ID" value={profile.userId} isFirst />
      <ProfileField label="First Name" value={profile.firstName} />
      <ProfileField label="Last Name" value={profile.lastName} />
      <ProfileField label="Email" value={profile.email} />
      <ProfileField label="Phone Number" value={profile.phoneNumber} />
      <ProfileField label="Address" value={profile.address} />
      <ProfileField label="City" value={profile.city} />
      <ProfileField label="State" value={profile.state} />
    </View>
  );

  return isScrollable ? (
    <ScrollView
      onContentSizeChange={handleContentSizeChange}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20, }}
    >
      {Content}
    </ScrollView>
  ) : (
    <View
      onLayout={(e) => {
        const { height } = e.nativeEvent.layout;
        setContentHeight(height);
      }}
    >
      {Content}
    </View>
  );
}

export default function MyProfileScreen() {
  const { profile } = useProfileStore();

  if (!profile) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <ThemedText className="text-white text-lg">
          No profile data available
        </ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <Layout header="Profile">
      <View style={{ flex: 1 }}>
        {/* Sticky Header */}
        <View style={styles.stickyHeader} className="!bg-pry z-50">
          <ProfileHeader avatarId={profile.avatar} />
        </View>

        <ProfileSection profile={profile} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "bg-pry",
  },
});
