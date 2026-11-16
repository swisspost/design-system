import React from 'react';

export default () => (
  <header className="docs-header palette palette-accent">
    <div className="container py-64">
      <div className="d-flex gap-24 align-items-center">
        <post-icon className="w-48 h-48" name="designsystem"></post-icon>
        <div>
          <h1 className="mb-0">
            <span className="title-highlight">Swiss Post</span> Design System
          </h1>
          <p className="mt-4">
            For a consistent and accessible user experience across the web platform.
          </p>
        </div>
      </div>
    </div>
  </header>
);
