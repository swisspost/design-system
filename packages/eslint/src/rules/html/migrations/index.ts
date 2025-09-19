import noDeprecatedBtnRgRule, { name as noDeprecatedBtnRgRuleName } from './no-deprecated-btn-rg';
import noDeprecatedLoaderRule, { name as noDeprecatedLoaderRuleName } from './no-deprecated-loader';
import noUnnumberedBorderRadiusRule, {
  name as noUnnumberedBorderRadiusRuleName,
} from './no-unnumbered-border-radius';
import { rules as noDeprecatedSpacingUtilities } from './no-deprecated-spacing-utilities';
import { rules as noDeprecatedGutterUtilities } from './no-deprecated-gutter-utilities';
import { rules as noDeprecatedSizingUtilities } from './no-deprecated-sizing-utilities';
import { rules as noDeprecatedGapUtilities } from './no-deprecated-gap-utilities';
import noFormTextRule, { name as noFormTextRuleName } from './no-form-text';
import noDeprecatedFontWeightRule, {
  name as noDeprecatedFontWeightRuleName,
} from './no-deprecated-font-weight';

export const htmlMigrationRules = {
  [noDeprecatedBtnRgRuleName]: noDeprecatedBtnRgRule,
  [noDeprecatedLoaderRuleName]: noDeprecatedLoaderRule,
  [noUnnumberedBorderRadiusRuleName]: noUnnumberedBorderRadiusRule,
  [noDeprecatedSpacingUtilities.namePhase1]: noDeprecatedSpacingUtilities.rulePhase1,
  [noDeprecatedSpacingUtilities.namePhase2]: noDeprecatedSpacingUtilities.rulePhase2,
  [noDeprecatedSizingUtilities.namePhase1]: noDeprecatedSizingUtilities.rulePhase1,
  [noDeprecatedSizingUtilities.namePhase1]: noDeprecatedSizingUtilities.rulePhase2,
  [noFormTextRuleName]: noFormTextRule,
  [noDeprecatedFontWeightRuleName]: noDeprecatedFontWeightRule,
  [noDeprecatedGutterUtilities.namePhase1]: noDeprecatedGutterUtilities.rulePhase1,
  [noDeprecatedGutterUtilities.namePhase2]: noDeprecatedGutterUtilities.rulePhase2,
  [noDeprecatedGapUtilities.namePhase1]: noDeprecatedGapUtilities.rulePhase1,
  [noDeprecatedGapUtilities.namePhase2]: noDeprecatedGapUtilities.rulePhase2,
};
