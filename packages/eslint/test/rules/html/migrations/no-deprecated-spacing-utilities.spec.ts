import { rules, data } from '../../../../src/rules/html/migrations/no-deprecated-spacing-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validClasses = ['mt-sm-16', 'pb-md-48'];

generatedDataTester(rules[0].name, rules[0].rule, data.phases[0].mutations, validClasses);
generatedDataTester(rules[1].name, rules[1].rule, data.phases[1].mutations, validClasses);
