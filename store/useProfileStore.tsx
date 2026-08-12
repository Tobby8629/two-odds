// store/useProfileStore.tsx
import { create } from "zustand";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";
import * as SecureStore from "expo-secure-store";

const DEFAULT_AVATAR_ID = "1";
const STORAGE_KEY = "profile_avatar";

/**
 * Persisted through expo-secure-store, which the project already depends on
 * for tokens. An avatar id is not a secret, but reusing it avoids pulling in
 * AsyncStorage purely to hold one short string.
 */
const secureStorage = createJSONStorage(() => ({
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
}));

/**
 * Avatar selection only. The backend has no avatar field, so the chosen
 * avatar maps to a local SVG in constants/avatars and never leaves the device.
 * Server-owned profile data lives in React Query — see hooks/useProfile.
 */
interface ProfileState {
  avatarId: string;
  setAvatarId: (avatarId: string) => void;
  resetAvatar: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      avatarId: DEFAULT_AVATAR_ID,

      setAvatarId: (avatarId) => set({ avatarId }),

      resetAvatar: () => set({ avatarId: DEFAULT_AVATAR_ID }),
    }),
    {
      name: STORAGE_KEY,
      storage: secureStorage,
      partialize: (state) => ({ avatarId: state.avatarId }),
    }
  )
);
