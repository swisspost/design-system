import { rules, data } from '../../../../src/rules/html/migrations/no-deprecated-sizing-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validClasses = ['w-sm-16', 'h-md-48', 'h-md-three-quarters'];

generatedDataTester(rules[0].name, rules[0].rule, data.phases[0].mutations, validClasses);
generatedDataTester(rules[1].name, rules[1].rule, data.phases[1].mutations, validClasses);
