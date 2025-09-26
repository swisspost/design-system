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
  rulePhase1 as noDeprecatedSizingUtilitiesRulePhase1,
  rulePhase2 as noDeprecatedSizingUtilitiesRulePhase2,
  namePhase1 as noDeprecatedSizingUtilitiesRulePhase1Name,
  namePhase2 as noDeprecatedSizingUtilitiesRulePhase2Name,
} from './no-deprecated-sizing-utilities';
import noFormTextRule, { name as noFormTextRuleName } from './no-form-text';
import noDeprecatedFontWeightRule, {
  name as noDeprecatedFontWeightRuleName,
} from './no-deprecated-font-weight';
import noDeprecatedHClearfix, {
  name as noDeprecatedHClearfixName,
} from './no-deprecated-h-clearfix';
import noDeprecatedHVisuallyhiddenRule, {
  name as noDeprecatedHVisuallyhiddenRuleName,
} from './no-deprecated-h-visuallyhidden';
import noDeprecatedChipFilter, {
  name as noDeprecatedChipFilterName,
} from './no-deprecated-chip-filter';

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
  [noDeprecatedHClearfixName]: noDeprecatedHClearfix,
  [noDeprecatedHVisuallyhiddenRuleName]: noDeprecatedHVisuallyhiddenRule,
  [noDeprecatedChipFilterName]: noDeprecatedChipFilter,
};
