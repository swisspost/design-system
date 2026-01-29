import { requiredAnd } from '../required-and';
describe('requiredAnd', () => {
  const mockCheck = jest.fn();

  const mockRequiredAndCheck = requiredAnd(mockCheck);

  it('should throw error if the provided value is empty', () => {
    [undefined, null, '', NaN].forEach(emptyValue => {
      const propName = 'requiredProp';
      const component = {
        host: { localName: 'post-component' } as HTMLElement,
        [propName]: emptyValue,
      };
      const error = `The prop \`${propName}\` of the \`post-component\` component is not defined.`;
      expect(() => mockRequiredAndCheck(component, propName)).toThrow(error);
    });
  });

  it('should run the check if the provided value is not empty', () => {
    [
      0,
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
    const args = [0, false, 'text', [], {}];

    args.forEach(arg => {
      const component = { host: { localName: 'post-component' } as HTMLElement, prop: arg };

      mockRequiredAndCheck(component, 'prop', ...args);

      expect(mockCheck).toHaveBeenLastCalledWith(component, 'prop', ...args);
    });
  });
});
