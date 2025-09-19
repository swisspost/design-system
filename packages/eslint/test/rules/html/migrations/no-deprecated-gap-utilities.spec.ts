import { rules, data } from '../../../../src/rules/html/migrations/no-deprecated-gap-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validClasses = ['gap-sm-16', 'column-gap-md-48', 'row-gap-md-24'];

generatedDataTester(rules.namePhase1, rules.rulePhase1, data.mutationsPhase1, validClasses);
generatedDataTester(rules.namePhase2, rules.rulePhase2, data.mutationsPhase2, validClasses);
