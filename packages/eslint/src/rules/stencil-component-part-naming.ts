import { createRule } from '../utils/create-rule';
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export const name = 'stencil-component-part-naming';
export const messageId = 'stencilComponentPartNaming';

export default createRule({
  name,
  meta: {
    docs: {
      dir: 'ts',
      description:
        'Enforces that Stencil component part names are prefixed with "post-" to avoid naming collisions with third-party components.',
    },
    messages: {
      [messageId]:
        "The part name '{{partName}}' must start with 'post-' (e.g., 'post-menu', 'post-tabs-content', 'post-accordion-button').",
    },
    type: 'problem',
    schema: [],
  },
  defaultOptions: [],

  create(context) {
    return {
      // Check JSXAttribute nodes for 'part' attributes
      JSXAttribute(node: TSESTree.JSXAttribute) {
        // Check if this is a 'part' attribute
        if (node.name.type === AST_NODE_TYPES.JSXIdentifier && node.name.name === 'part') {
          if (
            node.value &&
            node.value.type === AST_NODE_TYPES.Literal &&
            typeof node.value.value === 'string'
          ) {
            const partName = node.value.value;

            // Validate part name starts with 'post-'
            if (!partName.startsWith('post-')) {
              context.report({
                node,
                messageId,
                data: {
                  partName,
                },
              });
            }
          }
        }
      },
    };
  },
});
