
// types/profile.types.ts

export interface UserProfile {    
   
  id: string;
  username: string;
  displayName: string,
  walletAddress: string,
  role: string,
  isPremium: boolean
  firstName: string;
  lastName: string;
  email: string;
  // phoneNumber: string;
  // address: string;
  // city: string;
  // state: string;
  // country: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Avatar {
  id: string;
  uri: string;
}
