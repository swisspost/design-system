import React from "react";

export default () => (
  <>
    <div className="docs-eol">
      <div className="container text-center py-4">
        <p className="mb-0">
          This version is no longer actively maintained and has reached{' '}
          <span className="fw-bold">End-of-Life (EOL)</span>. For new and ongoing projects, please
          refer to the <a href="https://design-system.post.ch/">latest Design System version</a>.
        </p>
      </div>
    </div>
    <header className="docs-header bg-yellow">
      <div className="container py-5">
        <h1 className="mt-0 bold font-curve-large">Swiss Post<br/>Design System</h1>
        <p>
          The Swiss Post Design System pattern library for a unified and accessible user experience
          across the web platform.
        </p>
      </div>
    </header>
  </>
);
