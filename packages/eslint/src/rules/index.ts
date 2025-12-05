import stencilStrictPropsInitializationRule, {
  name as stencilStrictPropsInitializationRuleName,
} from './stencil-strict-props-initialization';
import stencilNoUnreflectedRequiredPropsRule, {
  name as stencilNoUnreflectedRequiredPropsRuleName,
} from './stencil-no-unreflected-required-props';
import stencilComponentPartNamingRule, {
  name as stencilComponentPartNamingRuleName,
} from './stencil-component-part-naming';

export const dsLintingRules = {
  [stencilStrictPropsInitializationRuleName]: stencilStrictPropsInitializationRule,
  [stencilNoUnreflectedRequiredPropsRuleName]: stencilNoUnreflectedRequiredPropsRule,
  [stencilComponentPartNamingRuleName]: stencilComponentPartNamingRule,
};
