import { uniqueId } from '../../../src/utils/utils';

describe('utils', () => {
  describe('uniqueId', () => {
    it('generates a (sequential) unique id', () => {
      expect(uniqueId()).to.equal('1');
      expect(uniqueId('prefix-')).to.equal('prefix-2');
      expect(uniqueId()).to.equal('3');
    });
  });
});
