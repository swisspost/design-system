import testResult from '../../../tests/fixtures/test-result.json';
import { CenshareResultPage } from '../../models/censhare-result-page.model';
import { format } from './format';

describe('format', () => {
  it('Should format the result object to a meaningful data structure', () => {
    const mapped = format(testResult as unknown as CenshareResultPage);
    expect(mapped).toMatchSnapshot();
  });
});
