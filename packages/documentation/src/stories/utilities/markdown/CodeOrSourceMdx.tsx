// Source: https://github.com/storybookjs/storybook/blob/next/code/ui/blocks/src/blocks/mdx.tsx#L34
import { Source } from '@storybook/blocks';
import { Code } from '@storybook/components';
import { SourceDarkMode } from '../../../../.storybook/preview';

// @ts-ignore
export const CodeOrSourceMdx = ({ className, children, ...rest }) => {
  // markdown-to-jsx does not add className to inline code
  if (
    typeof className !== 'string' &&
    (typeof children !== 'string' || !children.match(/[\n\r]/g))
  ) {
    return <Code>{children}</Code>;
  }
  // className: "lang-jsx"
  const language = className && className.split('-');
  return (
    <Source
      language={(language && language[1]) || 'plaintext'}
      format={false}
      dark={SourceDarkMode}
      code={children as string}
      {...rest}
    />
  );
};
