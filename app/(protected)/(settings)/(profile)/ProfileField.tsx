import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

interface ProfileFieldProps {
  label: string;
  value: string;
  icon?: keyof typeof Ionicons.glyphMap;
  isFirst?: boolean;
  /** Rows without an onSave stay read-only, which is the default. */
  onSave?: (value: string) => Promise<unknown>;
  /** Return a message to block the save, or null when the value is fine. */
  validate?: (value: string) => string | null;
  maxLength?: number;
}

const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  value,
  icon,
  isFirst,
  onSave,
  validate,
  maxLength,
}) => {
  const isEditable = Boolean(onSave);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEditing = () => {
    if (!isEditable || isSaving) return;

    setDraft(value);
    setError(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraft(value);
    setError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!onSave) return;

    const trimmed = draft.trim();

    if (trimmed === value) {
      cancelEditing();
      return;
    }

    const validationError = validate?.(trimmed) ?? null;

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await onSave(trimmed);

      setIsEditing(false);
    } catch {
      /*
       * The message is kept generic because the backend returns 422 for both
       * a malformed value and a username that is already taken.
       */
      setError("Could not save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View
      className={`pt-8 pb-4 mx-5 ${
        !isFirst ? "border-t border-gray-400" : ""
      }`}
    >
      <Pressable
        onPress={startEditing}
        disabled={!isEditable || isEditing}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center">
          <ThemedText className="capitalize text-lg">{label}</ThemedText>
        </View>

        {isEditing ? (
          <View className="flex-row items-center flex-1 justify-end">
            <TextInput
              value={draft}
              onChangeText={setDraft}
              autoFocus
              editable={!isSaving}
              maxLength={maxLength}
              autoCapitalize="none"
              placeholderTextColor="#9A9A9A"
              onSubmitEditing={handleSave}
              className="text-base text-white flex-1 text-right px-2"
            />

            {isSaving ? (
              <ActivityIndicator color="#FFA500" className="ml-2" />
            ) : (
              <View className="flex-row items-center ml-2">
                <Pressable onPress={handleSave} hitSlop={8}>
                  <Ionicons name="checkmark" size={22} color="#FFA500" />
                </Pressable>

                <Pressable onPress={cancelEditing} hitSlop={8} className="ml-3">
                  <Ionicons name="close" size={22} color="#9A9A9A" />
                </Pressable>
              </View>
            )}
          </View>
        ) : (
          <View className="flex-row items-center">
            <ThemedText className="text-base text-white">{value}</ThemedText>

            {isEditable && (
              <Ionicons
                name="pencil"
                size={15}
                color="#FFA500"
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
        )}
      </Pressable>

      {error && (
        <ThemedText className="text-red-400 text-xs mt-2 text-right">
          {error}
        </ThemedText>
      )}
    </View>
  );
};

export default ProfileField;
