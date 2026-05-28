import { UserProfile } from './user-profile.model';

export type SignInResponse = {
  token: string;
  user: UserProfile;
};
