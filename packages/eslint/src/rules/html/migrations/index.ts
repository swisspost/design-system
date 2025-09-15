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

export const htmlMigrationRules = {
  [noDeprecatedBtnRgRuleName]: noDeprecatedBtnRgRule,
  [noUnnumberedBorderRadiusRuleName]: noUnnumberedBorderRadiusRule,
  [noDeprecatedSpacingUtilitiesRulePhase1Name]: noDeprecatedSpacingUtilitiesRulePhase1,
  [noDeprecatedSpacingUtilitiesRulePhase2Name]: noDeprecatedSpacingUtilitiesRulePhase2,
};
