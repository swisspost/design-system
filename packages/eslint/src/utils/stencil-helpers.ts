import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

/**
 * Checks if a decorator is of type CallExpression (function).
 * @param decorator The decorator node to check.
 * @returns True if the decorator type is matching, otherwise false.
 */
export function isCallExpression(decorator: TSESTree.Decorator): boolean {
  return decorator.expression.type === AST_NODE_TYPES.CallExpression;
}

/**
 * Checks if a decorator is of type CallExpression (function) and has the specified name.
 * @param decorator The decorator node to check.
 * @param name The name to search for.
 * @returns True if the decorator CallExpression has the specified name, otherwise false.
 */
export function isCallExpressionWithName(decorator: TSESTree.Decorator, name: string): boolean {
  if (isCallExpression(decorator)) {
    const expression = decorator.expression as TSESTree.CallExpression;
    return expression.callee.type === AST_NODE_TYPES.Identifier && expression.callee.name === name;
  }

  return false;
}

/**
 * Retrieves the decorator function by its name.
 * @param decorator The decorator node to check.
 * @param name The name of the decorator function.
 * @returns The decorator if it matches the name, otherwise null.
 */
export function getCallExpressionWithName(
  decorator: TSESTree.Decorator,
  name: string,
): TSESTree.Decorator | null {
  return isCallExpressionWithName(decorator, name) ? decorator : null;
}
