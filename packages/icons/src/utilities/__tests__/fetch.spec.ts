import { fetch } from '../fetch';

describe('fetch', () => {
  it('loads node-fetch through a native dynamic import', async () => {
    const response = await fetch('data:text/plain,node-fetch-v3');

    await expect(response.text()).resolves.toBe('node-fetch-v3');
  });
});
