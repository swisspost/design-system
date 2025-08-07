import { createRule } from '../utils/create-rule';
import { AST_NODE_TYPES } from '@typescript-eslint/utils';

export const name = 'stencil-strict-props-initialization';

export default createRule({
  name,
  meta: {
    docs: {
      dir: 'ts',
      description:
        'Reports any Stencil component @Prop properties that lack an initial value and are neither marked as optional (?) nor definitely assigned (!).',
    },
    messages: {
      propStrictInit:
        "The '@Prop' property '{{propertyName}}' must have an initial value, or be explicitly marked as optional (?) or definitely assigned (!).",
    },
    type: 'suggestion',
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    return {
      PropertyDefinition(node) {
        if (node.decorators && node.decorators.length > 0) {
          // Check if any decorator is @Prop()
          const isProp = node.decorators.some(decorator => {
            // Check for CallExpression like @Prop()
            if (decorator.expression.type === AST_NODE_TYPES.CallExpression) {
              const callee = decorator.expression.callee;
              // Check if the callee is an Identifier named 'Prop'
              if (callee.type === AST_NODE_TYPES.Identifier && callee.name === 'Prop') {
                return true;
              }
            }
            return false; // Ignore other decorator types or CallExpressions with different callees
          });
          if (isProp) {
            // Check if the property is optional (?) or definitely assigned (!)
            const isOptional = node.optional;
            const isDefinitelyAssigned = node.definite;
            // Also check if the property has no initial value set
            if (!isOptional && !isDefinitelyAssigned && node.value === null) {
              context.report({
                node,
                messageId: 'propStrictInit',
                data: {
                  propertyName:
                    node.key.type === AST_NODE_TYPES.Identifier ? node.key.name : 'unknown',
                },
              });
            }
          }
        }
      },
    };
  },
});
