export type OrNull<T> = T | null;

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  permissions: number[];
}

export interface Goal {
  id: string;
  description: string;
  reason?: string;
  user: string;
}