import rule, { name, data } from '../../../../src/rules/html/migrations/no-deprecated-font-curves';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = ['fs-1', 'fs-4', 'fs-7', 'fs-9'];

generatedDataTester(name, rule, data, validData);
