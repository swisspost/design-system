import { HttpsProxyAgent } from 'https-proxy-agent';
import { RequestInit } from 'node-fetch';

const user = process.env.CEN_USERNAME;
const pw = process.env.CEN_PASSWORD;
const proxy = process.env.HTTPS_PROXY;
const passphrase = Buffer.from(`${user}:${pw}`).toString('base64');

export const getRequestInit = () => {
  const request: RequestInit = {
    headers: {
      Authorization: `Basic ${passphrase}`,
    },
  };

  console.log('proxy', proxy);
  if (proxy) {
    request.agent = new HttpsProxyAgent(proxy);
  }

  return request;
};
