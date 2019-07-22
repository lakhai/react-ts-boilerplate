export interface UserInfo {
  name: string;
  cafes: string[];
  email: string;
  permissions: number[];
  profilePhoto: string;
  currentProfile?: { cafe: string, store: string };
}