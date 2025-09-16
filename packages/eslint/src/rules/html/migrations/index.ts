import noDeprecatedBtnRgRule, { name as noDeprecatedBtnRgRuleName } from './no-deprecated-btn-rg';
import noUnnumberedBorderRadiusRule, {
  name as noUnnumberedBorderRadiusRuleName,
} from './no-unnumbered-border-radius';
import {
  rulePhase1 as noDeprecatedSpacingUtilitiesRulePhase1,
  rulePhase2 as noDeprecatedSpacingUtilitiesRulePhase2,
  namePhase1 as noDeprecatedSpacingUtilitiesRulePhase1Name,
  namePhase2 as noDeprecatedSpacingUtilitiesRulePhase2Name,
} from './no-deprecated-spacing-utilities';

import {
  rulePhase1 as noDeprecatedSizingUtilitiesRulePhase1,
  rulePhase2 as noDeprecatedSizingUtilitiesRulePhase2,
  namePhase1 as noDeprecatedSizingUtilitiesRulePhase1Name,
  namePhase2 as noDeprecatedSizingUtilitiesRulePhase2Name,
} from './no-deprecated-sizing-utilities';

export const htmlMigrationRules = {
  [noDeprecatedBtnRgRuleName]: noDeprecatedBtnRgRule,
  [noUnnumberedBorderRadiusRuleName]: noUnnumberedBorderRadiusRule,
  [noDeprecatedSpacingUtilitiesRulePhase1Name]: noDeprecatedSpacingUtilitiesRulePhase1,
  [noDeprecatedSpacingUtilitiesRulePhase2Name]: noDeprecatedSpacingUtilitiesRulePhase2,
  [noDeprecatedSizingUtilitiesRulePhase1Name]: noDeprecatedSizingUtilitiesRulePhase1,
  [noDeprecatedSizingUtilitiesRulePhase2Name]: noDeprecatedSizingUtilitiesRulePhase2,
};
