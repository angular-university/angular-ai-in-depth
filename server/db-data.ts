export type User = {
  id: string;
  email: string;
  passwordHash: string;
};

// In-memory user store — populated on server startup
export const users: User[] = [];
