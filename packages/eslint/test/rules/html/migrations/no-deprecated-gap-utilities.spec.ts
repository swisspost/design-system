import { rules, data } from '../../../../src/rules/html/migrations/no-deprecated-gap-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validClasses = ['gap-sm-16', 'column-gap-md-48', 'row-gap-md-24'];

generatedDataTester(rules[0].name, rules[0].rule, data.phases[0].mutations, validClasses);
generatedDataTester(rules[1].name, rules[1].rule, data.phases[1].mutations, validClasses);
