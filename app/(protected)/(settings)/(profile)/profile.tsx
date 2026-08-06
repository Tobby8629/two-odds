import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Layout from "../Layout";
import { useProfileStore } from "@/store/useProfileStore";
import { ThemedText } from "@/components/ThemedText";
import { UserProfile } from "@/types/profile.types";
import { useProfile } from "@/hooks/useProfile";
import ProfileField from "./ProfileField";
import ProfileHeader from "./ProfileHeader";

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

  /*
   * Only the fields the backend actually returns. The design also shows
   * first/last name, phone, address, city and state, but GET /users/profile
   * has no such fields, so rendering them would only ever show blanks.
   */
  const Content = (
    <View
      className="bg-pry mx-4 mb-4 rounded-2xl mt-28"
    >
      <ProfileField label="User ID" value={profile.id} isFirst />
      <ProfileField label="Username" value={profile.username} />
      <ProfileField label="Display Name" value={profile.displayName} />
      <ProfileField label="Email" value={profile.email} />
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
  const avatarId = useProfileStore((state) => state.avatarId);

  const {
    data: profile,
    isPending,
    isError,
    refetch,
    isRefetching,
  } = useProfile();

  if (isPending) {
    return (
      <Layout header="Profile">
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#FFA500" />
        </View>
      </Layout>
    );
  }

  if (isError || !profile) {
    return (
      <Layout header="Profile">
        <View style={styles.centered}>
          <ThemedText className="text-white text-lg text-center mb-6">
            We could not load your profile.
          </ThemedText>

          <Pressable
            onPress={() => refetch()}
            disabled={isRefetching}
            className="bg-sec rounded-xl px-8 py-3"
          >
            <ThemedText className="text-white text-base font-semibold">
              {isRefetching ? "Retrying..." : "Try again"}
            </ThemedText>
          </Pressable>
        </View>
      </Layout>
    );
  }

  return (
    <Layout header="Profile">
      <View style={{ flex: 1 }}>
        {/* Sticky Header */}
        <View style={styles.stickyHeader} className="!bg-pry z-50">
          <ProfileHeader avatarId={avatarId} />
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
});
