import React from "react";
import { DocsContainer as BaseContainer } from "@storybook/addon-docs/blocks";
import { useDarkMode } from "storybook-dark-mode";
import postThemes from '../post-themes';

export default ({ children, context }) => {
  const dark = useDarkMode();

  return (
    <BaseContainer
      context={{
        ...context,
        storyById: (id) => {
          const storyContext = context.storyById(id);

          return {
            ...storyContext,
            parameters: {
              ...storyContext.parameters,
              docs: {
                ...storyContext.parameters.docs,
                theme: dark ? postThemes.dark : postThemes.light,
              },
            },
          };
        },
      }}
    >
      {children}
    </BaseContainer>
  );
};