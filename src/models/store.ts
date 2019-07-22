import { UserInfo } from "./core";

export interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthReducer {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  userInfo: UserInfo | null;
}

export interface AppStore {
  auth: AuthReducer;
}