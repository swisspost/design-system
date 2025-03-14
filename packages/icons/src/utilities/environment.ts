// Dotenv needs to be configured before anything else so imported modules also have access
// to the same env variables
import * as dotenv from 'dotenv';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { RequestInit } from 'node-fetch';
import { MESSAGE_ENV_VARS_MISSING_ERROR } from './constants';

dotenv.config();
const user = process.env.CEN_USERNAME;
const pw = process.env.CEN_PASSWORD;
const proxy = process.env.HTTPS_PROXY;
const passphrase = Buffer.from(`${user}:${pw}`).toString('base64');

export const urls = {
  post: process.env.CEN_URL_ICONSET_POST ?? '',
  ui: process.env.CEN_URL_ICONSET_UI ?? '',
};

export const requestInit: RequestInit = {
  headers: {
    Authorization: `Basic ${passphrase}`,
  },
  agent: proxy ? new HttpsProxyAgent(proxy) : undefined,
};

export function checkEnvVarsExist(): boolean {
  if (!user || !pw || Object.values(urls).some(v => !v)) {
    throw new Error(MESSAGE_ENV_VARS_MISSING_ERROR);
  }

  return true;
}
