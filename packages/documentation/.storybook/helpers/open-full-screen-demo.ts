import { StoryContext, StoryFn } from '@storybook/web-components-vite';
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

  // Link for the copy configuration button
  let linkConfigBaseURL = `/?path=/docs/${id.split('--')[0]}--docs&story=${context.story}`;

  if (args.length) linkConfigBaseURL += `&args=${args}`;
  const linkConfigURL = window.location.host + linkConfigBaseURL.replace(':!', ':') + '#' + id;

  return html`
    <p class="linkConfigURL" hidden>${linkConfigURL}</p>
    <p class="storyURL " hidden>${storyURL}</p>
    ${story(context.args, context)}
  `;
};

export const copyStoryConfigUrl = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  const canvas = target.closest('.docs-story');
  const linkConfigURL = canvas && canvas.querySelector('.linkConfigURL');

  if (linkConfigURL && linkConfigURL.textContent) {
    // Copy link to clipboard
    navigator.clipboard.writeText(linkConfigURL.textContent);
    // Temporarily change text to show copy effect
    const standardText = target.textContent;
    const tempText = 'Copied!';
    target.textContent = tempText;
    setTimeout(() => {
      target.textContent = standardText;
    }, 1500);
  }
};

export const openFullScreenDemo = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  const canvas = target.closest('.docs-story');
  const storyURL = canvas && canvas.querySelector('.storyURL');

  if (storyURL && storyURL.textContent) {
    window.open(storyURL.textContent, '_blank');
  } else {
    alert('The full screen demo is not available.');
  }
};
