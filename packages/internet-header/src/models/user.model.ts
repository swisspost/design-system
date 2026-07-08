export interface UserConfig {
  name: string;
  surname: string;
  email: string;
  company?: string;
  userType: string;
  canChangeCompany?: boolean;
  changeUserAndProfile: 'notAvailable' | 'profile' | 'userAndProfile';
}
