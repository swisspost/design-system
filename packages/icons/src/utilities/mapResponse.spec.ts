import testResult from '../../tests/fixtures/test-result.json';
import { CenshareResultPage } from '../models/censhare-result-page.model';
import { mapResponse } from './mapResponse';

describe('mapResponse', () => {
  it('Should map the result object to a meaningful data structure', () => {
    const mapped = mapResponse(testResult as CenshareResultPage);
    expect(mapped).toMatchSnapshot();
  });
});
