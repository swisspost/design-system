import {
  BUDDHIST_CALENDAR_YEAR_OFFSET,
  BUDDHIST_CALENDAR_LOCALES,
  UNICODE_BIDI,
} from '../../../src/utils/locales';
import {
  DATE_FORMAT_MAP,
  DATE_FORMAT_STRING_OPTIONS,
} from '../../../src/components/post-date-picker/constants';

// Test only the locales containing a language,
// which is supported by the air-datepicker
// Find the list of localeCodes used as source for the map here: https://simplelocalize.io/data/locales/
// prettier-ignore
//                                                            | Expected Format              | Expected Dir | Comment |
//                                                            | :--------------------------- | :----------- | :------ |
const localesMap = [
  { locale: 'ar', name: 'Arabic' },                                                    // | 'dd‏/mm‏/yyyy' | rtl          ||
  { locale: 'bg', name: 'Bulgarian' },                                                 // | 'dd.mm.yyyy r.'              | ltr          ||
  { locale: 'ca', name: 'Catalan' },                                                   // | 'dd/mm/yyyy'.                | ltr          ||
  { locale: 'cs', name: 'Czech' },                                                     // | 'dd. mm. yyyy'               | ltr          ||
  { locale: 'da', name: 'Danish' },                                                    // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'de', name: 'German' },                                                    // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'el', name: 'Greek' },                                                     // | 'dd/mm/yyyy'.                | ltr          ||
  { locale: 'en', name: 'English' },                                                   // | 'mm/dd/yyyy'.                | ltr          ||
  { locale: 'es', name: 'Spanish' },                                                   // | 'dd/mm/yyyy'.                | ltr          ||
  { locale: 'eu', name: 'Basque' },                                                    // | 'yyyy/mm/dd'.                | ltr          ||
  { locale: 'fi', name: 'Finnish' },                                                   // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'fr', name: 'French' },                                                    // | 'dd/mm/yyyy'.                | ltr          ||
  { locale: 'hr', name: 'Croatian' },                                                  // | 'dd. mm. yyyy.'.             | ltr          ||
  { locale: 'hu', name: 'Hungarian' },                                                 // | 'yyyy. mm. dd.'.             | ltr          ||
  { locale: 'id', name: 'Indonesian' },                                                // | 'dd/mm/yyyy'.                | ltr          ||
  { locale: 'it', name: 'Italian' },                                                   // | 'dd/mm/yyyy'.                | ltr          ||
  { locale: 'ja', name: 'Japanese' },                                                  // | 'yyyy/mm/dd'.                | ltr          ||
  { locale: 'ko', name: 'Korean' },                                                    // | 'yyyy. mm. dd.'.             | ltr          ||
  { locale: 'nb', name: 'Norwegian Bokmål' },                                          // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'nl', name: 'Dutch' },                                                     // | 'dd-mm-yyyy'.                | ltr          ||
  { locale: 'pl', name: 'Polish' },                                                    // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'pt', name: 'Portuguese' },                                                // | 'dd/mm/yyyy'.                | ltr          ||
  { locale: 'ro', name: 'Romanian' },                                                  // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'ru', name: 'Russian' },                                                   // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'si', name: 'Sinhala' },                                                   // | 'yyyy-mm-dd'.                | ltr          ||
  { locale: 'sk', name: 'Slovak' },                                                    // | 'dd. mm. yyyy'.              | ltr          ||
  { locale: 'sl', name: 'Slovenian' },                                                 // | 'dd. mm. yyyy'.              | ltr          ||
  { locale: 'sv', name: 'Swedish' },                                                   // | 'yyyy-mm-dd'.                | ltr          ||
  { locale: 'th', name: 'Thai' },                                                      // | 'dd/mm/yyyy'.                | ltr          ||
  { locale: 'tr', name: 'Turkish' },                                                   // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'uk', name: 'Ukrainian' },                                                 // | 'dd.mm.yyyy'.                | ltr          ||
  { locale: 'zh', name: 'Chinese' },                                                   // | 'yyyy/mm/dd'.                | ltr          ||
  { locale: 'aa-ER', name: 'Afar (Eritrea)' },                                         // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'af-NA', name: 'Afrikaans (Namibia)' },                                    // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'af-ZA', name: 'Afrikaans (South Africa)' },                               // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'am-ET', name: 'Amharic (Ethiopia)' },                                     // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ar-AE', name: 'Arabic (United Arab Emirates)' },                          // | 'dd‏/mm‏/yyyy' | rtl          ||
  { locale: 'ar-BH', name: 'Arabic (Bahrain)', exclude: true },                        // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-DJ', name: 'Arabic (Djibouti)', exclude: true },                       // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-DZ', name: 'Arabic (Algeria)' },                                       // | 'dd‏/mm‏/yyyy' | rtl          ||
  { locale: 'ar-EG', name: 'Arabic (Egypt)', exclude: true },                          // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-ER', name: 'Arabic (Eritrea)', exclude: true },                        // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-IL', name: 'Arabic (Israel)', exclude: true },                         // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-IQ', name: 'Arabic (Iraq)', exclude: true },                           // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-JO', name: 'Arabic (Jordan)', exclude: true },                         // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-KM', name: 'Arabic (Comoros)', exclude: true },                        // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-KW', name: 'Arabic (Kuwait)', exclude: true },                         // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-LB', name: 'Arabic (Lebanon)', exclude: true },                        // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-LY', name: 'Arabic (Libya)' },                                         // | 'dd‏/mm‏/yyyy' | rtl          ||
  { locale: 'ar-MA', name: 'Arabic (Morocco)' },                                       // | 'dd‏/mm‏/yyyy' | rtl          ||
  { locale: 'ar-MR', name: 'Arabic (Mauritania)', exclude: true },                     // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-OM', name: 'Arabic (Oman)', exclude: true },                           // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-PS', name: 'Arabic (Palestine)', exclude: true },                      // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-QA', name: 'Arabic (Qatar)', exclude: true },                          // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-SA', name: 'Arabic (Saudi Arabia)', exclude: true },                   // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-SD', name: 'Arabic (Sudan)', exclude: true },                          // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-SO', name: 'Arabic (Somalia)', exclude: true },                        // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-SY', name: 'Arabic (Syria)', exclude: true },                          // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-TD', name: 'Arabic (Chad)', exclude: true },                           // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ar-TN', name: 'Arabic (Tunisia)' },                                       // | 'dd‏/mm‏/yyyy' | rtl          ||
  { locale: 'ar-YE', name: 'Arabic (Yemen)', exclude: true },                          // | '٢٢‏/١١‏/٣٣٣٣' | rtl          | ⚠️ BUGGY ⚠️ |
  { locale: 'ay-BO', name: 'Aymara (Bolivia)' },                                       // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'az-AZ', name: 'Azerbaijani (Azerbaijan)' },                               // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'be-BY', name: 'Belarusian (Belarus)' },                                   // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'bg-BG', name: 'Bulgarian (Bulgaria)' },                                   // | 'dd.mm.yyyy r.'              | ltr          ||
  { locale: 'bi-VU', name: 'Bislama (Vanuatu)' },                                      // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'bn-BD', name: 'Bengali (Bangladesh)', exclude: true },                    // | '২২/১১/৩৩৩৩'                 | ltr          | ⚠️ BUGGY ⚠️, Language not supported by Air-DatePicker |
  { locale: 'bs-BA', name: 'Bosnian (Bosnia and Herzegovina)' },                       // | 'dd. mm. yyyy.'              | ltr          | Language not supported by Air-DatePicker |
  { locale: 'bs-ME', name: 'Bosnian (Montenegro)' },                                   // | 'dd. mm. yyyy.'              | ltr          | Language not supported by Air-DatePicker |
  { locale: 'byn-ER', name: 'Bilen (Eritrea)' },                                       // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ca-AD', name: 'Catalan (Andorra)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'ch-GU', name: 'Chamorro (Guam)' },                                        // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ch-MP', name: 'Chamorro (Northern Mariana Islands)' },                    // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'cs-CZ', name: 'Czech (Czechia)' },                                        // | 'dd. mm. yyyy'               | ltr          ||
  { locale: 'da-DK', name: 'Danish (Denmark)' },                                       // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'de-AT', name: 'German (Austria)' },                                       // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'de-BE', name: 'German (Belgium)' },                                       // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'de-CH', name: 'German (Switzerland)' },                                   // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'de-DE', name: 'German (Germany)' },                                       // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'de-LI', name: 'German (Liechtenstein)' },                                 // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'de-LU', name: 'German (Luxembourg)' },                                    // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'de-VA', name: 'German (Vatican City)' },                                  // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'dv-MV', name: 'Divehi (Maldives)' },                                      // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'dz-BT', name: 'Dzongkha (Bhutan)' },                                      // | 'ལལལལ-ཡཡ-རར'                  | ltr          | Language not supported by Air-DatePicker |
  { locale: 'el-CY', name: 'Greek (Cyprus)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'el-GR', name: 'Greek (Greece)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-AG', name: 'English (Antigua and Barbuda)' },                          // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-AI', name: 'English (Anguilla)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-AQ', name: 'English (Antarctica)' },                                   // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-AS', name: 'English (American Samoa)' },                               // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-AU', name: 'English (Australia)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-BB', name: 'English (Barbados)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-BM', name: 'English (Bermuda)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-BS', name: 'English (Bahamas)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-BW', name: 'English (Botswana)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-BZ', name: 'English (Belize)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-CA', name: 'English (Canada)' },                                       // | 'yyyy-mm-dd'                 | ltr          ||
  { locale: 'en-CC', name: 'English (Cocos (Keeling) Islands)' },                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-CK', name: 'English (Cook Islands)' },                                 // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-CM', name: 'English (Cameroon)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-CW', name: 'English (Curaçao)' },                                      // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-CX', name: 'English (Christmas Island)' },                             // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-DM', name: 'English (Dominica)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-ER', name: 'English (Eritrea)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-FJ', name: 'English (Fiji)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-FK', name: 'English (Falkland Islands)' },                             // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-FM', name: 'English (Micronesia)' },                                   // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-GB', name: 'English (United Kingdom)' },                               // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-GD', name: 'English (Grenada)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-GG', name: 'English (Guernsey)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-GH', name: 'English (Ghana)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-GI', name: 'English (Gibraltar)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-GM', name: 'English (Gambia)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-GS', name: 'English (South Georgia and the South Sandwich Islands)' }, // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-GU', name: 'English (Guam)' },                                         // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-GY', name: 'English (Guyana)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-HK', name: 'English (Hong Kong)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-HM', name: 'English (Heard Island and McDonald Islands)' },            // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-IE', name: 'English (Ireland)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-IM', name: 'English (Isle of Man)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-IN', name: 'English (India)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-IO', name: 'English (British Indian Ocean Territory)' },               // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-JE', name: 'English (Jersey)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-JM', name: 'English (Jamaica)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-KE', name: 'English (Kenya)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-KI', name: 'English (Kiribati)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-KN', name: 'English (Saint Kitts and Nevis)' },                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-KY', name: 'English (Cayman Islands)' },                               // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-LC', name: 'English (Saint Lucia)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-LR', name: 'English (Liberia)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-LS', name: 'English (Lesotho)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-MF', name: 'English (Saint Martin)' },                                 // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-MH', name: 'English (Marshall Islands)' },                             // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-MP', name: 'English (Northern Mariana Islands)' },                     // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-MS', name: 'English (Montserrat)' },                                   // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-MT', name: 'English (Malta)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-MU', name: 'English (Mauritius)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-MW', name: 'English (Malawi)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-NA', name: 'English (Namibia)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-NF', name: 'English (Norfolk Island)' },                               // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-NG', name: 'English (Nigeria)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-NR', name: 'English (Nauru)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-NU', name: 'English (Niue)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-NZ', name: 'English (New Zealand)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-PG', name: 'English (Papua New Guinea)' },                             // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-PH', name: 'English (Philippines)' },                                  // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-PK', name: 'English (Pakistan)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-PN', name: 'English (Pitcairn Islands)' },                             // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-PR', name: 'English (Puerto Rico)' },                                  // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-PW', name: 'English (Palau)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-RW', name: 'English (Rwanda)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SB', name: 'English (Solomon Islands)' },                              // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SC', name: 'English (Seychelles)' },                                   // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SD', name: 'English (Sudan)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SG', name: 'English (Singapore)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SH', name: 'English (Saint Helena, Ascension and Tristan da Cunha)' }, // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SL', name: 'English (Sierra Leone)' },                                 // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SS', name: 'English (South Sudan)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SX', name: 'English (Sint Maarten)' },                                 // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-SZ', name: 'English (Eswatini)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-TC', name: 'English (Turks and Caicos Islands)' },                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-TK', name: 'English (Tokelau)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-TO', name: 'English (Tonga)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-TT', name: 'English (Trinidad and Tobago)' },                          // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-TV', name: 'English (Tuvalu)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-TZ', name: 'English (Tanzania)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-UG', name: 'English (Uganda)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-UM', name: 'English (United States Minor Outlying Islands)' },         // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-US', name: 'English (United States)' },                                // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-VC', name: 'English (Saint Vincent and the Grenadines)' },             // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-VG', name: 'English (British Virgin Islands)' },                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-VI', name: 'English (U.S. Virgin Islands)' },                          // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'en-VU', name: 'English (Vanuatu)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-WS', name: 'English (Samoa)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-ZA', name: 'English (South Africa)' },                                 // | 'yyyy/mm/dd'                 | ltr          ||
  { locale: 'en-ZM', name: 'English (Zambia)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'en-ZW', name: 'English (Zimbabwe)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-AR', name: 'Spanish (Argentina)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-BO', name: 'Spanish (Bolivia)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-BZ', name: 'Spanish (Belize)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-CL', name: 'Spanish (Chile)' },                                        // | 'dd-mm-yyyy'                 | ltr          ||
  { locale: 'es-CO', name: 'Spanish (Colombia)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-CR', name: 'Spanish (Costa Rica)' },                                   // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-CU', name: 'Spanish (Cuba)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-DO', name: 'Spanish (Dominican Republic)' },                           // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-EC', name: 'Spanish (Ecuador)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-EH', name: 'Spanish (Western Sahara)' },                               // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-ES', name: 'Spanish (Spain)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-GQ', name: 'Spanish (Equatorial Guinea)' },                            // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-GT', name: 'Spanish (Guatemala)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-GU', name: 'Spanish (Guam)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-HN', name: 'Spanish (Honduras)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-MX', name: 'Spanish (Mexico)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-NI', name: 'Spanish (Nicaragua)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-PA', name: 'Spanish (Panama)' },                                       // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'es-PE', name: 'Spanish (Peru)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-PR', name: 'Spanish (Puerto Rico)' },                                  // | 'mm/dd/yyyy'                 | ltr          ||
  { locale: 'es-PY', name: 'Spanish (Paraguay)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-SV', name: 'Spanish (El Salvador)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-UY', name: 'Spanish (Uruguay)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'es-VE', name: 'Spanish (Venezuela)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'et-EE', name: 'Estonian (Estonia)' },                                     // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'fa-IR', name: 'Persian (Farsi) (Iran)', exclude: true },                  // | '۲۷۱۲/۰۹/۰۱'                 | ltr          | ⚠️ BUGGY ⚠️, Language not supported by Air-DatePicker |
  { locale: 'fan-GQ', name: 'Fang (Equatorial Guinea)' },                              // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ff-BF', name: 'Fula (Burkina Faso)' },                                    // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ff-GN', name: 'Fula (Guinea)' },                                          // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'fi-FI', name: 'Finnish (Finland)' },                                      // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'fj-FJ', name: 'Fijian (Fiji)' },                                          // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'fo-FO', name: 'Faroese (Faroe Islands)' },                                // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'fr-BE', name: 'French (Belgium)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-BF', name: 'French (Burkina Faso)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-BI', name: 'French (Burundi)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-BJ', name: 'French (Benin)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-BL', name: 'French (Saint Barthélemy)' },                              // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-CA', name: 'French (Canada)' },                                        // | 'yyyy-mm-dd'                 | ltr          ||
  { locale: 'fr-CD', name: 'French (Democratic Republic of the Congo)' },              // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-CF', name: 'French (Central African Republic)' },                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-CG', name: 'French (Republic of the Congo)' },                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-CH', name: 'French (Switzerland)' },                                   // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'fr-CI', name: 'French (Côte d’Ivoire)' },                                 // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-CM', name: 'French (Cameroon)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-DJ', name: 'French (Djibouti)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-FR', name: 'French (France)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-GA', name: 'French (Gabon)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-GF', name: 'French (French Guiana)' },                                 // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-GG', name: 'French (Guernsey)' },                                      // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-GN', name: 'French (Guinea)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-GP', name: 'French (Guadeloupe)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-GQ', name: 'French (Equatorial Guinea)' },                             // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-HT', name: 'French (Haiti)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-JE', name: 'French (Jersey)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-KM', name: 'French (Comoros)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-LB', name: 'French (Lebanon)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-LU', name: 'French (Luxembourg)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-MC', name: 'French (Monaco)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-MF', name: 'French (Saint Martin)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-MG', name: 'French (Madagascar)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-ML', name: 'French (Mali)' },                                          // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-MQ', name: 'French (Martinique)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-NC', name: 'French (New Caledonia)' },                                 // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-NE', name: 'French (Niger)' },                                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-PF', name: 'French (French Polynesia)' },                              // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-PM', name: 'French (Saint Pierre and Miquelon)' },                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-RE', name: 'French (Réunion)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-RW', name: 'French (Rwanda)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-SC', name: 'French (Seychelles)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-SN', name: 'French (Senegal)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-TD', name: 'French (Chad)' },                                          // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-TF', name: 'French (French Southern Territories)' },                   // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-TG', name: 'French (Togo)' },                                          // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-VA', name: 'French (Vatican City)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-VU', name: 'French (Vanuatu)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-WF', name: 'French (Wallis and Futuna)' },                             // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'fr-YT', name: 'French (Mayotte)' },                                       // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'ga-IE', name: 'Irish (Ireland)' },                                        // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'gn-AR', name: 'Guaraní (Argentina)' },                                    // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'gn-PY', name: 'Guaraní (Paraguay)' },                                     // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'gv-IM', name: 'Manx (Isle of Man)' },                                     // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'he-IL', name: 'Hebrew (modern) (Israel)' },                               // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'hi-IN', name: 'Hindi (India)' },                                          // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'hif-FJ', name: 'Fiji Hindi (Fiji)' },                                     // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'hr-BA', name: 'Croatian (Bosnia and Herzegovina)' },                      // | 'dd. mm. yyyy.'              | ltr          ||
  { locale: 'hr-HR', name: 'Croatian (Croatia)' },                                     // | 'dd. mm. yyyy.'              | ltr          ||
  { locale: 'hr-ME', name: 'Croatian (Montenegro)' },                                  // | 'dd. mm. yyyy.'              | ltr          ||
  { locale: 'ht-HT', name: 'Haitian (Haiti)' },                                        // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'hu-HU', name: 'Hungarian (Hungary)' },                                    // | 'yyyy. mm. dd.'              | ltr          ||
  { locale: 'hy-AM', name: 'Armenian (Armenia)' },                                     // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'hy-CY', name: 'Armenian (Cyprus)' },                                      // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'id-ID', name: 'Indonesian (Indonesia)' },                                 // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'is-IS', name: 'Icelandic (Iceland)' },                                    // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'it-CH', name: 'Italian (Switzerland)' },                                  // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'it-IT', name: 'Italian (Italy)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'it-SM', name: 'Italian (San Marino)' },                                   // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'it-VA', name: 'Italian (Vatican City)' },                                 // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'ja-JP', name: 'Japanese (Japan)' },                                       // | 'yyyy/mm/dd'                 | ltr          ||
  { locale: 'ka-GE', name: 'Georgian (Georgia)' },                                     // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'kg-CD', name: 'Kongo (Democratic Republic of the Congo)' },               // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'kk-KZ', name: 'Kazakh (Kazakhstan)' },                                    // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'kl-GL', name: 'Greenlandic (Greenland)' },                                // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'km-KH', name: 'Khmer (Cambodia)' },                                       // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ko-KP', name: 'Korean (North Korea)' },                                   // | 'yyyy. mm. dd.'              | ltr          ||
  { locale: 'ko-KR', name: 'Korean (South Korea)' },                                   // | 'yyyy. mm. dd.'              | ltr          ||
  { locale: 'ku-IQ', name: 'Kurdish (Iraq)' },                                         // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'kun-ER', name: 'Kunama (Eritrea)' },                                      // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ky-KG', name: 'Kyrgyz (Kyrgyzstan)' },                                    // | 'yyyy-dd-mm'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'la-VA', name: 'Latin (Vatican City)' },                                   // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'lb-LU', name: 'Luxembourgish (Luxembourg)' },                             // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ln-CD', name: 'Lingala (Democratic Republic of the Congo)' },             // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ln-CG', name: 'Lingala (Republic of the Congo)' },                        // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'lo-LA', name: 'Lao (Laos)' },                                             // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'lt-LT', name: 'Lithuanian (Lithuania)' },                                 // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'lu-CD', name: 'Luba-Katanga (Democratic Republic of the Congo)' },        // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'lv-LV', name: 'Latvian (Latvia)' },                                       // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'mg-MG', name: 'Malagasy (Madagascar)' },                                  // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'mh-MH', name: 'Marshallese (Marshall Islands)' },                         // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'mi-NZ', name: 'Māori (New Zealand)' },                                    // | 'dd-mm-yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'mk-MK', name: 'Macedonian (North Macedonia)' },                           // | 'dd.mm.yyyy r.'              | ltr          | Language not supported by Air-DatePicker |
  { locale: 'mn-MN', name: 'Mongolian (Mongolia)' },                                   // | 'yyyy.mm.dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ms-BN', name: 'Malay (Brunei)' },                                         // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ms-MY', name: 'Malay (Malaysia)' },                                       // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ms-SG', name: 'Malay (Singapore)' },                                      // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'mt-MT', name: 'Maltese (Malta)' },                                        // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'my-MM', name: 'Burmese (Myanmar)' },                                      // | '၂၂/၁၁/၃၃၃၃'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'na-NR', name: 'Nauruan (Nauru)' },                                        // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'nb-BV', name: 'Norwegian Bokmål (Bouvet Island)' },                       // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'nb-NO', name: 'Norwegian Bokmål (Norway)' },                              // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'nd-ZW', name: 'Northern Ndebele (Zimbabwe)' },                            // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ne-NP', name: 'Nepali (Nepal)' },                                         // | '३३३३-११-२२'                   | ltr          | Language not supported by Air-DatePicker |
  { locale: 'nl-AW', name: 'Dutch (Aruba)' },                                          // | 'dd-mm-yyyy'                 | ltr          ||
  { locale: 'nl-BE', name: 'Dutch (Belgium)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'nl-BQ', name: 'Dutch (Caribbean Netherlands)' },                          // | 'dd-mm-yyyy'                 | ltr          ||
  { locale: 'nl-CW', name: 'Dutch (Curaçao)' },                                        // | 'dd-mm-yyyy'                 | ltr          ||
  { locale: 'nl-MF', name: 'Dutch (Saint Martin)' },                                   // | 'dd-mm-yyyy'                 | ltr          ||
  { locale: 'nl-NL', name: 'Dutch (Netherlands)' },                                    // | 'dd-mm-yyyy'                 | ltr          ||
  { locale: 'nl-SR', name: 'Dutch (Suriname)' },                                       // | 'dd-mm-yyyy'                 | ltr          ||
  { locale: 'nl-SX', name: 'Dutch (Sint Maarten)' },                                   // | 'dd-mm-yyyy'                 | ltr          ||
  { locale: 'nn-BV', name: 'Norwegian Nynorsk (Bouvet Island)' },                      // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'nn-NO', name: 'Norwegian Nynorsk (Norway)' },                             // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'no-BV', name: 'Norwegian (Bouvet Island)' },                              // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'no-NO', name: 'Norwegian (Norway)' },                                     // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'no-SJ', name: 'Norwegian (Svalbard and Jan Mayen)' },                     // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'nr-ZA', name: 'Southern Ndebele (South Africa)' },                        // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'nrb-ER', name: 'Nara (Eritrea)' },                                        // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ny-MW', name: 'Chichewa (Malawi)' },                                      // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'pa-AW', name: '(Eastern) Punjabi (Aruba)' },                              // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'pa-CW', name: '(Eastern) Punjabi (Curaçao)' },                            // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'pl-PL', name: 'Polish (Poland)' },                                        // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ps-AF', name: 'Pashto (Afghanistan)', exclude: true },                    // | '۲۷۱۲-۰۹-۰۱'                 | ltr          | ⚠️ BUGGY ⚠️, Language not supported by Air-DatePicker |
  { locale: 'pt-AO', name: 'Portuguese (Angola)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-BR', name: 'Portuguese (Brazil)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-CV', name: 'Portuguese (Cape Verde)' },                                // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-GQ', name: 'Portuguese (Equatorial Guinea)' },                         // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-GW', name: 'Portuguese (Guinea-Bissau)' },                             // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-MO', name: 'Portuguese (Macao)' },                                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-MZ', name: 'Portuguese (Mozambique)' },                                // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-PT', name: 'Portuguese (Portugal)' },                                  // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-ST', name: 'Portuguese (São Tomé and Príncipe)' },                     // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'pt-TL', name: 'Portuguese (Timor-Leste)' },                               // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'qu-BO', name: 'Quechua (Bolivia)' },                                      // | 'dd-mm-yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'rar-CK', name: 'Cook Islands Māori (Cook Islands)' },                     // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'rm-CH', name: 'Romansh (Switzerland)' },                                  // | 'dd-mm-yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'rn-BI', name: 'Kirundi (Burundi)' },                                      // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ro-MD', name: 'Romanian (Moldova)' },                                     // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ro-RO', name: 'Romanian (Romania)' },                                     // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'rtm-FJ', name: 'Rotuman (Fiji)' },                                        // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ru-AQ', name: 'Russian (Antarctica)' },                                   // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ru-BY', name: 'Russian (Belarus)' },                                      // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ru-KG', name: 'Russian (Kyrgyzstan)' },                                   // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ru-KZ', name: 'Russian (Kazakhstan)' },                                   // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ru-RU', name: 'Russian (Russia)' },                                       // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ru-TJ', name: 'Russian (Tajikistan)' },                                   // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ru-TM', name: 'Russian (Turkmenistan)' },                                 // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ru-UZ', name: 'Russian (Uzbekistan)' },                                   // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'rw-RW', name: 'Kinyarwanda (Rwanda)' },                                   // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sg-CF', name: 'Sango (Central African Republic)' },                       // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'si-LK', name: 'Sinhalese (Sri Lanka)' },                                  // | 'yyyy-mm-dd'                 | ltr          ||
  { locale: 'sk-CZ', name: 'Slovak (Czechia)' },                                       // | 'dd. mm. yyyy'               | ltr          ||
  { locale: 'sk-SK', name: 'Slovak (Slovakia)' },                                      // | 'dd. mm. yyyy'               | ltr          ||
  { locale: 'sl-SI', name: 'Slovene (Slovenia)' },                                     // | 'dd. mm. yyyy'               | ltr          ||
  { locale: 'sm-AS', name: 'Samoan (American Samoa)' },                                // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sm-WS', name: 'Samoan (Samoa)' },                                         // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sn-ZW', name: 'Shona (Zimbabwe)' },                                       // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'so-SO', name: 'Somali (Somalia)' },                                       // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sq-AL', name: 'Albanian (Albania)' },                                     // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sq-ME', name: 'Albanian (Montenegro)' },                                  // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sq-XK', name: 'Albanian (Kosovo)' },                                      // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sr-BA', name: 'Serbian (Bosnia and Herzegovina)' },                       // | 'dd.mm.yyyy.'                | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sr-ME', name: 'Serbian (Montenegro)' },                                   // | 'dd.mm.yyyy.'                | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sr-RS', name: 'Serbian (Serbia)' },                                       // | 'dd.mm.yyyy.'                | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sr-XK', name: 'Serbian (Kosovo)' },                                       // | 'dd.mm.yyyy.'                | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ss-SZ', name: 'Swati (Eswatini)' },                                       // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ss-ZA', name: 'Swati (South Africa)' },                                   // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ssy-ER', name: 'Saho (Eritrea)' },                                        // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'st-LS', name: 'Southern Sotho (Lesotho)' },                               // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'st-ZA', name: 'Southern Sotho (South Africa)' },                          // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sv-AX', name: 'Swedish (Åland Islands)' },                                // | 'yyyy-mm-dd'                 | ltr          ||
  { locale: 'sv-FI', name: 'Swedish (Finland)' },                                      // | 'yyyy-mm-dd'                 | ltr          ||
  { locale: 'sv-SE', name: 'Swedish (Sweden)' },                                       // | 'yyyy-mm-dd'                 | ltr          ||
  { locale: 'sw-CD', name: 'Swahili (Democratic Republic of the Congo)' },             // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sw-KE', name: 'Swahili (Kenya)' },                                        // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sw-TZ', name: 'Swahili (Tanzania)' },                                     // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'sw-UG', name: 'Swahili (Uganda)' },                                       // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ta-LK', name: 'Tamil (Sri Lanka)' },                                      // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'ta-SG', name: 'Tamil (Singapore)' },                                      // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'tg-TJ', name: 'Tajik (Tajikistan)' },                                     // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'th-TH', name: 'Thai (Thailand)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'ti-ER', name: 'Tigrinya (Eritrea)' },                                     // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'tig-ER', name: 'Tigre (Eritrea)' },                                       // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'tk-AF', name: 'Turkmen (Afghanistan)' },                                  // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'tk-TM', name: 'Turkmen (Turkmenistan)' },                                 // | 'dd.mm.yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'tn-BW', name: 'Tswana (Botswana)' },                                      // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'tn-ZA', name: 'Tswana (South Africa)' },                                  // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'to-TO', name: 'Tonga (Tonga Islands) (Tonga)' },                          // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'tr-CY', name: 'Turkish (Cyprus)' },                                       // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'tr-TR', name: 'Turkish (Turkey)' },                                       // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ts-ZA', name: 'Tsonga (South Africa)' },                                  // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'uk-UA', name: 'Ukrainian (Ukraine)' },                                    // | 'dd.mm.yyyy'                 | ltr          ||
  { locale: 'ur-PK', name: 'Urdu (Pakistan)' },                                        // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'uz-AF', name: 'Uzbek (Afghanistan)', exclude: true },                     // | '۲۷۱۲-۰۹-۰۱'                 | ltr          | ⚠️ BUGGY ⚠️, Language not supported by Air-DatePicker |
  { locale: 'uz-UZ', name: 'Uzbek (Uzbekistan)' },                                     // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 've-ZA', name: 'Venda (South Africa)' },                                   // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'vi-VN', name: 'Vietnamese (Vietnam)' },                                   // | 'dd/mm/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'xh-ZA', name: 'Xhosa (South Africa)' },                                   // | 'mm/dd/yyyy'                 | ltr          | Language not supported by Air-DatePicker |
  { locale: 'zh-CN', name: 'Chinese (China)' },                                        // | 'yyyy/mm/dd'                 | ltr          ||
  { locale: 'zh-HK', name: 'Chinese (Hong Kong)' },                                    // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'zh-MO', name: 'Chinese (Macao)' },                                        // | 'dd/mm/yyyy'                 | ltr          ||
  { locale: 'zh-SG', name: 'Chinese (Singapore)', exclude: true },                     // | 'yyyy年mm月dd日'              | ltr          | ⚠️ BUGGY ⚠️ |
  { locale: 'zh-TW', name: 'Chinese (Taiwan)' },                                       // | 'yyyy/mm/dd'                 | ltr          ||
  { locale: 'zu-ZA', name: 'Zulu (South Africa)' },                                    // | 'yyyy-mm-dd'                 | ltr          | Language not supported by Air-DatePicker |
];

// A mock of the post-date-picker dateFormat getter and the iMask date format logic
function dateFormat(locale: string) {
  const date = new Date(Object.values(DATE_FORMAT_MAP).join('-'));
  let localeDateString = date.toLocaleDateString(locale, DATE_FORMAT_STRING_OPTIONS);

  for (const [key, value] of Object.entries(DATE_FORMAT_MAP)) {
    localeDateString = localeDateString.replace(
      BUDDHIST_CALENDAR_LOCALES.includes(locale) && value.length === 4
        ? (Number(value) + BUDDHIST_CALENDAR_YEAR_OFFSET).toString()
        : value,
      key,
    );
  }

  return localeDateString.replace('d', 'dd').replace('m', 'mm').replace('y', 'yyyy');
}

// A mock of the post-date-picker textDirection getter
function textDirection(locale: string) {
  return new Date()
    .toLocaleDateString(locale, DATE_FORMAT_STRING_OPTIONS)
    .includes(UNICODE_BIDI.rtl)
    ? 'rtl'
    : 'ltr';
}

type I18nObject = {
  locale: string;
  dir: string;
  mask: string;
  names: string[];
  locales: string[];
};

export const LOCALES_MAP = Object.values(
  localesMap
    .filter(i18n => !i18n.exclude)
    .map(i18n => ({
      ...i18n,
      dir: textDirection(i18n.locale),
      mask: dateFormat(i18n.locale),
    }))
    .reduce(
      (locales, i18n) => {
        const key = `${i18n.mask}__${i18n.dir}`;

        if (locales[key]) {
          locales[key].names.push(i18n.name);
          locales[key].locales.push(i18n.locale);
        } else {
          locales[key] = {
            locale: i18n.locale,
            dir: i18n.dir,
            mask: i18n.mask,
            names: [i18n.name],
            locales: [i18n.locale],
          };
        }

        return locales;
      },
      {} as Record<string, I18nObject>,
    ),
) as I18nObject[];
