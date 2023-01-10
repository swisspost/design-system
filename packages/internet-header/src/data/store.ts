import { createStore } from '@stencil/store';
import { Environment, ILocalizedConfig, ILocalizedCustomConfig } from '../models/general.model';
import { NavMainEntity } from '../models/header.model';
import { IAvailableLanguage } from '../models/language.model';

export interface HeaderState {
  localizedConfig: ILocalizedConfig;
  currentLanguage: string;
  projectId: string;
  environment: Environment;
  search: boolean;
  login: boolean;
  meta: boolean;
  languageSwitchOverrides: IAvailableLanguage[];
  localizedCustomConfig: ILocalizedCustomConfig;
  osFlyoutOverrides: NavMainEntity;
}

export const { state, reset, dispose } = createStore<HeaderState>({
  projectId: null,
  currentLanguage: null,
  localizedConfig: null,
  environment: null,
  search: true,
  login: true,
  meta: true,
  languageSwitchOverrides: null,
  localizedCustomConfig: null,
  osFlyoutOverrides: null,
});
