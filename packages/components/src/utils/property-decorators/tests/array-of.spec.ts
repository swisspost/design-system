import { ArrayOf } from '../array-of';

class DecoratedArraysComponent {
  @ArrayOf('number') arrayOfNumbers: unknown = [];
  @ArrayOf('string') arrayOfStrings: unknown = [];
}

describe('ArrayOf decorator', () => {
  let component: DecoratedArraysComponent;

  beforeEach(() => {
    component = new DecoratedArraysComponent();
    console.error = jest.fn();
  });

  function setPropertyInitialValue(property: keyof DecoratedArraysComponent, value: unknown) {
    component[property] = value;
    (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
  }

  it('should not log an error for a valid array of the specified type', () => {
    setPropertyInitialValue('arrayOfNumbers', [1, 2, 3]);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error for an empty array', () => {
    setPropertyInitialValue('arrayOfNumbers', []);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error when value is not an array', () => {
    setPropertyInitialValue('arrayOfNumbers', 'not-array');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "arrayOfNumbers" must be a "number" array. Received: "not-array".',
      expect.any(Object),
    );
  });

  it('should log an error when array contains wrong types', () => {
    setPropertyInitialValue('arrayOfNumbers', [1, 'two', 3]);
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "arrayOfNumbers" must be a "number" array. Received: [1,"two",3].',
      expect.any(Object),
    );
  });

  it('should validate on property change after componentDidLoad', () => {
    setPropertyInitialValue('arrayOfNumbers', [1, 2]);

    component.arrayOfNumbers = ['a', 'b'];
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "arrayOfNumbers" must be a "number" array. Received: ["a","b"].',
      expect.any(Object),
    );
  });

  it('should work with string type', () => {
    setPropertyInitialValue('arrayOfStrings', ['a', 'b']);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error for string type with non-string elements', () => {
    setPropertyInitialValue('arrayOfStrings', [1, 2]);
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "arrayOfStrings" must be a "string" array. Received: [1,2].',
      expect.any(Object),
    );
  });

  it.each([undefined, null, '', Number.NaN])(
    'should not log an error when value is empty (%s)',
    emptyValue => {
      setPropertyInitialValue('arrayOfNumbers', emptyValue);
      expect(console.error).not.toHaveBeenCalled();
    },
  );
});
