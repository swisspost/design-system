import React from 'react';
import { PostAlert } from '@swisspost/design-system-components-react';

export default () => (
  <PostAlert icon="2403" className="docs-alert">
    <p slot="heading">Under Construction</p>
    <p>
      The Swiss Post Design System documentation is undergoing a transformation! Dive into this beta
      version for a sneak peek.
      <br />
      While we are fine-tuning it, you can still refer to our existing documentation.
    </p>
    <div className="text-end mt-mini">
      <a
        className="btn btn-primary btn-animated"
        href="https://archive.design-system.post.ch/#/home"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        <span>Go to current docs</span>
      </a>
    </div>
  </PostAlert>
);
