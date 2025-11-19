import { createStore } from '@stencil/store';
import { Environment, ILocalizedConfig, ILocalizedCustomConfig } from '../models/general.model';
import { NavMainEntity } from '../models/header.model';
import { IAvailableLanguage } from '../models/language.model';
import { StickynessOptions } from '../components';

export interface HeaderState {
  localizedConfig: ILocalizedConfig | null;
  currentLanguage: string | null;
  projectId: string | null;
  environment: Environment;
  search: boolean;
  login: boolean;
  meta: boolean;
  languageSwitchOverrides?: IAvailableLanguage[];
  localizedCustomConfig?: ILocalizedCustomConfig;
  osFlyoutOverrides?: NavMainEntity;
  stickyness: StickynessOptions;
}

export const { state, reset, dispose } = createStore<HeaderState>({
  projectId: null,
  currentLanguage: null,
  localizedConfig: null,
  environment: 'prod',
  search: true,
  login: true,
  meta: true,
  stickyness: 'minimal',
});
