import { airDatepickerLocalePlugin } from './rollup-plugin.air-datepicker-locale';

describe('airDatepickerLocalePlugin', () => {
  const plugin = airDatepickerLocalePlugin();

  describe('resolveId', () => {
    it('should resolve air-datepicker locale imports to a virtual module id', () => {
      const result = plugin.resolveId('air-datepicker/locale/en');
      expect(result).toBe('\0air-datepicker-locale:en');
    });

    it('should resolve locale imports for any language code', () => {
      const result = plugin.resolveId('air-datepicker/locale/de');
      expect(result).toBe('\0air-datepicker-locale:de');
    });

    it('should return null for non-locale air-datepicker imports', () => {
      expect(plugin.resolveId('air-datepicker')).toBeNull();
      expect(plugin.resolveId('air-datepicker/air-datepicker')).toBeNull();
    });

    it('should return null for unrelated imports', () => {
      expect(plugin.resolveId('imask')).toBeNull();
      expect(plugin.resolveId('@stencil/core')).toBeNull();
      expect(plugin.resolveId('./some-local-file')).toBeNull();
    });
  });

  describe('load', () => {
    it('should return null for non-virtual module ids', () => {
      expect(plugin.load('air-datepicker/locale/en')).toBeNull();
      expect(plugin.load('./some-file.ts')).toBeNull();
    });

    it('should return ESM source for a virtual locale module id', () => {
      const result = plugin.load('\0air-datepicker-locale:en');
      expect(result).toBeDefined();
      expect(result).toContain('export default');
    });

    it('should produce valid ESM with the correct locale data', () => {
      const result = plugin.load('\0air-datepicker-locale:en') as string;
      const parsed = JSON.parse(result.replace('export default ', '').replace(';', ''));

      expect(parsed.days).toEqual([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]);
      expect(parsed.monthsShort).toHaveLength(12);
      expect(parsed.today).toBe('Today');
      expect(parsed.clear).toBe('Clear');
      expect(parsed.dateFormat).toBe('MM/dd/yyyy');
      expect(parsed.firstDay).toBe(0);
    });

    it('should produce valid ESM for non-english locales', () => {
      const result = plugin.load('\0air-datepicker-locale:de') as string;
      const parsed = JSON.parse(result.replace('export default ', '').replace(';', ''));

      expect(parsed.days).toContain('Montag');
      expect(parsed.today).toBe('Heute');
      expect(parsed.firstDay).toBe(1);
    });

    it('should throw for a non-existent locale', () => {
      expect(() => plugin.load('\0air-datepicker-locale:xx')).toThrow();
    });
  });
});
