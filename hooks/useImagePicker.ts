import { useCallback } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

export interface PickedImage {
  uri: string;
  base64?: string;
}

/** Keeps a base64 selfie small enough to post as JSON. */
const QUALITY = 0.6;

export const useImagePicker = () => {
  const pickFromLibrary = useCallback(
    async (withBase64 = false): Promise<PickedImage | null> => {
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
      return { uri: asset.uri, base64: asset.base64 ?? undefined };
    },
    []
  );

  const takePhoto = useCallback(
    async (withBase64 = false): Promise<PickedImage | null> => {
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
      return { uri: asset.uri, base64: asset.base64 ?? undefined };
    },
    []
  );

  return { pickFromLibrary, takePhoto };
};
