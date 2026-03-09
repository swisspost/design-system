import { createStore } from '@stencil/store';
import { Environment, ILocalizedConfig, ILocalizedCustomConfig } from '@/models/general.model';

export interface HeaderState {
  localizedConfig: ILocalizedConfig | null;
  currentLanguage: string | null;
  projectId: string | null;
  environment: Environment;
  search: boolean;
  login: boolean;
  localizedCustomConfig?: ILocalizedCustomConfig;
}

export const { state, reset, dispose } = createStore<HeaderState>({
  projectId: null,
  currentLanguage: null,
  localizedConfig: null,
  environment: 'prod',
  search: true,
  login: true,
});
