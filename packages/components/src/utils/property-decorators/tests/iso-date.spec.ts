import { IsoDate } from '../iso-date';

class DecoratedIsoDateComponent {
  @IsoDate() isoDate: unknown;
}

describe('IsoDate decorator', () => {
  let component: DecoratedIsoDateComponent;

  beforeEach(() => {
    component = new DecoratedIsoDateComponent();
    console.error = jest.fn();
  });

  function setPropertyInitialValue(property: keyof DecoratedIsoDateComponent, value?: unknown) {
    component[property] = value;
    (component as unknown as { componentDidLoad: () => void }).componentDidLoad();
  }

  it('should not log an error for a valid ISO date', () => {
    setPropertyInitialValue('isoDate', '2024-01-15');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error when value is empty string (falsy)', () => {
    setPropertyInitialValue('isoDate', '');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error when value is undefined', () => {
    setPropertyInitialValue('isoDate');
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should not log an error when value is null', () => {
    setPropertyInitialValue('isoDate', null);
    expect(console.error).not.toHaveBeenCalled();
  });

  it('should log an error for an invalid ISO date format', () => {
    setPropertyInitialValue('isoDate', '01-15-2024');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "isoDate" must be in ISO format (YYYY-MM-DD). Received: "01-15-2024".',
      expect.any(Object),
    );
  });

  it('should log an error for an auto-corrected date', () => {
    setPropertyInitialValue('isoDate', '2024-02-30');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "isoDate" must be in ISO format (YYYY-MM-DD). Received: "2024-02-30".',
      expect.any(Object),
    );
  });

  it('should log an error for a non-date string', () => {
    setPropertyInitialValue('isoDate', 'not-a-date');
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "isoDate" must be in ISO format (YYYY-MM-DD). Received: "not-a-date".',
      expect.any(Object),
    );
  });

  it('should validate on property change after componentDidLoad', () => {
    setPropertyInitialValue('isoDate', '2024-01-15');
    (console.error as jest.Mock).mockClear();

    component.isoDate = 'bad-date';
    expect(console.error).toHaveBeenCalledWith(
      '[post-test] Property "isoDate" must be in ISO format (YYYY-MM-DD). Received: "bad-date".',
      expect.any(Object),
    );
  });

  it('should not validate before componentDidLoad', () => {
    component.isoDate = 'bad-date';
    expect(console.error).not.toHaveBeenCalled();
  });
});
