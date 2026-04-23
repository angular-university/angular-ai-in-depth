export type UserProfile = {
  id: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: UserProfile;
};
