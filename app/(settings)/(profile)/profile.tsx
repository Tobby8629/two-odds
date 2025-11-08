import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Layout from "../Layout";
import { useProfileStore } from "@/store/useProfileStore";
import ProfileHeader from "@/app/(settings)/(profile)/ProfileHeader";
import ProfileField from "@/app/(settings)/(profile)/ProfileField";
import { ThemedText } from "@/components/ThemedText";

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
        <View style={styles.stickyHeader}>
          <ProfileHeader avatarId={profile.avatar} />
        </View>

        {/* Scrollable User Info */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View className="bg-pry mx-4 mb-4 rounded-2xl">
            <ProfileField label="User ID" value={profile.userId} isFirst />
            <ProfileField label="First Name" value={profile.firstName} />
            <ProfileField label="Last Name" value={profile.lastName} />
            <ProfileField label="Email" value={profile.email} />
            <ProfileField label="Phone Number" value={profile.phoneNumber} />
            <ProfileField label="Address" value={profile.address} />
            <ProfileField label="City" value={profile.city} />
            <ProfileField label="State" value={profile.state} />
            <ProfileField label="Country" value={profile.country} />
          </View>
        </ScrollView>
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
    backgroundColor: "bg-pry",
  },
  scrollContent: {
    paddingTop: 100, // Adds space under sticky header
    paddingBottom: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "bg-pry",
  },
});
