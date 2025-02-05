// Dotenv needs to be configured before anything else so imported modules also have access
// to the same env variables
import * as dotenv from 'dotenv';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { RequestInit } from 'node-fetch';

dotenv.config();
const user = process.env.CEN_USERNAME;
const pw = process.env.CEN_PASSWORD;
const proxy = process.env.HTTPS_PROXY;
const passphrase = Buffer.from(`${user}:${pw}`).toString('base64');

export const urls = {
  post: process.env.CEN_URL_ICONSET_POST ?? '',
  ui: process.env.CEN_URL_ICONSET_UI ?? '',
};

if (!user || !pw || (!urls.post && !urls.ui)) {
  throw new Error(
    'Environment variables are not defined. Please check your .env file and compare it to the .template.env. Are there any variables missing or undefined?',
  );
}

export const requestInit: RequestInit = {
  headers: {
    Authorization: `Basic ${passphrase}`,
  },
  agent: proxy ? new HttpsProxyAgent(proxy) : undefined,
};
