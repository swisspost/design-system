import { rules, data } from '../../../../src/rules/html/migrations/no-deprecated-gutter-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validClasses = ['g-sm-16', 'gx-md-48', 'gy-md-24'];

generatedDataTester(rules[0].name, rules[0].rule, data.phases[0].mutations, validClasses);
generatedDataTester(rules[1].name, rules[1].rule, data.phases[1].mutations, validClasses);
