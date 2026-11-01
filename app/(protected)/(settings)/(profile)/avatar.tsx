import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Layout from "../Layout";
import { AVATARS } from "@/constants/avatars";
import { useProfileStore } from "@/store/useProfileStore";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useProfile, useSetAvatar, useUploadAvatar } from "@/hooks/useProfile";
import UserAvatar from "@/components/Reuseables/UserAvatar";
import Loading from "@/components/Reuseables/Loading";
import AlertBanner from "@/components/Reuseables/AlertBanner";

const AvatarScreen = () => {
  const router = useRouter();
  const avatarId = useProfileStore((state) => state.avatarId);
  const setAvatarId = useProfileStore((state) => state.setAvatarId);
  const [selectedId, setSelectedId] = useState(avatarId);
  const [error, setError] = useState<string | null>(null);

  const { data: profile } = useProfile();
  const { pickFromLibrary } = useImagePicker();
  const { mutateAsync: uploadAvatar, isPending: isUploading } =
    useUploadAvatar();
  const { mutateAsync: setAvatar, isPending: isSaving } = useSetAvatar();

  /* An uploaded photo is the real avatar; the SVGs are the fallback. */
  const handleUpload = async () => {
    setError(null);

    const picked = await pickFromLibrary();
    if (!picked) return;

    try {
      await uploadAvatar({
        uri: picked.uri,
        name: "avatar.jpg",
        type: picked.mimeType ?? "image/jpeg",
        size: picked.size ?? 0,
      });
      router.back();
    } catch {
      setError("Could not upload that photo. It must be under 5MB.");
    }
  };

  const handleSave = async () => {
    if (!selectedId) return;

    setAvatarId(selectedId);
    setError(null);

    try {
      /* Stored as a generated-avatar identifier so it follows the account. */
      await setAvatar(`local:${selectedId}`);
    } catch {
      setError("Saved on this device, but could not sync to your account.");
      return;
    }

    router.back();
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
      {error && <AlertBanner message={error} />}

      <SafeAreaView style={styles.container}>
        {/* Current avatar plus the upload entry point */}
        <View style={styles.uploadRow}>
          <UserAvatar
            uri={profile?.avatarUrl}
            avatarId={selectedId}
            size={64}
          />

          <TouchableOpacity
            onPress={handleUpload}
            disabled={isUploading}
            style={styles.uploadButton}
            activeOpacity={0.8}
          >
            {isUploading || isSaving ? (
              <Loading inline size={24} />
            ) : (
              <Text style={styles.uploadText}>Upload a photo</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>or pick one below</Text>

        <FlatList
          data={AVATARS}
          numColumns={4}
          keyExtractor={(item) => item.id}
          renderItem={renderAvatar}
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveButton}
            activeOpacity={0.8}
          >
            <Text style={styles.saveText}>Save</Text>
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
  uploadRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#FFA500",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    minWidth: 150,
    alignItems: "center",
  },
  uploadText: {
    color: "#FFA500",
    fontSize: 14,
    fontWeight: "600",
  },
  orText: {
    color: "#B9CBD9",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 12,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    justifyContent: "center",
    gap: 17,
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
  selectedAvatarContainer: {},
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
