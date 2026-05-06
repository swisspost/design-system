import { Environment, LocalizedConfig } from '@/models/general.model';
import { SimpleLinkConfig } from '@/models/shared.model';
import { createStore } from '@stencil/store';

export interface HeaderState {
  localizedConfig: LocalizedConfig | null;
  currentLanguage: string | null;
  projectId: string | null;
  environment: Environment;
  activeLink: SimpleLinkConfig | null;
  search: boolean;
  login: boolean;
}

export const { state, onChange, reset, dispose } = createStore<HeaderState>({
  projectId: null,
  currentLanguage: null,
  localizedConfig: null,
  environment: 'prod',
  activeLink: null,
  search: true,
  login: true,
});
