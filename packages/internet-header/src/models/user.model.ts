export interface UserConfig {
  name: string;
  surname: string;
  email: string;
  company?: string;
  userType: "B2B" | "B2C";
  canChangeCompany?: boolean;
  changeUserAndProfile: 'notAvailable' | 'userAndProfile';
}
