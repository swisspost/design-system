import { requiredAnd } from '../required-and';
import { EMPTY_VALUES } from '../constants';
describe('requiredAnd', () => {
  const mockCheck = jest.fn();

  const mockRequiredAndCheck = requiredAnd(mockCheck);

  it('should throw error if the provided value is empty', () => {
    EMPTY_VALUES.forEach(emptyValue => {
      const component = { host: { localName: 'post-component' } as HTMLElement, prop: emptyValue };
      const prop = component['prop'];
      const error = `The prop \`${emptyValue}\` of the \`post-component\` component is not defined.`;
      expect(() => mockRequiredAndCheck(component, prop)).toThrow(error);
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
      mockRequiredAndCheck(component, 'prop');
      expect(mockCheck).toHaveBeenCalledTimes(index + 1);
    });
  });

  it('should pass all provided arguments to the nested check function', () => {
    const args = ['non empty value', true, false, ['arg in an array'], { arg: 'in an object' }];

    args.forEach(arg => {
      const component = { host: { localName: 'post-component' } as HTMLElement, prop: arg };

      mockRequiredAndCheck(component, 'prop', ...args);

      expect(mockCheck).toHaveBeenLastCalledWith(component, 'prop', ...args);
    });
  });
});
