// Dotenv needs to be configured before anything else so imported modules also have access
// to the same env variables
import * as dotenv from 'dotenv';
import { EnvHttpProxyAgent, setGlobalDispatcher, type RequestInit } from 'undici';
import { MESSAGE_ENV_VARS_MISSING_ERROR } from './constants';

dotenv.config();
const user = process.env.CEN_USERNAME;
const pw = process.env.CEN_PASSWORD;
const passphrase = Buffer.from(`${user}:${pw}`).toString('base64');

export const urls = {
  post: process.env.CEN_URL_ICONSET_POST ?? '',
  ui: process.env.CEN_URL_ICONSET_UI ?? '',
};

export const requestInit: RequestInit = {
  headers: {
    Authorization: `Basic ${passphrase}`,
  },
};

export function setupProxy(): void {
  const hasProxy = ['HTTP_PROXY', 'HTTPS_PROXY', 'http_proxy', 'https_proxy'].some(
    key => process.env[key],
  );

  if (hasProxy) {
    setGlobalDispatcher(new EnvHttpProxyAgent());
  }
}

export function checkEnvVarsExist(): boolean {
  if (!user || !pw || Object.values(urls).some(v => !v)) {
    throw new Error(MESSAGE_ENV_VARS_MISSING_ERROR);
  }

  return true;
}
