import { StoryFn } from '@storybook/web-components-vite';

export function withCompactAppearance(story: StoryFn) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/styles/post-compact.css';
  document.head.appendChild(link);
  return story();
}
