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

// Phase-1 includes manual-only entries for the `rg` breakpoint.
// `generatedDataTester` handles those correctly: it omits `output` for tuples
// where the third element is `true`, verifying that no autofix is emitted.
generatedDataTester(namePhase1, rulePhase1, mutationsPhase1, validData);

// Phase-2 entries for `rg`-originated mutations target `_tmp-*-sm-*` temp class names.
// Those temp classes are never written in practice (since phase-1 for `rg` is manual-only),
// but the phase-2 rule itself is still tested against them to ensure the rule logic is correct.
generatedDataTester(namePhase2, rulePhase2, mutationsPhase2, validData);