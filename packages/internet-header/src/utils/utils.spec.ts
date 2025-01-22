import { uniqueId } from './utils';

describe('utils', () => {
  describe('uniqueId', () => {
    it('generates a (sequential) unique id', () => {
      expect(uniqueId()).toEqual('1');
      expect(uniqueId('prefix-')).toEqual('prefix-2');
      expect(uniqueId()).toEqual('3');
    });
  });
});
