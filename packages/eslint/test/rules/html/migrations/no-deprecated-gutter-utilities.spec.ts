import { rules, data } from '../../../../src/rules/html/migrations/no-deprecated-gutter-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validClasses = ['g-sm-16', 'gx-md-48', 'gy-md-24'];

generatedDataTester(rules.namePhase1, rules.rulePhase1, data.mutationsPhase1, validClasses);
generatedDataTester(rules.namePhase2, rules.rulePhase2, data.mutationsPhase2, validClasses);
