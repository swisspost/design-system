import fetch, { Response } from 'node-fetch';
import testResult from '../../../tests/fixtures/test-result.json';
import { fetchPage } from './fetchPage';

jest.mock('node-fetch');

describe('fetchPage', () => {
  it('Should fetch a page of data', async () => {
    jest
      .mocked(fetch)
      .mockImplementationOnce(() =>
        Promise.resolve({ status: 200, json: () => Promise.resolve(testResult) } as Response),
      );
    const json = await fetchPage('test');
    const count = getCount();

    expect(count).toBeDefined();
    expect(count).toBe(10);

    function getCount() {
      if (json && !('error' in json)) {
        return json.count;
      } else {
        throw new Error('fetchPage errored in test');
      }
    }
  });

  it('Should error if the call fails', async () => {
    jest.mocked(fetch).mockImplementationOnce(() => Promise.reject('NOK'));
    const t = async () => fetchPage('test');
    await expect(t).rejects.toEqual('NOK');
  });

  it('Should error if the response is not 200', async () => {
    jest.mocked(fetch).mockImplementationOnce(() =>
      Promise.resolve({
        status: 401,
        statusText: 'unauthorized',
      } as Response),
    );
    const t = async () => fetchPage('test');
    await expect(t).rejects.toBeInstanceOf(Error);
  });
});
