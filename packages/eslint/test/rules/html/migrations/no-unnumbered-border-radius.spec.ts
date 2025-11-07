import rule, {
  data,
  name,
} from '../../../../src/rules/html/migrations/no-unnumbered-border-radius';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = [
  'rounded-4',
  'rounded-top-4',
  'rounded-bottom-4',
  'rounded-start-4',
  'rounded-end-4',
];

generatedDataTester(name, rule, data, validData);
