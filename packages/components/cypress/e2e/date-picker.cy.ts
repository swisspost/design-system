import { isPopoverSupported } from './popovercontainer.cy';
import {
  DATE_FORMAT_RANGE_SEPARATOR,
  DATE_FORMAT_MAP,
  DATE_FORMAT_STRING_OPTIONS,
} from '../../src/components/post-date-picker/constants';
import { UNICODE_BIDI } from '../../src/utils/locales';

const DATEPICKER_ID = 'eb77cd02-48b2-42e1-a3e4-cd8a973d431e';

const LABEL_PROPERTIES = [
  'text-next-month',
  'text-next-year',
  'text-next-decade',
  'text-previous-month',
  'text-previous-year',
  'text-previous-decade',
  'text-switch-year',
  'text-toggle-calendar',
];

// Test only the locales containing a language,
// which is supported by the air-datepicker
// Find the list of localeCodes used as source for the map here: https://simplelocalize.io/data/locales/
const LOCALES_MAP = [
  { locale: 'ar', name: 'Arabic', dir: 'rtl', format: 'dd‏/mm‏/yyyy' },
  { locale: 'bg', name: 'Bulgarian', dir: 'ltr', format: 'dd.mm.yyyy г.' },
  { locale: 'ca', name: 'Catalan', dir: 'ltr', format: 'dd/mm/yyyy' },
  { locale: 'cs', name: 'Czech', dir: 'ltr', format: 'dd. mm. yyyy' },
  { locale: 'da', name: 'Danish', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'de', name: 'German', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'el', name: 'Greek', dir: 'ltr', format: 'dd/mm/yyyy' },
  { locale: 'en', name: 'English', dir: 'ltr', format: 'mm/dd/yyyy' },
  { locale: 'es', name: 'Spanish', dir: 'ltr', format: 'dd/mm/yyyy' },
  { locale: 'eu', name: 'Basque', dir: 'ltr', format: 'yyyy/mm/dd' },
  { locale: 'fi', name: 'Finnish', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'fr', name: 'French', dir: 'ltr', format: 'dd/mm/yyyy' },
  { locale: 'hr', name: 'Croatian', dir: 'ltr', format: 'dd. mm. yyyy.' },
  { locale: 'hu', name: 'Hungarian', dir: 'ltr', format: 'yyyy. mm. dd.' },
  { locale: 'id', name: 'Indonesian', dir: 'ltr', format: 'dd/mm/yyyy' },
  { locale: 'it', name: 'Italian', dir: 'ltr', format: 'dd/mm/yyyy' },
  { locale: 'ja', name: 'Japanese', dir: 'ltr', format: 'yyyy/mm/dd' },
  { locale: 'ko', name: 'Korean', dir: 'ltr', format: 'yyyy. mm. dd.' },
  { locale: 'nb', name: 'Norwegian Bokmål', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'nl', name: 'Dutch', dir: 'ltr', format: 'dd-mm-yyyy' },
  { locale: 'pl', name: 'Polish', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'pt', name: 'Portuguese', dir: 'ltr', format: 'dd/mm/yyyy' },
  { locale: 'ro', name: 'Romanian', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'ru', name: 'Russian', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'si', name: 'Sinhala', dir: 'ltr', format: 'yyyy-mm-dd' },
  { locale: 'sk', name: 'Slovak', dir: 'ltr', format: 'dd. mm. yyyy' },
  { locale: 'sl', name: 'Slovenian', dir: 'ltr', format: 'dd. mm. yyyy' },
  { locale: 'sv', name: 'Swedish', dir: 'ltr', format: 'yyyy-mm-dd' },
  { locale: 'th', name: 'Thai', dir: 'ltr', format: 'dd/mm/yyyy' },
  { locale: 'tr', name: 'Turkish', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'uk', name: 'Ukrainian', dir: 'ltr', format: 'dd.mm.yyyy' },
  { locale: 'zh', name: 'Chinese', dir: 'ltr', format: 'yyyy/mm/dd' },
  // { locale: 'aa-ER', name: 'Afar (ER)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'af-NA', name: 'Afrikaans (NA)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'af-ZA', name: 'Afrikaans (ZA)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'am-ET', name: 'Amharic (ET)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ar-AE', name: 'Arabic (AE)', dir: 'rtl', format: 'dd‏/mm‏/yyyy' }, // DUPLICATE OF 'ar'
  // { locale: 'ar-BH', name: 'Arabic (BH)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-DJ', name: 'Arabic (DJ)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-DZ', name: 'Arabic (DZ)', dir: 'rtl', format: 'dd‏/mm‏/yyyy' }, // DUPLICATE OF 'ar'
  // { locale: 'ar-EG', name: 'Arabic (EG)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-ER', name: 'Arabic (ER)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-IL', name: 'Arabic (IL)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-IQ', name: 'Arabic (IQ)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-JO', name: 'Arabic (JO)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-KM', name: 'Arabic (KM)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-KW', name: 'Arabic (KW)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-LB', name: 'Arabic (LB)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-LY', name: 'Arabic (LY)', dir: 'rtl', format: 'dd‏/mm‏/yyyy' }, // DUPLICATE OF 'ar'
  // { locale: 'ar-MA', name: 'Arabic (MA)', dir: 'rtl', format: 'dd‏/mm‏/yyyy' }, // DUPLICATE OF 'ar'
  // { locale: 'ar-MR', name: 'Arabic (MR)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-OM', name: 'Arabic (OM)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-PS', name: 'Arabic (PS)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-QA', name: 'Arabic (QA)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-SA', name: 'Arabic (SA)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-SD', name: 'Arabic (SD)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-SO', name: 'Arabic (SO)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-SY', name: 'Arabic (SY)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-TD', name: 'Arabic (TD)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ar-TN', name: 'Arabic (TN)', dir: 'rtl', format: 'dd‏/mm‏/yyyy' }, // DUPLICATE OF 'ar'
  // { locale: 'ar-YE', name: 'Arabic (YE)', dir: 'rtl', format: '٢٢‏/١١‏/٣٣٣٣' }, // !!! BUGGY !!!
  // { locale: 'ay-BO', name: 'Aymara (BO)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'az-AZ', name: 'Azerbaijani (AZ)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'be-BY', name: 'Belarusian (BY)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  { locale: 'bg-BG', name: 'Bulgarian (BG)', dir: 'ltr', format: 'dd.mm.yyyy г.' },
  // { locale: 'bi-VU', name: 'Bislama (VU)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'bn-BD', name: 'Bengali (BD)', dir: 'ltr', format: '২২/১১/৩৩৩৩' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'bs-BA', name: 'Bosnian (BA)', dir: 'ltr', format: 'dd. mm. yyyy.' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'bs-ME', name: 'Bosnian (ME)', dir: 'ltr', format: 'dd. mm. yyyy.' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'byn-ER', name: 'Bilen (ER)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ca-AD', name: 'Catalan (AD)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'ca'
  // { locale: 'ch-GU', name: 'Chamorro (GU)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ch-MP', name: 'Chamorro (MP)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'cs-CZ', name: 'Czech (CZ)', dir: 'ltr', format: 'dd. mm. yyyy' }, // DUPLICATE OF 'cs'
  // { locale: 'da-DK', name: 'Danish (DK)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'da'
  // { locale: 'de-AT', name: 'German (AT)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'de'
  // { locale: 'de-BE', name: 'German (BE)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'de'
  // { locale: 'de-CH', name: 'German (CH)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'de'
  // { locale: 'de-DE', name: 'German (DE)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'de'
  // { locale: 'de-LI', name: 'German (LI)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'de'
  // { locale: 'de-LU', name: 'German (LU)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'de'
  // { locale: 'de-VA', name: 'German (VA)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'de'
  // { locale: 'dv-MV', name: 'Divehi (MV)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'dz-BT', name: 'Dzongkha (BT)', dir: 'ltr', format: '༣༣༣༣-༡༡-༢༢' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'el-CY', name: 'Greek (CY)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'el'
  // { locale: 'el-GR', name: 'Greek (GR)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'el'
  // { locale: 'en-AG', name: 'English (AG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-AI', name: 'English (AI)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-AQ', name: 'English (AQ)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-AS', name: 'English (AS)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-AU', name: 'English (AU)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-BB', name: 'English (BB)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-BM', name: 'English (BM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-BS', name: 'English (BS)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-BW', name: 'English (BW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-BZ', name: 'English (BZ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  { locale: 'en-CA', name: 'English (CA)', dir: 'ltr', format: 'yyyy-mm-dd' },
  // { locale: 'en-CC', name: 'English (CC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-CK', name: 'English (CK)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-CM', name: 'English (CM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-CW', name: 'English (CW)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-CX', name: 'English (CX)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-DM', name: 'English (DM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-ER', name: 'English (ER)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-FJ', name: 'English (FJ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-FK', name: 'English (FK)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-FM', name: 'English (FM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  { locale: 'en-GB', name: 'English (GB)', dir: 'ltr', format: 'dd/mm/yyyy' },
  // { locale: 'en-GD', name: 'English (GD)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-GG', name: 'English (GG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-GH', name: 'English (GH)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-GI', name: 'English (GI)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-GM', name: 'English (GM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-GS', name: 'English (GS)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-GU', name: 'English (GU)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-GY', name: 'English (GY)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-HK', name: 'English (HK)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-HM', name: 'English (HM)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-IE', name: 'English (IE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-IM', name: 'English (IM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-IN', name: 'English (IN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-IO', name: 'English (IO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-JE', name: 'English (JE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-JM', name: 'English (JM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-KE', name: 'English (KE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-KI', name: 'English (KI)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-KN', name: 'English (KN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-KY', name: 'English (KY)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-LC', name: 'English (LC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-LR', name: 'English (LR)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-LS', name: 'English (LS)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-MF', name: 'English (MF)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-MH', name: 'English (MH)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-MP', name: 'English (MP)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-MS', name: 'English (MS)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-MT', name: 'English (MT)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-MU', name: 'English (MU)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-MW', name: 'English (MW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-NA', name: 'English (NA)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-NF', name: 'English (NF)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-NG', name: 'English (NG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-NR', name: 'English (NR)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-NU', name: 'English (NU)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-NZ', name: 'English (NZ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-PG', name: 'English (PG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-PH', name: 'English (PH)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-PK', name: 'English (PK)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-PN', name: 'English (PN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-PR', name: 'English (PR)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-PW', name: 'English (PW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-RW', name: 'English (RW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SB', name: 'English (SB)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SC', name: 'English (SC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SD', name: 'English (SD)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SG', name: 'English (SG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SH', name: 'English (SH)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SL', name: 'English (SL)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SS', name: 'English (SS)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SX', name: 'English (SX)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-SZ', name: 'English (SZ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-TC', name: 'English (TC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-TK', name: 'English (TK)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-TO', name: 'English (TO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-TT', name: 'English (TT)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-TV', name: 'English (TV)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-TZ', name: 'English (TZ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-UG', name: 'English (UG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-UM', name: 'English (UM)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-US', name: 'English (US)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-VC', name: 'English (VC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-VG', name: 'English (VG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-VI', name: 'English (VI)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'en'
  // { locale: 'en-VU', name: 'English (VU)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-WS', name: 'English (WS)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  { locale: 'en-ZA', name: 'English (ZA)', dir: 'ltr', format: 'yyyy/mm/dd' },
  // { locale: 'en-ZM', name: 'English (ZM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'en-ZW', name: 'English (ZW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'en-GB'
  // { locale: 'es-AR', name: 'Spanish (AR)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-BO', name: 'Spanish (BO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-BZ', name: 'Spanish (BZ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  { locale: 'es-CL', name: 'Spanish (CL)', dir: 'ltr', format: 'dd-mm-yyyy' },
  // { locale: 'es-CO', name: 'Spanish (CO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-CR', name: 'Spanish (CR)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-CU', name: 'Spanish (CU)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-DO', name: 'Spanish (DO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-EC', name: 'Spanish (EC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-EH', name: 'Spanish (EH)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-ES', name: 'Spanish (ES)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-GQ', name: 'Spanish (GQ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-GT', name: 'Spanish (GT)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-GU', name: 'Spanish (GU)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-HN', name: 'Spanish (HN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-MX', name: 'Spanish (MX)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-NI', name: 'Spanish (NI)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  { locale: 'es-PA', name: 'Spanish (PA)', dir: 'ltr', format: 'mm/dd/yyyy' },
  // { locale: 'es-PE', name: 'Spanish (PE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-PR', name: 'Spanish (PR)', dir: 'ltr', format: 'mm/dd/yyyy' }, // DUPLICATE OF 'es-PA'
  // { locale: 'es-PY', name: 'Spanish (PY)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-SV', name: 'Spanish (SV)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-UY', name: 'Spanish (UY)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'es-VE', name: 'Spanish (VE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'es'
  // { locale: 'et-EE', name: 'Estonian (EE)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'fa-IR', name: 'Persian (Farsi) (IR)', dir: 'ltr', format: '۲۷۱۲/۰۹/۰۱' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'fan-GQ', name: 'Fang (GQ)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ff-BF', name: 'Fula (BF)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ff-GN', name: 'Fula (GN)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'fi-FI', name: 'Finnish (FI)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'fi'
  // { locale: 'fj-FJ', name: 'Fijian (FJ)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'fo-FO', name: 'Faroese (FO)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'fr-BE', name: 'French (BE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-BF', name: 'French (BF)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-BI', name: 'French (BI)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-BJ', name: 'French (BJ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-BL', name: 'French (BL)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  { locale: 'fr-CA', name: 'French (CA)', dir: 'ltr', format: 'yyyy-mm-dd' },
  // { locale: 'fr-CD', name: 'French (CD)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-CF', name: 'French (CF)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-CG', name: 'French (CG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  { locale: 'fr-CH', name: 'French (CH)', dir: 'ltr', format: 'dd.mm.yyyy' },
  // { locale: 'fr-CI', name: 'French (CI)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-CM', name: 'French (CM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-DJ', name: 'French (DJ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-FR', name: 'French (FR)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-GA', name: 'French (GA)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-GF', name: 'French (GF)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-GG', name: 'French (GG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-GN', name: 'French (GN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-GP', name: 'French (GP)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-GQ', name: 'French (GQ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-HT', name: 'French (HT)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-JE', name: 'French (JE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-KM', name: 'French (KM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-LB', name: 'French (LB)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-LU', name: 'French (LU)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-MC', name: 'French (MC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-MF', name: 'French (MF)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-MG', name: 'French (MG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-ML', name: 'French (ML)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-MQ', name: 'French (MQ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-NC', name: 'French (NC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-NE', name: 'French (NE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-PF', name: 'French (PF)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-PM', name: 'French (PM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-RE', name: 'French (RE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-RW', name: 'French (RW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-SC', name: 'French (SC)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-SN', name: 'French (SN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-TD', name: 'French (TD)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-TF', name: 'French (TF)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-TG', name: 'French (TG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-VA', name: 'French (VA)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-VU', name: 'French (VU)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-WF', name: 'French (WF)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'fr-YT', name: 'French (YT)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'fr'
  // { locale: 'ga-IE', name: 'Irish (IE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'gn-AR', name: 'Guaraní (AR)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'gn-PY', name: 'Guaraní (PY)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'gv-IM', name: 'Manx (IM)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'he-IL', name: 'Hebrew (modern) (IL)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'hi-IN', name: 'Hindi (IN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'hif-FJ', name: 'Fiji Hindi (FJ)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'hr-BA', name: 'Croatian (BA)', dir: 'ltr', format: 'dd. mm. yyyy.' }, // DUPLICATE OF 'hr'
  // { locale: 'hr-HR', name: 'Croatian (HR)', dir: 'ltr', format: 'dd. mm. yyyy.' }, // DUPLICATE OF 'hr'
  // { locale: 'hr-ME', name: 'Croatian (ME)', dir: 'ltr', format: 'dd. mm. yyyy.' }, // DUPLICATE OF 'hr'
  // { locale: 'ht-HT', name: 'Haitian (HT)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'hu-HU', name: 'Hungarian (HU)', dir: 'ltr', format: 'yyyy. mm. dd.' }, // DUPLICATE OF 'hu'
  // { locale: 'hy-AM', name: 'Armenian (AM)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'hy-CY', name: 'Armenian (CY)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'id-ID', name: 'Indonesian (ID)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'id'
  // { locale: 'is-IS', name: 'Icelandic (IS)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  { locale: 'it-CH', name: 'Italian (CH)', dir: 'ltr', format: 'dd.mm.yyyy' },
  // { locale: 'it-IT', name: 'Italian (IT)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'it'
  // { locale: 'it-SM', name: 'Italian (SM)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'it'
  // { locale: 'it-VA', name: 'Italian (VA)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'it'
  // { locale: 'ja-JP', name: 'Japanese (JP)', dir: 'ltr', format: 'yyyy/mm/dd' }, // DUPLICATE OF 'ja'
  // { locale: 'ka-GE', name: 'Georgian (GE)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'kg-CD', name: 'Kongo (CD)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'kk-KZ', name: 'Kazakh (KZ)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'kl-GL', name: 'Greenlandic (GL)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'km-KH', name: 'Khmer (KH)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ko-KP', name: 'Korean (KP)', dir: 'ltr', format: 'yyyy. mm. dd.' }, // DUPLICATE OF 'ko'
  // { locale: 'ko-KR', name: 'Korean (KR)', dir: 'ltr', format: 'yyyy. mm. dd.' }, // DUPLICATE OF 'ko'
  // { locale: 'ku-IQ', name: 'Kurdish (IQ)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'kun-ER', name: 'Kunama (ER)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ky-KG', name: 'Kyrgyz (KG)', dir: 'ltr', format: 'yyyy-dd-mm' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'la-VA', name: 'Latin (VA)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'lb-LU', name: 'Luxembourgish (LU)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ln-CD', name: 'Lingala (CD)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ln-CG', name: 'Lingala (CG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'lo-LA', name: 'Lao (LA)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'lt-LT', name: 'Lithuanian (LT)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'lu-CD', name: 'Luba-Katanga (CD)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'lv-LV', name: 'Latvian (LV)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'mg-MG', name: 'Malagasy (MG)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'mh-MH', name: 'Marshallese (MH)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'mi-NZ', name: 'Māori (NZ)', dir: 'ltr', format: 'dd-mm-yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'mk-MK', name: 'Macedonian (MK)', dir: 'ltr', format: 'dd.mm.yyyy г.' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'mn-MN', name: 'Mongolian (MN)', dir: 'ltr', format: 'yyyy.mm.dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ms-BN', name: 'Malay (BN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ms-MY', name: 'Malay (MY)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ms-SG', name: 'Malay (SG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'mt-MT', name: 'Maltese (MT)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'my-MM', name: 'Burmese (MM)', dir: 'ltr', format: '၂၂/၁၁/၃၃၃၃' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'na-NR', name: 'Nauruan (NR)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'nb-BV', name: 'Norwegian Bokmål (BV)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'nb'
  // { locale: 'nb-NO', name: 'Norwegian Bokmål (NO)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'nb'
  // { locale: 'nd-ZW', name: 'Northern Ndebele (ZW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ne-NP', name: 'Nepali (NP)', dir: 'ltr', format: '३३३३-११-२२' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'nl-AW', name: 'Dutch (AW)', dir: 'ltr', format: 'dd-mm-yyyy' }, // DUPLICATE OF 'nl'
  { locale: 'nl-BE', name: 'Dutch (BE)', dir: 'ltr', format: 'dd/mm/yyyy' },
  // { locale: 'nl-BQ', name: 'Dutch (BQ)', dir: 'ltr', format: 'dd-mm-yyyy' }, // DUPLICATE OF 'nl'
  // { locale: 'nl-CW', name: 'Dutch (CW)', dir: 'ltr', format: 'dd-mm-yyyy' }, // DUPLICATE OF 'nl'
  // { locale: 'nl-MF', name: 'Dutch (MF)', dir: 'ltr', format: 'dd-mm-yyyy' }, // DUPLICATE OF 'nl'
  // { locale: 'nl-NL', name: 'Dutch (NL)', dir: 'ltr', format: 'dd-mm-yyyy' }, // DUPLICATE OF 'nl'
  // { locale: 'nl-SR', name: 'Dutch (SR)', dir: 'ltr', format: 'dd-mm-yyyy' }, // DUPLICATE OF 'nl'
  // { locale: 'nl-SX', name: 'Dutch (SX)', dir: 'ltr', format: 'dd-mm-yyyy' }, // DUPLICATE OF 'nl'
  // { locale: 'nn-BV', name: 'Norwegian Nynorsk (BV)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'nn-NO', name: 'Norwegian Nynorsk (NO)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'no-BV', name: 'Norwegian (BV)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'no-NO', name: 'Norwegian (NO)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'no-SJ', name: 'Norwegian (SJ)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'nr-ZA', name: 'Southern Ndebele (ZA)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'nrb-ER', name: 'Nara (ER)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ny-MW', name: 'Chichewa (MW)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'pa-AW', name: '(Eastern) Punjabi (AW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'pa-CW', name: '(Eastern) Punjabi (CW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'pl-PL', name: 'Polish (PL)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'pl'
  // { locale: 'ps-AF', name: 'Pashto (AF)', dir: 'ltr', format: 'AP ۲۷۱۲-۰۹-۰۱' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'pt-AO', name: 'Portuguese (AO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-BR', name: 'Portuguese (BR)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-CV', name: 'Portuguese (CV)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-GQ', name: 'Portuguese (GQ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-GW', name: 'Portuguese (GW)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-MO', name: 'Portuguese (MO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-MZ', name: 'Portuguese (MZ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-PT', name: 'Portuguese (PT)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-ST', name: 'Portuguese (ST)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'pt-TL', name: 'Portuguese (TL)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'pt'
  // { locale: 'qu-BO', name: 'Quechua (BO)', dir: 'ltr', format: 'dd-mm-yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'rar-CK', name: 'Cook Islands Māori (CK)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'rm-CH', name: 'Romansh (CH)', dir: 'ltr', format: 'dd-mm-yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'rn-BI', name: 'Kirundi (BI)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ro-MD', name: 'Romanian (MD)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ro'
  // { locale: 'ro-RO', name: 'Romanian (RO)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ro'
  // { locale: 'rtm-FJ', name: 'Rotuman (FJ)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ru-AQ', name: 'Russian (AQ)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ru'
  // { locale: 'ru-BY', name: 'Russian (BY)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ru'
  // { locale: 'ru-KG', name: 'Russian (KG)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ru'
  // { locale: 'ru-KZ', name: 'Russian (KZ)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ru'
  // { locale: 'ru-RU', name: 'Russian (RU)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ru'
  // { locale: 'ru-TJ', name: 'Russian (TJ)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ru'
  // { locale: 'ru-TM', name: 'Russian (TM)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ru'
  // { locale: 'ru-UZ', name: 'Russian (UZ)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'ru'
  // { locale: 'rw-RW', name: 'Kinyarwanda (RW)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sg-CF', name: 'Sango (CF)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'si-LK', name: 'Sinhalese (LK)', dir: 'ltr', format: 'yyyy-mm-dd' }, // DUPLICATE OF 'si'
  // { locale: 'sk-CZ', name: 'Slovak (CZ)', dir: 'ltr', format: 'dd. mm. yyyy' }, // DUPLICATE OF 'sk'
  // { locale: 'sk-SK', name: 'Slovak (SK)', dir: 'ltr', format: 'dd. mm. yyyy' }, // DUPLICATE OF 'sk'
  // { locale: 'sl-SI', name: 'Slovene (SI)', dir: 'ltr', format: 'dd. mm. yyyy' }, // DUPLICATE OF 'sl'
  // { locale: 'sm-AS', name: 'Samoan (AS)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sm-WS', name: 'Samoan (WS)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sn-ZW', name: 'Shona (ZW)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'so-SO', name: 'Somali (SO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sq-AL', name: 'Albanian (AL)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sq-ME', name: 'Albanian (ME)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sq-XK', name: 'Albanian (XK)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sr-BA', name: 'Serbian (BA)', dir: 'ltr', format: 'dd.mm.yyyy.' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sr-ME', name: 'Serbian (ME)', dir: 'ltr', format: 'dd.mm.yyyy.' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sr-RS', name: 'Serbian (RS)', dir: 'ltr', format: 'dd.mm.yyyy.' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sr-XK', name: 'Serbian (XK)', dir: 'ltr', format: 'dd.mm.yyyy.' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ss-SZ', name: 'Swati (SZ)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ss-ZA', name: 'Swati (ZA)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ssy-ER', name: 'Saho (ER)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'st-LS', name: 'Southern Sotho (LS)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'st-ZA', name: 'Southern Sotho (ZA)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sv-AX', name: 'Swedish (AX)', dir: 'ltr', format: 'yyyy-mm-dd' }, // DUPLICATE OF 'sv'
  // { locale: 'sv-FI', name: 'Swedish (FI)', dir: 'ltr', format: 'yyyy-mm-dd' }, // DUPLICATE OF 'sv'
  // { locale: 'sv-SE', name: 'Swedish (SE)', dir: 'ltr', format: 'yyyy-mm-dd' }, // DUPLICATE OF 'sv'
  // { locale: 'sw-CD', name: 'Swahili (CD)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sw-KE', name: 'Swahili (KE)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sw-TZ', name: 'Swahili (TZ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'sw-UG', name: 'Swahili (UG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ta-LK', name: 'Tamil (LK)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'ta-SG', name: 'Tamil (SG)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'tg-TJ', name: 'Tajik (TJ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'th-TH', name: 'Thai (TH)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'th'
  // { locale: 'ti-ER', name: 'Tigrinya (ER)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'tig-ER', name: 'Tigre (ER)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'tk-AF', name: 'Turkmen (AF)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'tk-TM', name: 'Turkmen (TM)', dir: 'ltr', format: 'dd.mm.yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'tn-BW', name: 'Tswana (BW)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'tn-ZA', name: 'Tswana (ZA)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'to-TO', name: 'Tonga (Tonga Islands) (TO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'tr-CY', name: 'Turkish (CY)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'tr'
  // { locale: 'tr-TR', name: 'Turkish (TR)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLICATE OF 'tr'
  // { locale: 'ts-ZA', name: 'Tsonga (ZA)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'uk-UA', name: 'Ukrainian (UA)', dir: 'ltr', format: 'dd.mm.yyyy' }, // DUPLIATE OF 'uk'
  // { locale: 'ur-PK', name: 'Urdu (PK)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'uz-AF', name: 'Uzbek (AF)', dir: 'ltr', format: '۲۷۱۲-۰۹-۰۱' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'uz-UZ', name: 'Uzbek (UZ)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 've-ZA', name: 'Venda (ZA)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'vi-VN', name: 'Vietnamese (VN)', dir: 'ltr', format: 'dd/mm/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'xh-ZA', name: 'Xhosa (ZA)', dir: 'ltr', format: 'mm/dd/yyyy' }, // UNSUPPORTED BY AIR-DP
  // { locale: 'zh-CN', name: 'Chinese (CN)', dir: 'ltr', format: 'yyyy/mm/dd' }, // DUPLICATE OF 'zh'
  { locale: 'zh-HK', name: 'Chinese (HK)', dir: 'ltr', format: 'dd/mm/yyyy' },
  // { locale: 'zh-MO', name: 'Chinese (MO)', dir: 'ltr', format: 'dd/mm/yyyy' }, // DUPLICATE OF 'zh-HK'
  // { locale: 'zh-SG', name: 'Chinese (SG)', dir: 'ltr', format: 'yyyy年mm月dd日' }, // !!! BUGGY !!!
  // { locale: 'zh-TW', name: 'Chinese (TW)', dir: 'ltr', format: 'yyyy/mm/dd' }, // DUPLICATE OF 'zh'
  // { locale: 'zu-ZA', name: 'Zulu (ZA)', dir: 'ltr', format: 'yyyy-mm-dd' }, // UNSUPPORTED BY AIR-DP
];

