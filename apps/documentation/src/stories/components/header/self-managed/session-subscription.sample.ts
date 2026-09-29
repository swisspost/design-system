const KLP_SESSION_ENDPOINT = '/v1/session/subscribe';
const KLP_BASE_URLS = {
  dev01: 'https://n.accountint1.post.ch',
  dev02: 'https://n.accountint1.post.ch',
  devs1: 'https://n.accountint1.post.ch',
  test: 'https://n.accountint1.post.ch',
  int01: 'https://n.accountint1.post.ch',
  int02: 'https://n.accountint2.post.ch',
  prod: 'https://n.account.post.ch',
} as const;

const getSessionUrl = (environment: keyof typeof KLP_BASE_URLS): string =>
  `${KLP_BASE_URLS[environment]}${KLP_SESSION_ENDPOINT}`;

// Get the appropriate URL based on your environment
const environment = 'prod'; // Change to your environment (int01, int02, etc.)
const sessionUrl = getSessionUrl(environment);

const response = await fetch(sessionUrl, {
  credentials: 'include',
});
const json = await response.json();
const user = json?.data; // { name, surname, email, ... }
