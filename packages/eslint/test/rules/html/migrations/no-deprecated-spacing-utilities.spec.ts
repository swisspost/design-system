import {
  rulePhase1,
  namePhase1,
  rulePhase2,
  namePhase2,
  data,
} from '../../../../src/rules/html/migrations/no-deprecated-spacing-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = ['mt-sm-16', 'pb-md-48'];

generatedDataTester(namePhase1, rulePhase1, data.mutationsPhase1, validData);
generatedDataTester(namePhase2, rulePhase2, data.mutationsPhase2, validData);
