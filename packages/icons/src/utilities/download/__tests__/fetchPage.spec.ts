import testResult from '../../../../tests/fixtures/test-result.json';
import { Response } from 'undici';
import { fetchPage } from './../fetchPage';
import { fetch } from '../../fetch';

jest.mock('../../fetch');

describe('fetchPage', () => {
  it('Should fetch a page of data', async () => {
    jest
      .mocked(fetch)
      .mockResolvedValueOnce(new Response(JSON.stringify(testResult), { status: 200 }));
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
    jest.mocked(fetch).mockRejectedValueOnce('NOK');
    const t = async () => fetchPage('test');
    await expect(t).rejects.toEqual('NOK');
  });

  it('Should error if the response is not 200', async () => {
    jest
      .mocked(fetch)
      .mockResolvedValueOnce(new Response(null, { status: 401, statusText: 'unauthorized' }));
    const t = async () => fetchPage('test');
    await expect(t).rejects.toBeInstanceOf(Error);
  });
});
