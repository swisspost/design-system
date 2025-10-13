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
import noDeprecatedShadowUtilitiesRule, {
  name as noDeprecatedShadowUtilitiesRuleName,
} from './no-deprecated-shadow-utilities';
import noDeprecatedElevationUtilitiesRule, {
  name as noDeprecatedElevationUtilitiesRuleName,
} from './no-deprecated-elevation-utilities';
import noDeprecatedHClearfix, {
  name as noDeprecatedHClearfixName,
} from './no-deprecated-h-clearfix';
import noDeprecatedHVisuallyhiddenRule, {
  name as noDeprecatedHVisuallyhiddenRuleName,
} from './no-deprecated-h-visuallyhidden';
import noDeprecatedFontSizesRule, {
  name as noDeprecatedFontSizesRuleName,
} from './no-deprecated-font-sizes';
import noDeprecatedChipFilter, {
  name as noDeprecatedChipFilterName,
} from './no-deprecated-chip-filter';
import noDeprecatedAlert, { name as noDeprecatedAlertName } from './no-deprecated-alert';

import {
  rulePhase1 as noDeprecatedBreakpointsRulePhase1,
  rulePhase2 as noDeprecatedBreakpointsRulePhase2,
  namePhase1 as noDeprecatedBreakpointsRulePhase1Name,
  namePhase2 as noDeprecatedBreakpointsRulePhase2Name,
} from './no-deprecated-breakpoints';

export const htmlMigrationRules = {
  [noDeprecatedBreakpointsRulePhase1Name]: noDeprecatedBreakpointsRulePhase1,
  [noDeprecatedBreakpointsRulePhase2Name]: noDeprecatedBreakpointsRulePhase2,
  [noDeprecatedBtnRgRuleName]: noDeprecatedBtnRgRule,
  [noDeprecatedLoaderRuleName]: noDeprecatedLoaderRule,
  [noUnnumberedBorderRadiusRuleName]: noUnnumberedBorderRadiusRule,
  [noDeprecatedSpacingUtilities[0].name]: noDeprecatedSpacingUtilities[0].rule,
  [noDeprecatedSpacingUtilities[1].name]: noDeprecatedSpacingUtilities[1].rule,
  [noDeprecatedSizingUtilities[0].name]: noDeprecatedSizingUtilities[0].rule,
  [noDeprecatedSizingUtilities[0].name]: noDeprecatedSizingUtilities[1].rule,
  [noDeprecatedGutterUtilities[0].name]: noDeprecatedGutterUtilities[0].rule,
  [noDeprecatedGutterUtilities[1].name]: noDeprecatedGutterUtilities[1].rule,
  [noDeprecatedGapUtilities[0].name]: noDeprecatedGapUtilities[0].rule,
  [noDeprecatedGapUtilities[1].name]: noDeprecatedGapUtilities[1].rule,
  [noFormTextRuleName]: noFormTextRule,
  [noDeprecatedFontWeightRuleName]: noDeprecatedFontWeightRule,
  [noDeprecatedShadowUtilitiesRuleName]: noDeprecatedShadowUtilitiesRule,
  [noDeprecatedElevationUtilitiesRuleName]: noDeprecatedElevationUtilitiesRule,
  [noDeprecatedHClearfixName]: noDeprecatedHClearfix,
  [noDeprecatedHVisuallyhiddenRuleName]: noDeprecatedHVisuallyhiddenRule,
  [noDeprecatedFontSizesRuleName]: noDeprecatedFontSizesRule,
  [noDeprecatedChipFilterName]: noDeprecatedChipFilter,
  [noDeprecatedAlertName]: noDeprecatedAlert,
};
