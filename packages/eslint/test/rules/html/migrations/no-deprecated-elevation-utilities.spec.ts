import rule, {
  name,
  data,
} from '../../../../src/rules/html/migrations/no-deprecated-elevation-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = [
  'elevation-100',
  'elevation-200',
  'elevation-300',
  'elevation-400',
  'elevation-500',
];

generatedDataTester(name, rule, data, validData);
