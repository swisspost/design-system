import noDeprecatedBtnRgRule, { name as noDeprecatedBtnRgRuleName } from './no-deprecated-btn-rg';
import noUnnumberedBorderRadiusRule, {
  name as noUnnumberedBorderRadiusRuleName,
} from './no-unnumbered-border-radius';
import noFormTextRule, { name as noFormTextRuleName } from './no-form-text';
import noDeprecatedFontWeightRule, {
  name as noDeprecatedFontWeightRuleName,
} from './no-deprecated-font-weight';
import noDeprecatedHClearfix, {
  name as noDeprecatedHClearfixName,
} from './no-deprecated-h-clearfix';
import noClassHVisuallyhiddenRule, {
  name as noClassHVisuallyhiddenRuleName,
} from './no-class-h-visuallyhidden';

export const htmlMigrationRules = {
  [noDeprecatedBtnRgRuleName]: noDeprecatedBtnRgRule,
  [noUnnumberedBorderRadiusRuleName]: noUnnumberedBorderRadiusRule,
  [noFormTextRuleName]: noFormTextRule,
  [noDeprecatedFontWeightRuleName]: noDeprecatedFontWeightRule,
  [noDeprecatedHClearfixName]: noDeprecatedHClearfix,
  [noClassHVisuallyhiddenRuleName]: noClassHVisuallyhiddenRule,
};
