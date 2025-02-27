import { emptyOr } from '../empty-or';

describe('emptyOr', () => {
  const mockCheck = jest.fn();

  const mockEmptyOrCheck = emptyOr(mockCheck);

  it('should not run the check if the provided value is empty', () => {
    [undefined, null, ''].forEach(emptyValue => {
      const component = { host: { localName: 'post-component' } as HTMLElement, prop: emptyValue };
      mockEmptyOrCheck(component, 'prop');
      expect(mockCheck).not.toHaveBeenCalled();
    });
  });

  it('should run the check if the provided value is not empty', () => {
    [
      0,
      NaN,
      ' ',
      false,
      [],
      {},
      () => {
        /* empty */
      },
    ].forEach((nonEmptyValue, index) => {
      const component = {
        host: { localName: 'post-component' } as HTMLElement,
        prop: nonEmptyValue,
      };
      mockEmptyOrCheck(component, 'prop');
      expect(mockCheck).toHaveBeenCalledTimes(index + 1);
    });
  });

  it('should pass all provided arguments to the nested check function', () => {
    const args = ['non empty value', true, false, ['arg in an array'], { arg: 'in an object' }];

    args.forEach(arg => {
      const component = { host: { localName: 'post-component' } as HTMLElement, prop: arg };

      mockEmptyOrCheck(component, 'prop', arg);

      expect(mockCheck).toHaveBeenLastCalledWith(component, 'prop', arg);
    });
  });
});
