import noDeprecatedBtnRgRule, { name as noDeprecatedBtnRgRuleName } from './no-deprecated-btn-rg';
import noUnnumberedBorderRadiusRule, {
  name as noUnnumberedBorderRadiusRuleName,
} from './no-unnumbered-border-radius';
import noClassHClearfixRule, { name as noClassHClearfixRuleName } from './no-class-h-clearfix';
import noClassHVisuallyhiddenRule, {
  name as noClassHVisuallyhiddenRuleName,
} from './no-class-h-visuallyhidden';

export const htmlMigrationRules = {
  [noDeprecatedBtnRgRuleName]: noDeprecatedBtnRgRule,
  [noUnnumberedBorderRadiusRuleName]: noUnnumberedBorderRadiusRule,
  [noClassHClearfixRuleName]: noClassHClearfixRule,
  [noClassHVisuallyhiddenRuleName]: noClassHVisuallyhiddenRule,
};
