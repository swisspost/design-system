import { BadgesConfig } from '@geometricpanda/storybook-addon-badges';
import { BADGE } from '../constants';

export const badgesConfig: BadgesConfig = {
  [BADGE.BETA]: {
    styles: {
      backgroundColor: 'var(--post-yellow)',
      color: '#000',
      borderColor: 'transparent',
    },
    title: 'Beta',
    tooltip: {
      desc: 'This documentation page is still in beta mode and might not be complete yet.',
    },
  },
  [BADGE.NEEDS_REVISION]: {
    styles: {
      backgroundColor: 'var(--post-gray-10)',
      color: '#000',
      borderColor: 'transparent',
    },
    title: 'Needs revision',
    tooltip: {
      desc: 'This page is pending revision from a UX Designer.',
    },
  },
  [BADGE.STABLE]: {
    styles: {
      backgroundColor: 'var(--post-success)',
      color: '#fff',
      borderColor: 'transparent',
    },
    title: 'Stable',
    tooltip: {
      desc: 'The content of this page is ready to be used in production.',
    },
  },
  [BADGE.TODO]: {
    styles: {
      backgroundColor: 'var(--post-danger)',
      color: '#fff',
      borderColor: 'transparent',
    },
    title: 'TODO',
    tooltip: {
      desc: 'This page needs to be filled with content and serves as a placeholder in the meantime.',
    },
  },
  [BADGE.SINCE_V1]: {
    styles: {
      backgroundColor: '#FFF',
      color: '#333',
      borderColor: '#666',
    },
    title: 'Since v1',
    tooltip: {
      desc: 'This Component was added in Version 1',
    },
  },
  [BADGE.WEB_COMPONENT_CANDIDATE]: {
    styles: {
      backgroundColor: '#FFF',
      color: '#333',
      borderColor: '#666',
    },
    title: 'Web Component Candidate',
    tooltip: {
      desc: 'This component may be replaced by a web component in a future release.',
    },
  },
};
