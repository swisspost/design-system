import {
  rulePhase1,
  namePhase1,
  rulePhase2,
  namePhase2,
  data,
} from '../../../../src/rules/html/migrations/no-deprecated-gutter-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validClasses = ['g-sm-16', 'gx-md-48', 'gy-md-24'];

generatedDataTester(namePhase1, rulePhase1, data.mutationsPhase1, validClasses);
generatedDataTester(namePhase2, rulePhase2, data.mutationsPhase2, validClasses);
