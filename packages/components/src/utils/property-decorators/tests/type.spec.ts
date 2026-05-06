import { Type } from '../type';

class DecoratedTypesComponent {
  @Type('string') stringValue: unknown = '';
  @Type('number') numberValue: unknown = 0;
  @Type('boolean') booleanValue: unknown = false;
  @Type('array') arrayValue: unknown = [];
}

describe('Type decorator', () => {
  let component: DecoratedTypesComponent;

  beforeEach(() => {
    component = new DecoratedTypesComponent();
    console.error = jest.fn();
  });

  function setPropertyInitialValue(property: keyof DecoratedTypesComponent, value: unknown) {
    component[property] = value;
    (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
  }

  it('should not log an error when value matches string type', () => {
    setPropertyInitialValue('stringValue', 'hello');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error when value matches number type', () => {
    setPropertyInitialValue('numberValue', 42);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error when value matches boolean type', () => {
    setPropertyInitialValue('booleanValue', true);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error when value does not match the type', () => {
    setPropertyInitialValue('numberValue', 'not-a-number');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "numberValue" must be of type "number". Received: "not-a-number".',
      expect.any(Object),
    );
  });

  it('should handle array type correctly for valid arrays', () => {
    setPropertyInitialValue('arrayValue', [1, 2, 3]);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error when expecting array but value is not', () => {
    setPropertyInitialValue('arrayValue', 'not-array');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "arrayValue" must be of type "array". Received: "not-array".',
      expect.any(Object),
    );
  });

  it('should log an error when value is array but type is not array', () => {
    setPropertyInitialValue('stringValue', ['array']);
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "stringValue" must be of type "string". Received: ["array"].',
      expect.any(Object),
    );
  });

  it('should validate on property change after componentDidLoad', () => {
    setPropertyInitialValue('numberValue', 42);
    (console.error as jest.Mock).mockClear();

    component.numberValue = 'string';
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "numberValue" must be of type "number". Received: "string".',
      expect.any(Object),
    );
  });

  it('should not validate before componentDidLoad', () => {
    component.numberValue = 'wrong';
    expect(console.error).not.toHaveBeenCalled();
  });
});
