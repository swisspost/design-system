import noDeprecatedBtnRgRule, { name as noDeprecatedBtnRgRuleName } from './no-deprecated-btn-rg';
import noDeprecatedLoaderRule, { name as noDeprecatedLoaderRuleName } from './no-deprecated-loader';
import noUnnumberedBorderRadiusRule, {
  name as noUnnumberedBorderRadiusRuleName,
} from './no-unnumbered-border-radius';
import {
  rulePhase1 as noDeprecatedSpacingUtilitiesRulePhase1,
  rulePhase2 as noDeprecatedSpacingUtilitiesRulePhase2,
  namePhase1 as noDeprecatedSpacingUtilitiesRulePhase1Name,
  namePhase2 as noDeprecatedSpacingUtilitiesRulePhase2Name,
} from './no-deprecated-spacing-utilities';
import noFormTextRule, { name as noFormTextRuleName } from './no-form-text';
import noDeprecatedFontWeightRule, {
  name as noDeprecatedFontWeightRuleName,
} from './no-deprecated-font-weight';

export const htmlMigrationRules = {
  [noDeprecatedBtnRgRuleName]: noDeprecatedBtnRgRule,
  [noDeprecatedLoaderRuleName]: noDeprecatedLoaderRule,
  [noUnnumberedBorderRadiusRuleName]: noUnnumberedBorderRadiusRule,
  [noDeprecatedSpacingUtilitiesRulePhase1Name]: noDeprecatedSpacingUtilitiesRulePhase1,
  [noDeprecatedSpacingUtilitiesRulePhase2Name]: noDeprecatedSpacingUtilitiesRulePhase2,
  [noFormTextRuleName]: noFormTextRule,
  [noDeprecatedFontWeightRuleName]: noDeprecatedFontWeightRule,
};
