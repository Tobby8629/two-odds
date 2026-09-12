// types/profile.types.ts

export type { ApiResponse } from "./api.types";

/** Shape returned by GET /users/profile. Nullable fields are unset, not missing. */
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  dateOfBirth?: string | null;
  /** null until set via POST /users/profile/avatar. */
  avatarUrl?: string | null;
  walletAddress?: string;
  role?: string;
  isPremium?: boolean;
  wins?: number;
  losses?: number;
  /** wins / (wins + losses), 0 with no settled bets. */
  winRate?: number;
}

/** Non-sensitive fields from GET /users/{id}, used for bet counterparties. */
export interface PublicProfile {
  id: string;
  username: string;
  displayName?: string | null;
  avatarUrl?: string | null;
  wins?: number;
  losses?: number;
  winRate?: number;
}

/** Everything PATCH /users/profile accepts. */
export interface UpdateProfileInput {
  displayName?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  /** ISO date, e.g. 1995-06-14. */
  dateOfBirth?: string;
}

/** Local file handed to the multipart avatar upload. */
export interface AvatarUpload {
  uri: string;
  name?: string;
  type?: string;
}

export interface Avatar {
  id: string;
  uri: string;
}
