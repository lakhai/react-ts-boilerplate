import { UserInfo, Goal } from "./core";

export interface AuthReducer {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  userInfo: UserInfo | null;
}

export interface GoalsReducer {
  isLoading: boolean;
  goals: Goal[];
}

export interface AppStore {
  auth: AuthReducer;
  goals: GoalsReducer;
}