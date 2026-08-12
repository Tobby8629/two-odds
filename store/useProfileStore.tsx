// store/useProfileStore.ts
import { create } from "zustand";
import { UserProfile } from "@/types/profile.types";
import { getRequest, patchRequest, putRequest } from "@/components/api/Axois";
import { Utensils } from "lucide-react-native";

interface ProfileResponse {
  data: UserProfile;
  success: boolean;
}

interface ProfileState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setProfile: () => void;
  updateAvatar: (avatarId: string) => void;
  updateProfileField: (field: keyof UserProfile, value: any) => void;
  clearProfile: () => void;
}
  
export const useProfileStore = create<ProfileState>((set) => ({
  profile: null, // Start with no profile
  isLoading: false,
  error: null,


  // Set entire profile
  setProfile: async () => {
    const fetchProfile = () => getRequest("/users/profile");
    try {
      set({ isLoading: true, error: null });
      const profile = (await fetchProfile()).data as ProfileResponse;
      set({ profile: profile?.data as UserProfile, error: null })
    } catch (error) {
      set({ error: "Failed to fetch profile" });
    } finally {
      set({ isLoading: false });
    }
  },

  // Update avatar (just updates local state)
  updateAvatar: (avatarId: string) =>
    set((state) =>
      state.profile
        ? { profile: { ...state.profile, avatar: avatarId } }
        : state
    ),

  // Update any profile field
  updateProfileField: async (field, value) => {
    try {
      set({isLoading: true, error: null})
      const profileUpdate = await patchRequest("/users/profile", {[field]: value})
    set((state) =>
      state.profile
        ? { profile: { ...state.profile, [field]: value } }
        : state )}
        catch {

        }
    },
  


  // Clear profile (for logout)
  clearProfile: () => set({ profile: null, error: null }),
}));