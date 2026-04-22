import { createStore } from '@stencil/store';
import { Environment, LocalizedConfig } from '@/models/general.model';

export interface HeaderState {
  localizedConfig: LocalizedConfig | null;
  currentLanguage: string | null;
  projectId: string | null;
  environment: Environment;
  search: boolean;
  login: boolean;
}

export const { state, onChange, reset, dispose } = createStore<HeaderState>({
  projectId: null,
  currentLanguage: null,
  localizedConfig: null,
  environment: 'prod',
  search: true,
  login: true,
});
