import type { IconSet } from './models/icon.model';
import path from 'path';
import { urls } from './utilities/environment';
import { SOURCE_PATH } from './utilities/constants';

export default [
  {
    name: 'post',
    apiUrl: urls.post,
    downloadDirectory: path.join(SOURCE_PATH, 'post'),
  },
  {
    name: 'ui',
    apiUrl: urls.ui,
    downloadDirectory: path.join(SOURCE_PATH, 'ui'),
  },
] as IconSet[];
