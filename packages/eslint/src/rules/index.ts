import stencilStrictPropsInitializationRule, {
  name as stencilStrictPropsInitializationRuleName,
} from './stencil-strict-props-initialization';
import stencilNoUnreflectedRequiredPropsRule, {
  name as stencilNoUnreflectedRequiredPropsRuleName,
} from './stencil-no-unreflected-required-props';

export const dsLintingRules = {
  [stencilStrictPropsInitializationRuleName]: stencilStrictPropsInitializationRule,
  [stencilNoUnreflectedRequiredPropsRuleName]: stencilNoUnreflectedRequiredPropsRule,
};
