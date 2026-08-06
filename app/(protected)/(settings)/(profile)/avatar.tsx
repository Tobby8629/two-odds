import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Layout from "../Layout"; // Layout import
import { AVATARS } from "@/constants/avatars";
import { useProfileStore } from "@/store/useProfileStore";

const AvatarScreen = () => {
  const router = useRouter();
  const { profile, updateAvatar } = useProfileStore();
  const [selectedId, setSelectedId] = useState(profile?.avatar || "1");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!selectedId || loading) return;
    try {
      setLoading(true);
      await updateAvatar(selectedId);
      router.back();
    } catch (error) {
      console.error("Failed to update avatar:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderAvatar = ({ item }: any) => {
    const isSelected = selectedId === item.id;
    const AvatarComponent = item.component;

    return (
      <TouchableOpacity
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.8}
        style={[styles.avatarContainer, isSelected && styles.selectedAvatarContainer]}
      >
        <View style={[styles.avatarBackground]}>
          <AvatarComponent width={75} height={75} />
        </View>
        {isSelected && <View style={styles.yellowBorder} />}
      </TouchableOpacity>
    );
  };

  return (
    <Layout header="Select Avatar">
      <SafeAreaView style={styles.container}>
        {/* Avatar Grid */}
        <FlatList
          data={AVATARS}
          numColumns={4}
          keyExtractor={(item) => item.id}
          renderItem={renderAvatar}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        />

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.saveButton, loading && { opacity: 0.6 }]}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default AvatarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "bg-pry",
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    justifyContent: "center",
    gap: 17, // horizontal gap between avatars
  },
  avatarContainer: {
    width: 75,
    height: 75,
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBackground: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedAvatarContainer: {
    // yellow border handled separately
  },
  yellowBorder: {
    position: "absolute",
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 3,
    borderColor: "#FFA500",
  },
  footer: {
    marginTop: -8,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: "#FFA500",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