describe('date-picker', { includeShadowDom: true }, () => {
  describe('default', () => {
    const selector = isPopoverSupported() ? ':popover-open' : '.\\:popover-open';

    beforeEach(() => {
      cy.getComponent('date-picker', DATEPICKER_ID);
      cy.get('@date-picker').find('input').as('input');
      cy.get('@date-picker').shadow().find('button[aria-haspopup="true"]').as('toggle');
      cy.get('@date-picker').shadow().find('.air-datepicker-nav').as('navigation');
      cy.get('@date-picker').shadow().find('.datepicker-container').as('container');
    });

    it('should render', () => {
      cy.get('@date-picker').should('exist');
      cy.get('@input').should('exist');
    });

    describe('attributes & properties', () => {
      it('should have correct ARIA roles and labels', () => {
        cy.get('@toggle').click();

        cy.get('@container').find('[role="grid"]').should('exist');

        cy.get('@container')
          .find('.air-datepicker-nav--title button')
          .should('have.attr', 'aria-label', 'Switch to year view');

        cy.get('@container')
          .find('[data-action="next"] button')
          .should('have.attr', 'aria-label', 'Next month');

        cy.get('@container')
          .find('[data-action="prev"] button')
          .should('have.attr', 'aria-label', 'Previous month');

        cy.get('@container')
          .find('.air-datepicker-cell')
          .first()
          .should('have.attr', 'role', 'gridcell');
      });

      LABEL_PROPERTIES.forEach(label => {
        it('should break if missing ' + label, () => {
          cy.window().then(win => {
            cy.spy(win.console, 'error').as('consoleError');
          });
          cy.get('@date-picker').invoke('attr', label, null);
          cy.get('@consoleError').should('be.called');
        });
      });
    });

    describe('popover behavior', () => {
      it('should open calendar popover on button click', () => {
        cy.get(selector).should('not.exist');
        cy.get('@toggle').click().wait(500);
        cy.get(selector).should('exist');
      });

      it('should have correct order in navigation', () => {
        cy.get('@toggle').click().wait(500);

        cy.get('@navigation')
          .find('div:first-child')
          .should('have.class', 'air-datepicker-nav--title');
        cy.get('@navigation').find('div:nth-child(2)').should('have.attr', 'data-action', 'prev');
        cy.get('@navigation').find('div:nth-child(3)').should('have.attr', 'data-action', 'next');
      });

      it('should open year view when clicking on title', () => {
        cy.get('@toggle').click().wait(500);

        cy.get('@navigation').find('.air-datepicker-nav--title button').click();

        cy.get('@date-picker')
          .find('.air-datepicker-body.-years-')
          .should('exist')
          .should('not.have.class', '-hidden-');

        cy.get('@date-picker').find('.air-datepicker-body.-days-').should('have.class', '-hidden-');
      });

      it('should return focus to the input on Escape', () => {
        cy.get('@toggle').click();

        cy.get('@container')
          .find('.air-datepicker-cell.-day-:not(.-other-month-)')
          .first()
          .focus()
          .trigger('keydown', { key: 'Escape' })
          .wait(500);

        cy.focused().should('have.prop', 'tagName', 'INPUT');
      });
    });

    describe.only('l11n', () => {
      const START_DAY = 1;
      const END_DAY = 10;

      const s = new Date();
      const e = new Date();
      const ltrSeparator = DATE_FORMAT_RANGE_SEPARATOR;
      const rtlSeparator = `${UNICODE_BIDI.rtl}${DATE_FORMAT_RANGE_SEPARATOR}${UNICODE_BIDI.pop}`;

      s.setDate(START_DAY);
      e.setDate(END_DAY);

      // mock of the post-date-picker dateFormat getter and the iMask date format generation logic
      function dateFormat(locale: string) {
        const isBuddhistDate = locale.startsWith('th');
        const date = new Date(Object.values(DATE_FORMAT_MAP).join('-'));
        let localeDateString = date.toLocaleDateString(locale, DATE_FORMAT_STRING_OPTIONS);

        for (const [key, value] of Object.entries(DATE_FORMAT_MAP)) {
          localeDateString = localeDateString.replace(
            isBuddhistDate && value.length === 4 ? (Number(value) + 543).toString() : value,
            key,
          );
        }

        return localeDateString.replace('d', 'dd').replace('m', 'mm').replace('y', 'yyyy');
      }

      LOCALES_MAP.forEach(l11n => {
        describe(`Locale: ${l11n.locale} (${l11n.name})`, () => {
          it('should apply correct mask & date format based on the "locale" property', () => {
            const expectedMask = dateFormat(l11n.locale);
            const expectedStartDate = s.toLocaleDateString(l11n.locale, DATE_FORMAT_STRING_OPTIONS);
            const expectedEndDate = e.toLocaleDateString(l11n.locale, DATE_FORMAT_STRING_OPTIONS);
            const separator = l11n.dir === 'rtl' ? rtlSeparator : ltrSeparator;

            cy.get('@date-picker').invoke('attr', 'locale', l11n.locale);
            cy.get('@input').should('have.value', expectedMask);

            cy.get('@date-picker').invoke('attr', 'locale', l11n.locale);
            cy.get('@date-picker').shadow().find('[dir]').should('have.attr', 'dir', l11n.dir);

            cy.get('@toggle').click().wait(200);
            cy.get('@container').find(`[data-date="${START_DAY}"]`).first().click().wait(200);
            cy.get('@input').should('have.value', expectedStartDate);

            cy.get('@date-picker').invoke('attr', 'range', true);
            cy.get('@toggle').click().wait(200);
            cy.get('@container').find(`[data-date="${END_DAY}"]`).first().click().wait(200);
            cy.get('@input').should(
              'have.value',
              `${expectedStartDate}${separator}${expectedEndDate}`,
            );
          });
        });
      });
    });
  });

  describe('inline', () => {
    beforeEach(() => {
      cy.getComponent('date-picker', DATEPICKER_ID, 'inline');
      cy.get('@date-picker').shadow().find('.datepicker-container').as('container');
    });

    it('should render', () => {
      cy.get('@date-picker').should('exist');
      cy.get('@container').should('exist');
    });
  });

  describe('inline range', () => {
    beforeEach(() => {
      cy.getComponent('date-picker', DATEPICKER_ID, 'inline-range');
    });

    it('should render', () => {
      cy.get('@date-picker').should('exist');
    });
  });

  describe('range', () => {
    beforeEach(() => {
      cy.getComponent('date-picker', DATEPICKER_ID, 'range');
    });

    it('should render', () => {
      cy.get('@date-picker').should('exist');
    });
  });
});
