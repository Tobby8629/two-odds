// store/useProfileStore.ts
import { create } from "zustand";
import { UserProfile } from "@/types/profile.types";

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProfile: (profile: UserProfile) => void;
  updateAvatar: (avatarId: string) => void;
  updateProfileField: (field: keyof UserProfile, value: any) => void;
  clearProfile: () => void;
}

// Mock profile data for development
const MOCK_PROFILE: UserProfile = {
  id: "1",
  userId: "40678902",
  firstName: "20odds",
  lastName: "20odds",
  email: "20odds@gmail.com",
  phoneNumber: "08123457890",
  address: "Lorem ipsum",
  city: "Lorem ipsum",
  state: "Lorem ipsum",
  country: "Nigeria",
  avatar: "1", // Default avatar ID
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: MOCK_PROFILE, // Start with mock data
  isLoading: false,
  error: null,

  // Set entire profile
  setProfile: (profile) => set({ profile, error: null }),

  // Update avatar (just updates local state)
  updateAvatar: (avatarId: string) =>
    set((state) =>
      state.profile
        ? { profile: { ...state.profile, avatar: avatarId } }
        : state
    ),

  // Update any profile field
  updateProfileField: (field, value) =>
    set((state) =>
      state.profile
        ? { profile: { ...state.profile, [field]: value } }
        : state
    ),

  // Clear profile (for logout)
  clearProfile: () => set({ profile: null, error: null }),
}));