import noDeprecatedBtnRgRule, { name as noDeprecatedBtnRgRuleName } from './no-deprecated-btn-rg';
import noUnnumberedBorderRadiusRule, {
  name as noUnnumberedBorderRadiusRuleName,
} from './no-unnumbered-border-radius';

export const htmlMigrationRules = {
  [noDeprecatedBtnRgRuleName]: noDeprecatedBtnRgRule,
  [noUnnumberedBorderRadiusRuleName]: noUnnumberedBorderRadiusRule,
};
