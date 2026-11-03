import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from "react-native";
import Layout from "../Layout";
import { useProfileStore } from "@/store/useProfileStore";
import { ThemedText } from "@/components/ThemedText";
import { UserProfile } from "@/types/profile.types";
import { useProfile, useUpdateProfile } from "@/hooks/useProfile";
import ProfileField from "./ProfileField";
import ProfileHeader from "./ProfileHeader";
import Loading from "@/components/Reuseables/Loading";

interface PROFILE {
  profile: UserProfile;
}

/* Limits mirror PATCH /users/profile so a bad value costs no round trip. */
const maxLen = (value: string, limit: number, label: string) =>
  value.length > limit ? `${label} must be ${limit} characters or fewer.` : null;

const validateUsername = (value: string): string | null => {
  if (value.length < 3) return "Username must be at least 3 characters.";
  return maxLen(value, 30, "Username");
};

const validateDisplayName = (value: string): string | null => {
  if (value.length === 0) return "Display name cannot be empty.";
  return maxLen(value, 50, "Display name");
};

export function ProfileSection({ profile }: PROFILE) {
  const [isScrollable, setIsScrollable] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const { height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    setIsScrollable(contentHeight > screenHeight - 200);
  }, [contentHeight, screenHeight]);

  const handleContentSizeChange = (contentWidth: number, height: number) => {
    setContentHeight(height);
  };

  const { mutateAsync: updateProfile } = useUpdateProfile();

  const Content = (
    <View className="bg-pry mx-4 mb-4 rounded-2xl mt-28">
      <ProfileField label="User ID" value={profile.id} isFirst />

      <ProfileField
        label="Username"
        value={profile.username}
        onSave={(username) => updateProfile({ username })}
        validate={validateUsername}
        maxLength={30}
      />

      <ProfileField
        label="Display Name"
        value={profile.displayName}
        onSave={(displayName) => updateProfile({ displayName })}
        validate={validateDisplayName}
        maxLength={50}
      />

      <ProfileField
        label="First Name"
        value={profile.firstName ?? ""}
        onSave={(firstName) => updateProfile({ firstName })}
        validate={(v) => maxLen(v, 50, "First name")}
        maxLength={50}
      />

      <ProfileField
        label="Last Name"
        value={profile.lastName ?? ""}
        onSave={(lastName) => updateProfile({ lastName })}
        validate={(v) => maxLen(v, 50, "Last name")}
        maxLength={50}
      />

      <ProfileField label="Email" value={profile.email} />

      <ProfileField
        label="Phone Number"
        value={profile.phone ?? ""}
        onSave={(phone) => updateProfile({ phone })}
        validate={(v) => maxLen(v, 20, "Phone number")}
        maxLength={20}
      />

      <ProfileField
        label="Address"
        value={profile.address ?? ""}
        onSave={(address) => updateProfile({ address })}
        validate={(v) => maxLen(v, 200, "Address")}
        maxLength={200}
      />

      <ProfileField
        label="City"
        value={profile.city ?? ""}
        onSave={(city) => updateProfile({ city })}
        validate={(v) => maxLen(v, 100, "City")}
        maxLength={100}
      />

      <ProfileField
        label="State"
        value={profile.state ?? ""}
        onSave={(state) => updateProfile({ state })}
        validate={(v) => maxLen(v, 100, "State")}
        maxLength={100}
      />
    </View>
  );

  return isScrollable ? (
    <ScrollView
      onContentSizeChange={handleContentSizeChange}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
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
          <Loading inline size={72} />
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
        <View style={styles.stickyHeader} className="!bg-pry z-50">
          <ProfileHeader avatarId={avatarId} avatarUrl={profile.avatarUrl} />
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
