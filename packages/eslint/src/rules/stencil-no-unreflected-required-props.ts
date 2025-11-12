import { createRule } from '../utils/create-rule';
import { isCallExpressionWithName } from '../utils/stencil-helpers';
import { AST_NODE_TYPES, ASTUtils } from '@typescript-eslint/utils';

export const name = 'stencil-no-unreflected-required-props';
export const messageId = 'stencilNoUnreflectedRequiredProps';

export default createRule({
  name,
  meta: {
    docs: {
      dir: 'ts',
      description:
        'Reports any required Stencil component property, which is not reflected on its host element, since this would lead to errors in our property validations, when used in a SSR environment.',
    },
    messages: {
      [messageId]:
        "The required property '{{propertyName}}' must contain the option `{ reflect: true }` in its decorator.",
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    return {
      PropertyDefinition(node) {
        const isRequired = node.definite === true;

        if (isRequired) {
          node.decorators
            // Find property nodes with a "@Prop()" decorator
            .filter(decorator => isCallExpressionWithName(decorator, 'Prop') !== null)
            // Find property nodes without the `{ reflect: true }` argument in their "@Prop()" decorator
            .filter(
              decorator =>
                !(
                  decorator.expression.type === AST_NODE_TYPES.CallExpression &&
                  decorator.expression.arguments.some(
                    arg =>
                      arg.type === AST_NODE_TYPES.ObjectExpression &&
                      arg.properties.some(
                        prop =>
                          prop.type === AST_NODE_TYPES.Property &&
                          prop.key.type === AST_NODE_TYPES.Identifier &&
                          prop.key.name === 'reflect' &&
                          prop.value.type === AST_NODE_TYPES.Literal &&
                          prop.value.value === true,
                      ),
                  )
                ),
            )
            .forEach(() => {
              context.report({
                node,
                messageId,
                data: {
                  propertyName: ASTUtils.getPropertyName(node),
                },
              });
            });
        }
      },
    };
  },
});
