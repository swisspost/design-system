import { V45Checks, V910Checks } from '../types';
import { setLocaleStorage } from './persist.util';

export function _updatePersistedState(key: string, state: V45Checks | V910Checks) {
  setLocaleStorage(key, state);
}

function _toggleStateProperty(path: string, state: V45Checks | V910Checks) {
  const keys = path.split('.');
  const last_key = keys.pop();
  if (last_key) {
    const last_obj = keys.reduce((o, k) => o[k], state);
    last_obj[last_key] = !last_obj[last_key];
  }
}

export function _updateOnChange(
  event: Event & {
    target: HTMLInputElement;
  },
  key: string,
  state: V45Checks | V910Checks,
) {
  _toggleStateProperty(event.target.id, state);
  _updatePersistedState(key, state);
}
