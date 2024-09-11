import { StoryContext, StoryFn } from '@storybook/web-components';
import { html } from 'lit';

export const fullScreenUrlDecorator = (story: StoryFn, context: StoryContext) => {
  const { allArgs, initialArgs, id } = context;

  const args = Object.entries(allArgs)
    .map(([argKey, argValue]) => {
      const initialValue = initialArgs[argKey];
      if (argValue === initialValue) return null;

      const separator = typeof argValue === 'string' || typeof argValue === 'number' ? ':' : ':!';
      const value = typeof argValue === 'string' ? encodeURI(argValue) : argValue;
      return `${argKey}${separator}${value}`;
    })
    .filter(arg => !!arg)
    .join(';');

  let storyURL = `/?path=/story/${id}&full=true`;
  if (args.length) storyURL += `&args=${args}`;

  return html`
    <p class="storyURL" hidden>${storyURL}</p>
    ${story(context.args, context)}
  `;
};

export const openFullScreenDemo = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  const canvas = target.closest('.docs-story');
  const storyURL = canvas && canvas.querySelector('.storyURL');

  if (storyURL) {
    window.open(storyURL.textContent, '_blank');
  } else {
    alert('The full screen demo is not available.');
  }
};
