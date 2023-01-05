import { fetchPage } from '.';
import testResult from './tests/fixtures/test-result.json';

describe('fetchPage', () => {
  jest.mock('node-fetch', () => Promise.resolve({ json: Promise.resolve(testResult) }));
  it('Should fetch a page of data', async () => {
    const json = await fetchPage('test');
    expect(json?.count).toBeDefined();
    expect(json?.count).toBe(10);
  });
});
