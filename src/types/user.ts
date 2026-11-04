export interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
}

/** Stored when the demo user signs in. Signing out removes it; progress stays. */
export interface DemoSession {
  userId: string;
  signedInAt: string;
}
