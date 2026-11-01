import { useCallback } from "react";
import { Alert } from "react-native";

/*
 * Loaded defensively so the app still runs on a dev client built before
 * expo-image-picker was added. Remove the guard once everyone has rebuilt.
 */
let ImagePicker: typeof import("expo-image-picker") | null = null;

try {
  ImagePicker = require("expo-image-picker");
} catch {
  ImagePicker = null;
}

export interface PickedImage {
  uri: string;
  base64?: string;
  size?: number;
  mimeType?: string;
}

/** Keeps a base64 selfie small enough to post as JSON. */
const QUALITY = 0.6;

const warnMissing = () =>
  Alert.alert(
    "Rebuild required",
    "Photo uploads need a new build of the app. Run: npx expo install expo-image-picker, then rebuild the dev client."
  );

export const useImagePicker = () => {
  const pickFromLibrary = useCallback(
    async (withBase64 = false): Promise<PickedImage | null> => {
      if (!ImagePicker) {
        warnMissing();
        return null;
      }

      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission needed",
          "Allow photo access to upload your document."
        );
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: QUALITY,
        base64: withBase64,
      });

      if (result.canceled || !result.assets?.length) return null;

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        base64: asset.base64 ?? undefined,
        size: asset.fileSize ?? undefined,
        mimeType: asset.mimeType ?? undefined,
      };
    },
    []
  );

  const takePhoto = useCallback(
    async (withBase64 = false): Promise<PickedImage | null> => {
      if (!ImagePicker) {
        warnMissing();
        return null;
      }

      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permission needed",
          "Allow camera access to take your selfie."
        );
        return null;
      }

      const result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        quality: QUALITY,
        base64: withBase64,
      });

      if (result.canceled || !result.assets?.length) return null;

      const asset = result.assets[0];
      return {
        uri: asset.uri,
        base64: asset.base64 ?? undefined,
        size: asset.fileSize ?? undefined,
        mimeType: asset.mimeType ?? undefined,
      };
    },
    []
  );

  return { pickFromLibrary, takePhoto };
};
