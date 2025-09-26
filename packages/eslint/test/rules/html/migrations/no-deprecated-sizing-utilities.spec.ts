import {
  rulePhase1,
  namePhase1,
  rulePhase2,
  namePhase2,
  data,
} from '../../../../src/rules/html/migrations/no-deprecated-sizing-utilities';
import { generatedDataTester } from '../../../utils/generated-data-tester';

const validData = ['w-sm-16', 'h-md-48', 'h-md-three-quarters'];

generatedDataTester(namePhase1, rulePhase1, data.mutationsPhase1, validData);
generatedDataTester(namePhase2, rulePhase2, data.mutationsPhase2, validData);
