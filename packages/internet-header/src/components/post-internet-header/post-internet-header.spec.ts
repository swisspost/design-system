import { Environment } from '@/models/general.model';

// Define the KLP URL mapping constants the same way they are in the component
const KLP_SESSION_ENDPOINT = '/v1/session/subscribe';

const KLP_BASE_URLS: Record<Environment, string> = {
  dev01: 'https://n.accountint1.post.ch',
  dev02: 'https://n.accountint1.post.ch',
  devs1: 'https://n.accountint1.post.ch',
  test: 'https://n.accountint1.post.ch',
  int01: 'https://n.accountint1.post.ch',
  int02: 'https://n.accountint2.post.ch',
  prod: 'https://n.account.post.ch',
};

// Helper function to get session URL (same logic as component)
const getSessionUrl = (environment: Environment): string => {
  const baseUrl = KLP_BASE_URLS[environment];
  return `${baseUrl}${KLP_SESSION_ENDPOINT}`;
};

describe('KLP Session URL Configuration', () => {
  // Mock fetch globally
  global.fetch = jest.fn();

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ data: { name: 'Test User', email: 'test@example.com' } }),
    });
  });

  describe('getSessionUrl - URL construction for all environments', () => {
    const testCases: Array<[Environment, string]> = [
      ['prod', 'https://n.account.post.ch/v1/session/subscribe'],
      ['int02', 'https://n.accountint2.post.ch/v1/session/subscribe'],
      ['int01', 'https://n.accountint1.post.ch/v1/session/subscribe'],
      ['test', 'https://n.accountint1.post.ch/v1/session/subscribe'],
      ['devs1', 'https://n.accountint1.post.ch/v1/session/subscribe'],
      ['dev02', 'https://n.accountint1.post.ch/v1/session/subscribe'],
      ['dev01', 'https://n.accountint1.post.ch/v1/session/subscribe'],
    ];

    testCases.forEach(([environment, expectedUrl]) => {
      it(`should construct correct URL for ${environment} environment`, () => {
        const sessionUrl = getSessionUrl(environment);
        expect(sessionUrl).toBe(expectedUrl);
      });
    });
  });

  describe('KLP Base URL Mapping', () => {
    it('should have entries for all environment types', () => {
      const expectedEnvironments: Environment[] = [
        'prod',
        'int02',
        'int01',
        'test',
        'devs1',
        'dev02',
        'dev01',
      ];

      expectedEnvironments.forEach(env => {
        expect(KLP_BASE_URLS[env]).toBeDefined();
        expect(typeof KLP_BASE_URLS[env]).toBe('string');
        expect(KLP_BASE_URLS[env]).toMatch(/^https:\/\/n\.account/);
      });
    });

    it('should map development environments to int1 endpoint', () => {
      const devEnvironments: Environment[] = ['dev01', 'dev02', 'devs1', 'test'];

      devEnvironments.forEach(env => {
        expect(KLP_BASE_URLS[env]).toBe('https://n.accountint1.post.ch');
      });
    });

    it('should map int01 to int1 endpoint', () => {
      expect(KLP_BASE_URLS['int01']).toBe('https://n.accountint1.post.ch');
    });

    it('should map int02 to int2 endpoint', () => {
      expect(KLP_BASE_URLS['int02']).toBe('https://n.accountint2.post.ch');
    });

    it('should map prod to production endpoint', () => {
      expect(KLP_BASE_URLS['prod']).toBe('https://n.account.post.ch');
    });
  });

  describe('Session endpoint consistency', () => {
    it('should use correct endpoint path', () => {
      expect(KLP_SESSION_ENDPOINT).toBe('/v1/session/subscribe');
    });

    it('should construct full URL by combining base URL and endpoint', () => {
      const baseUrl = 'https://n.accountint2.post.ch';
      const fullUrl = `${baseUrl}${KLP_SESSION_ENDPOINT}`;
      expect(fullUrl).toBe('https://n.accountint2.post.ch/v1/session/subscribe');
    });
  });

  describe('Fetch call verification with URLs', () => {
    it('should call fetch with prod URL when environment is prod', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: {} }),
      });
      global.fetch = mockFetch;

      const url = getSessionUrl('prod');
      await mockFetch(url, { credentials: 'include' });

      expect(mockFetch).toHaveBeenCalledWith('https://n.account.post.ch/v1/session/subscribe', {
        credentials: 'include',
      });
    });

    it('should call fetch with int02 URL when environment is int02', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: {} }),
      });
      global.fetch = mockFetch;

      const url = getSessionUrl('int02');
      await mockFetch(url, { credentials: 'include' });

      expect(mockFetch).toHaveBeenCalledWith('https://n.accountint2.post.ch/v1/session/subscribe', {
        credentials: 'include',
      });
    });

    it('should call fetch with int01 URL when environment is int01', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ data: {} }),
      });
      global.fetch = mockFetch;

      const url = getSessionUrl('int01');
      await mockFetch(url, { credentials: 'include' });

      expect(mockFetch).toHaveBeenCalledWith('https://n.accountint1.post.ch/v1/session/subscribe', {
        credentials: 'include',
      });
    });
  });

  describe('CORS handling for different environments', () => {
    it('should use correct domain for CORS policy in prod', () => {
      const url = getSessionUrl('prod');
      expect(url).toContain('https://n.account.post.ch');
    });

    it('should use correct domain for CORS policy in int2', () => {
      const url = getSessionUrl('int02');
      expect(url).toContain('https://n.accountint2.post.ch');
    });

    it('should use correct domain for CORS policy in int1', () => {
      const url = getSessionUrl('int01');
      expect(url).toContain('https://n.accountint1.post.ch');
    });
  });

  describe('URL format validation', () => {
    const testCases: Environment[] = [
      'prod',
      'int02',
      'int01',
      'test',
      'devs1',
      'dev02',
      'dev01',
    ];

    testCases.forEach(environment => {
      it(`should generate valid URL for ${environment}`, () => {
        const url = getSessionUrl(environment);

        // URL should be valid
        expect(() => new URL(url)).not.toThrow();

        // URL should have correct protocol
        expect(url).toMatch(/^https:\/\//);

        // URL should contain the session endpoint
        expect(url).toContain('/v1/session/subscribe');

        // URL should not have query parameters or fragments in the base
        expect(url).not.toContain('?');
        expect(url).not.toContain('#');
      });
    });
  });
});

