# Contributing to the Design System ESLint Plugin


This guide will walk you through the steps required to get started and create new custom rules.
Please note that these guidelines extend the [general contribution guidelines](../../CONTRIBUTING.md) from the root of the repository.

## Getting Started

### Build the Plugin

To build the ESLint plugin for production, run:

```bash
pnpm eslint:build
```

### Run Unit Tests

To run the unit tests for the ESLint plugin, use the following command:

```bash
pnpm eslint:test
```

## Writing Custom Rules

When creating a new custom rule, you need to create three separate files:

1. **Rule Implementation** in the `src/rules` directory
2. **Rule Tests** in the `tests/rules` directory 
3. **Rule Documentation** in the `docs/rules` directory

Each of these files must have the same name as the rule.
For example, if you're creating the rule `no-foo`, the files should be named like this:

- `src/rules/no-foo.ts`
- `tests/rules/no-foo.spec.ts`
- `docs/rules/no-foo.md`

### Rule Structure

The rule file should export two things:

- The rule name
- The rule implementation

The rule implementation is created using the `createRule()` function.
It takes the following configuration:

```ts
{
  name: string;
  meta: RuleMetaData;
  defaultOptions: [];
  create: (context: RuleContext, options: []) => RuleListener;
}
```

- **name**: The name of the rule (e.g. `no-foo`).
- **meta**: An object containing all necessary information about the rule.
- **defaultOptions**: Optional default values for any configuration options for the rule.
- **create**: The function where you implement the rule logic. A detailed guide on writing custom rules is available in the ESLint Custom Rule Tutorial.

_More details about the structure can be found in the [ESLint documentation](https://eslint.org/docs/latest/extend/custom-rules#rule-structure)._

The **meta** object also contains additional details about the rule, including its category.
The category determines which ESLint configuration the rule belongs to.
Currently, there is only the `template` category, which is used for HTML-related rules and is included in the `post/template` configuration.
However, more categories may be added in the future.

### Writing Template Rules

Template rules are specific to HTML and use a custom parser.
This parser is located in the `src/template-parser` folder.
It allows you to target HTML nodes such as `tag`, `text`, and `comment`.

Here’s an example of a simple rule that checks for the presence of `button` tags:

```ts
{
  create(context) {
    return {
      tag(node: TemplateNode) {
        if (node.name === 'button') {
          context.report({
            node,
            message: 'Button tags are not allowed',
          });
        }
      },
    };
  }
}
```

#### Template Node Properties

Each template node is represented by a `TemplateNode` object.
Key properties include:

- **type**: The type of node (e.g., `tag`, `text`, `comment`).
- **name**: The name of the node (e.g., `div`, `button`, `p`)). The name is optional.
- **range**: A tuple of the start and end positions of the node in the source code.
- **loc**: The position of the node in the source code, with `start.line`, `start.column`, `end.line`, and `end.column`.
- **toCheerio()**: A method to convert the node into a [Cheerio class](https://cheerio.js.org/docs/api/classes/Cheerio).

Additionally, the **context** object provides access to the [Cheerio API](https://cheerio.js.org/docs/api/interfaces/CheerioAPI) via `context.sourceCode.parserServices.cheerioAPI`.

#### Testing Template Rules

To test template rules, use the `TemplateRuleTester.run()` function.
This allows you to provide sample HTML strings for testing valid and invalid rule cases.

## Adding Rules to the Plugin

To add a new rule to the plugin:
- Import the rule into the `src/rules/index.ts` file.
- Add the rule to the `rules` object.

The rule will automatically be included in the appropriate ESLint configuration based on its category.

