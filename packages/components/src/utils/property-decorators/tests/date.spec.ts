import { DateValue } from '../date';

class DecoratedDateValueComponent {
  @DateValue() dateValue: unknown = '';
}

describe('DateValue decorator', () => {
  let component: DecoratedDateValueComponent;

  beforeEach(() => {
    component = new DecoratedDateValueComponent();
    console.error = jest.fn();
  });

  function setPropertyInitialValue(property: keyof DecoratedDateValueComponent, value: unknown) {
    component[property] = value;
    (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
  }

  it('should not log an error for a valid date string', () => {
    setPropertyInitialValue('dateValue', '2024-01-15');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error for a valid date-time string', () => {
    setPropertyInitialValue('dateValue', '2024-01-15T10:30:00');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error when value is not a string', () => {
    setPropertyInitialValue('dateValue', 12345);
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "dateValue" must be a valid date string. Received: 12345.',
      expect.any(Object),
    );
  });

  it('should log an error for an invalid date string', () => {
    setPropertyInitialValue('dateValue', 'not-a-date');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "dateValue" must be a valid date string. Received: "not-a-date".',
      expect.any(Object),
    );
  });

  it('should validate on property change after componentDidLoad', () => {
    setPropertyInitialValue('dateValue', '2024-01-15');
    (console.error as jest.Mock).mockClear();

    component.dateValue = 'invalid';
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "dateValue" must be a valid date string. Received: "invalid".',
      expect.any(Object),
    );
  });

  it('should not validate before componentDidLoad', () => {
    component.dateValue = 'invalid';
    expect(console.error).not.toHaveBeenCalled();
  });
});
