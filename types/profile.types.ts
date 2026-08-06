// types/profile.types.ts

export type { ApiResponse } from "./api.types";

/**
 * Shape returned by GET /users/profile.
 *
 * The design also calls for first/last name, phone, address, city and state,
 * but the backend does not store or return any of them, so they are not
 * modelled here and the profile screen does not render them.
 */
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  walletAddress?: string;
  role?: string;
  isPremium?: boolean;
}

/**
 * The only fields PATCH /users/profile accepts.
 */
export interface UpdateProfileInput {
  displayName?: string;
  username?: string;
}

export interface Avatar {
  id: string;
  uri: string;
}
