import { Environment, LocalizedConfig } from '@/models/general.model';
import { RouteLink } from '@/models/shared.model';
import { UserConfig } from '@/models/user.model';
import { createStore, ObservableMap } from '@stencil/store';

export interface HeaderState {
  localizedConfig: LocalizedConfig | null;
  currentLanguage: string | null;
  projectId: string | null;
  environment: Environment;
  activeLink: RouteLink | null;
  search: boolean;
  user: UserConfig | null;
  alternateLinks: Map<string, string>;
}

const store = createStore<HeaderState>({
  projectId: null,
  currentLanguage: null,
  localizedConfig: null,
  environment: 'prod',
  activeLink: null,
  search: true,
  user: null,
  alternateLinks: new Map<string, string>(),
});

export const state: HeaderState = store.state;
export const onChange: ObservableMap<HeaderState>['onChange'] = store.onChange;
export const reset: ObservableMap<HeaderState>['reset'] = store.reset;
export const dispose: ObservableMap<HeaderState>['dispose'] = store.dispose;
