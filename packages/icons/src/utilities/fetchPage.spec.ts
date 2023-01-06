import { mocked } from 'ts-jest/utils';
import fetch, { Response } from 'node-fetch';
import testResult from '../../tests/fixtures/test-result.json';
import { fetchPage } from './fetchPage';

jest.mock('node-fetch');

describe('fetchPage', () => {
  it('Should fetch a page of data', async () => {
    mocked(fetch).mockImplementationOnce(() =>
      Promise.resolve({ json: () => Promise.resolve(testResult) } as Response),
    );
    const json = await fetchPage('test');
    expect(json?.count).toBeDefined();
    expect(json?.count).toBe(10);
  });

  it('Should return undefined if the call fails', async () => {
    mocked(fetch).mockImplementationOnce(() => Promise.reject('NOK'));
    const json = await fetchPage('test');
    // TODO: check if error was logged correctly
    expect(json).toBe(undefined);
  });
});
