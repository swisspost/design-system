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
  const docsId = new URLSearchParams(window.location.search).get('id');

  const newParams = new URLSearchParams();
  newParams.set('story', context.name);
  if (args.length) newParams.set('args', args);

  const linkConfigURL = `${window.location.origin}/?path=/docs/${docsId}&${newParams.toString()}#${id}`;

  return html`
    <p class="linkConfigURL" hidden>${linkConfigURL}</p>
    <p class="storyURL " hidden>${storyURL}</p>
    ${story(context.args, context)}
  `;
};

export const copyStoryConfigUrl = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  const linkConfigURL = getStoryContainer(target)?.querySelector('.linkConfigURL');

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
  const storyURL = getStoryContainer(e.target as HTMLElement)?.querySelector('.storyURL');

  if (storyURL && storyURL.textContent) {
    window.open(storyURL.textContent, '_blank');
  } else {
    alert('The full screen demo is not available.');
  }
};

function getStoryContainer(target: Element): Document | Element | null {
  const canvas = target.closest('.docs-story');
  const iframe: HTMLIFrameElement | null = canvas && canvas.querySelector('iframe');

  if (iframe) {
    return iframe.contentDocument;
  } else {
    return canvas;
  }
}
