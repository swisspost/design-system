import { Environment, LocalizedConfig } from '@/models/general.model';
import { RouteLink } from '@/models/shared.model';
import { UserConfig } from '@/models/user.model';
import { createStore } from '@stencil/store';

export interface HeaderState {
  localizedConfig: LocalizedConfig | null;
  currentLanguage: string | null;
  projectId: string | null;
  environment: Environment;
  activeLink: RouteLink | null;
  search: boolean;
  user: UserConfig | null;
}

export const { state, onChange, reset, dispose } = createStore<HeaderState>({
  projectId: null,
  currentLanguage: null,
  localizedConfig: null,
  environment: 'prod',
  activeLink: null,
  search: true,
  user: null,
});
