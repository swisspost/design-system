import { rules, data } from '../../../../src/rules/html/migrations/no-deprecated-spacing-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = ['mt-sm-16', 'pb-md-48'];

generatedDataTester(rules.namePhase1, rules.rulePhase1, data.mutationsPhase1, validData);
generatedDataTester(rules.namePhase2, rules.rulePhase2, data.mutationsPhase2, validData);
