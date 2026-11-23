import { StoryContext, StoryFn } from '@storybook/web-components-vite';

export function forceCompactAppearance(story: StoryFn, context: StoryContext) {
  const defaultLink = document.head.querySelector<HTMLLinkElement>('link[href*="post-default"]');
  if (defaultLink) {
    defaultLink.href = defaultLink.href.replace('post-default', 'post-compact');
  } else {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/post-compact.css';
    document.head.appendChild(link);
  }
  return story(context.args, context);
}
