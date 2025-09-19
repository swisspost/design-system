import rule, { data, name } from '../../../../src/rules/html/migrations/no-deprecated-loader';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = ['spinner', 'spinner-modal', 'spinner-16', 'spinner-40'];

generatedDataTester(name, rule, data, validData);
