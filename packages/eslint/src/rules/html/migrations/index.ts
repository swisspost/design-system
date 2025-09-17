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
import {
  rulePhase1 as noDeprecatedGutterUtilitiesRulePhase1,
  rulePhase2 as noDeprecatedGutterUtilitiesRulePhase2,
  namePhase1 as noDeprecatedGutterUtilitiesRulePhase1Name,
  namePhase2 as noDeprecatedGutterUtilitiesRulePhase2Name,
} from './no-deprecated-gutter-utilities';

import {
  rulePhase1 as noDeprecatedSizingUtilitiesRulePhase1,
  rulePhase2 as noDeprecatedSizingUtilitiesRulePhase2,
  namePhase1 as noDeprecatedSizingUtilitiesRulePhase1Name,
  namePhase2 as noDeprecatedSizingUtilitiesRulePhase2Name,
} from './no-deprecated-sizing-utilities';
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
  [noDeprecatedSizingUtilitiesRulePhase1Name]: noDeprecatedSizingUtilitiesRulePhase1,
  [noDeprecatedSizingUtilitiesRulePhase2Name]: noDeprecatedSizingUtilitiesRulePhase2,
  [noFormTextRuleName]: noFormTextRule,
  [noDeprecatedFontWeightRuleName]: noDeprecatedFontWeightRule,
  [noDeprecatedGutterUtilitiesRulePhase1Name]: noDeprecatedGutterUtilitiesRulePhase1,
  [noDeprecatedGutterUtilitiesRulePhase2Name]: noDeprecatedGutterUtilitiesRulePhase2,
};
