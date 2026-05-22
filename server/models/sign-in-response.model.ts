import { UserProfile } from './user-profile.model.js';

export type SignInResponse = {
  token: string;
  user: UserProfile;
};
