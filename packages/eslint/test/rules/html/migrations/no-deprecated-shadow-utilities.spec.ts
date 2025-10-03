import rule, {
  name,
  data,
} from '../../../../src/rules/html/migrations/no-deprecated-shadow-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = ['elevation-none', 'elevation-200', 'elevation-400', 'elevation-500'];

generatedDataTester(name, rule, data, validData);
