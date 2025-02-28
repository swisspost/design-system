import { StoryFn, StoryContext } from '@storybook/web-components';

export const withUrlParams = (Story: StoryFn, context: StoryContext) => {
  const params = new URLSearchParams(window.location.search);
  const argsParam = params.get('args');

  const updatedArgs: Record<string, string | boolean | number> = { ...context.args };

  if (argsParam) {
    // Parse the 'args' parameter and update args dynamically
    argsParam.split(';').forEach(pair => {
      const [key, value] = pair.split(':');

      if (key && value !== undefined) {
        if (key in updatedArgs) {
          if (typeof updatedArgs[key] === 'boolean') {
            updatedArgs[key] = value === 'true';
          } else if (typeof updatedArgs[key] === 'number') {
            updatedArgs[key] = Number(value);
          } else {
            updatedArgs[key] = value;
          }
        } else {
          updatedArgs[key] = value;
        }
      }
    });

    // Directly update the args in context
    context.args = { ...updatedArgs };
  }

  // Return the Story with updated args and controls
  return Story(context);
};
