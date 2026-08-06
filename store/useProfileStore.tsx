// store/useProfileStore.tsx
import { create } from "zustand";

const DEFAULT_AVATAR_ID = "1";

/**
 * Avatar selection only. The backend has no avatar field, so the chosen
 * avatar maps to a local SVG in constants/avatars and never leaves the app.
 * Server-owned profile data lives in React Query — see hooks/useProfile.
 *
 * Note: this is in-memory, so the choice resets on app restart until a
 * persistence layer (or a backend field) exists.
 */
interface ProfileState {
  avatarId: string;
  setAvatarId: (avatarId: string) => void;
  resetAvatar: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  avatarId: DEFAULT_AVATAR_ID,

  setAvatarId: (avatarId) => set({ avatarId }),

  resetAvatar: () => set({ avatarId: DEFAULT_AVATAR_ID }),
}));
