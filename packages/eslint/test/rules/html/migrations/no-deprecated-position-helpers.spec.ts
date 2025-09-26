import rule, {
  name,
  data,
} from '../../../../src/rules/html/migrations/no-deprecated-position-helpers';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = [
  'position-fixed top-0 start-0 end-0 z-fixed',
  'position-fixed bottom-0 start-0 end-0 z-fixed',
  'position-sticky top-0 z-header',
  'position-sticky bottom-0 z-header',
];

generatedDataTester(name, rule, data, validData);
