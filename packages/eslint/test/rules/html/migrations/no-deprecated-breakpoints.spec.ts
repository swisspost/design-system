import {
  rulePhase1,
  namePhase1,
  rulePhase2,
  namePhase2,
  mutationsPhase1,
  mutationsPhase2,
} from '../../../../src/rules/html/migrations/no-deprecated-breakpoints';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = ['col-4', 'flex-md-nowrap', 'gap-xl-4'];

generatedDataTester(namePhase1, rulePhase1, mutationsPhase1, validData);
generatedDataTester(namePhase2, rulePhase2, mutationsPhase2, validData);
