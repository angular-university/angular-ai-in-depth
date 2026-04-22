export interface UserProfile {
  id: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
}
