import { StoryFn, StoryContext, Args } from '@storybook/web-components-vite';
import { useArgs } from 'storybook/preview-api';

// Compare the arg objects
const argsMatch = (obj1: Args, obj2: Args): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

let firstRender = true;
let initialArgs: Args;

export const withUrlParams = (Story: StoryFn, context: StoryContext) => {
  const [_, updateArgs] = useArgs();
  const params = new URLSearchParams(window.location.search);

  const storyParam = params.get('story')?.replace(/\s+/g, '').toLowerCase();
  const storyName = context.name.replace(/\s+/g, '').toLowerCase();

  if (firstRender && storyParam && storyParam == storyName) {
    const argsParam = params.get('args');

    if (firstRender) {
      initialArgs = { ...context.args };
    }

    const updatedArgs: Args = { ...context.args };
    // Extract the args from the URL
    if (argsParam) {
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

      // Only the first time update the args
      if (firstRender && !argsMatch(initialArgs, updatedArgs)) {
        updateArgs(updatedArgs);

        // Remove the args from the URL
        params.delete('args');
        const newUrl = `${window.location.pathname}?${params.toString()}`;

        window.history.replaceState({}, '', newUrl);
        firstRender = false;
      }
    }
  }

  return Story(context.args, context);
};
