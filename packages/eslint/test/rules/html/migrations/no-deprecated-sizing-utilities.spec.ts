import { rules, data } from '../../../../src/rules/html/migrations/no-deprecated-sizing-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = ['w-sm-16', 'h-md-48', 'h-md-three-quarters'];

generatedDataTester(rules.namePhase1, rules.rulePhase1, data.mutationsPhase1, validData);
generatedDataTester(rules.namePhase2, rules.rulePhase2, data.mutationsPhase2, validData);
