import { Environment } from '@/models/general.model';

/**
 * KLP (Swiss Post Login) session API endpoint path
 */
export const KLP_SESSION_ENDPOINT = '/v1/session/subscribe';

/**
 * KLP base URL mapping for different environments
 * Maps each environment to its corresponding KLP authentication service URL
 *
 * Environment | Base URL
 * -- | --
 * PROD | https://n.account.post.ch
 * INT2 | https://n.accountint2.post.ch
 * INT1 | https://n.accountint1.post.ch
 * dev01, dev02, devs1, test | https://n.accountint1.post.ch
 */
export const KLP_BASE_URLS: Record<Environment, string> = {
  dev01: 'https://n.accountint1.post.ch',
  dev02: 'https://n.accountint1.post.ch',
  devs1: 'https://n.accountint1.post.ch',
  test: 'https://n.accountint1.post.ch',
  int01: 'https://n.accountint1.post.ch',
  int02: 'https://n.accountint2.post.ch',
  prod: 'https://n.account.post.ch',
};

/**
 * Constructs the full session URL for a given environment
 * @param environment - The target environment
 * @returns The full KLP session subscription URL
 */
export const getSessionUrl = (environment: Environment): string => {
  const baseUrl = KLP_BASE_URLS[environment];
  return `${baseUrl}${KLP_SESSION_ENDPOINT}`;
};
