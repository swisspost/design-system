import { Scope, ScopeManager } from 'eslint-scope';
import { TSESTree } from '@typescript-eslint/utils';
import * as cheerio from 'cheerio';
import { type CheerioAPI } from 'cheerio';
import { AnyNode, ChildNode, ParentNode } from 'domhandler';
import { type Token } from 'parse5';
import { TemplateNode } from './template-node';

interface TemplateToken extends TemplateNode {
  value: string;
}

interface AST extends TemplateNode {
  type: 'Program';
  comments: TemplateToken[];
  tokens: TemplateToken[];
}

interface VisitorKeys {
  [nodeName: string]: string[];
}

const VISITOR_KEYS: VisitorKeys = {
  Program: ['children'],
  root: ['children'],
  script: ['children'],
  style: ['children'],
  tag: ['children'],
  cdata: ['children'],
};

/**
 * Returns the TSESTree range corresponding to a parse5 `sourceCodeLocation` object.
 */
function convertSourceCodeLocationToRange(sourceCodeLocation: Token.Location): TSESTree.Range {
  return [sourceCodeLocation.startOffset, sourceCodeLocation.endOffset];
}

/**
 * Returns the TSESTree location corresponding to a parse5 `sourceCodeLocation` object.
 */
function convertSourceCodeLocation(sourceCodeLocation: Token.Location): TSESTree.SourceLocation {
  return {
    start: {
      line: sourceCodeLocation.startLine + 1,
      column: sourceCodeLocation.startCol,
    },
    end: {
      line: sourceCodeLocation.endLine + 1,
      column: sourceCodeLocation.endCol,
    },
  };
}

/**
 * Returns the `sourceCodeLocation` of the child node that appears first in the code.
 */
function getStartSourceCodeLocationFromChildren(node: ParentNode) {
  let startSourceCodeLocation: Token.Location | undefined | null = null;
  node.children.forEach((child: ChildNode) => {
    const nodeSourceCodeLocation = child.sourceCodeLocation;

    if (!startSourceCodeLocation) {
      startSourceCodeLocation = nodeSourceCodeLocation;
      return;
    }

    if (
      nodeSourceCodeLocation &&
      nodeSourceCodeLocation.startOffset < startSourceCodeLocation.startOffset
    ) {
      startSourceCodeLocation = nodeSourceCodeLocation;
      return;
    }
  });
  return startSourceCodeLocation;
}

/**
 * Returns the `sourceCodeLocation` of the child node that appears last in the code.
 */
function getEndSourceCodeLocationFromChildren(node: ParentNode) {
  let endSourceCodeLocation: Token.Location | undefined | null = null;
  node.children.forEach((child: ChildNode) => {
    const nodeSourceCodeLocation = child.sourceCodeLocation;

    if (!endSourceCodeLocation) {
      endSourceCodeLocation = nodeSourceCodeLocation;
      return;
    }

    if (
      nodeSourceCodeLocation &&
      nodeSourceCodeLocation.endOffset > endSourceCodeLocation.endOffset
    ) {
      endSourceCodeLocation = nodeSourceCodeLocation;
      return;
    }
  });
  return endSourceCodeLocation;
}

/**
 * Checks whether the value is a node with a defined type.
 */
function isNode(node: unknown): node is AnyNode {
  return (
    node !== null &&
    typeof node === 'object' &&
    typeof (node as { type?: unknown }).type === 'string'
  );
}

/**
 * Returns an AST object that matches ESLint specifications and adds a `.toCheerio()`
 * method to all nodes, enabling retrieval of their Cheerio class.
 *
 * @see https://eslint.org/docs/latest/extend/custom-parsers#ast-specification
 * @see https://cheerio.js.org/docs/api/classes/Cheerio
 */
function getAST($: CheerioAPI, node: AnyNode = $.root()[0]): TemplateNode {
  const astNode: Partial<TemplateNode> = { type: node.type, toCheerio: () => $(node) };

  if ('name' in node) {
    astNode.name = node.name;
  }

  // loop through the configured properties to create nested AST objects.
  const visitorKeys = VISITOR_KEYS[node.type] || [];
  visitorKeys.forEach(key => {
    if (key in node) {
      const child = node[key as keyof typeof node];

      if (Array.isArray(child)) {
        astNode[key] = child.map(child => getAST($, child));
      } else if (isNode(child)) {
        astNode[key] = getAST($, child);
      }
    }
  });

  // calculate source code location when possible
  if (!node.sourceCodeLocation && 'children' in node) {
    const startSourceCodeLocation = getStartSourceCodeLocationFromChildren(node);
    const endSourceCodeLocation = getEndSourceCodeLocationFromChildren(node);

    if (startSourceCodeLocation && endSourceCodeLocation) {
      const { startOffset, startLine, startCol } = startSourceCodeLocation;
      const { endOffset, endLine, endCol } = endSourceCodeLocation;
      node.sourceCodeLocation = { startOffset, startLine, startCol, endOffset, endLine, endCol };
    }
  }

  // set the `loc` and `range` properties required by ESLint
  if (node.sourceCodeLocation) {
    astNode.range = convertSourceCodeLocationToRange(node.sourceCodeLocation);
    astNode.loc = convertSourceCodeLocation(node.sourceCodeLocation);
  }

  // remove children that do not have a `loc` and a `range` property
  if (astNode.children) {
    astNode.children = astNode.children.filter(child => !!child.loc && !!child.range);
  }

  return astNode as TemplateNode;
}

/**
 * Parses the provided code into a `parseForESLint` object, following ESLint specifications.
 *
 * @see https://eslint.org/docs/latest/extend/custom-parsers#parseforeslint-return-object
 */
export function parseForESLint(code: string): {
  ast: AST;
  scopeManager: ScopeManager;
  visitorKeys: VisitorKeys;
  services: {
    cheerioAPI: CheerioAPI;
  };
} {
  const $ = cheerio.load(code, {
    sourceCodeLocationInfo: true,
  });

  const ast: AST = {
    ...getAST($),
    type: 'Program',
    comments: [],
    tokens: [],
  };

  // @ts-expect-error The types for ScopeManager seem to be wrong, it requires a configuration object or it will throw at runtime
  const scopeManager = new ScopeManager({});

  // @ts-expect-error Create a global scope for the ScopeManager, the types for Scope also seem to be wrong
  new Scope(scopeManager, 'module', null, ast, false);

  return {
    ast: ast,
    visitorKeys: VISITOR_KEYS,
    scopeManager: scopeManager,
    services: {
      cheerioAPI: $,
    },
  };
}
