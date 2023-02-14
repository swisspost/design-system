import React from "react";
import { getVersion } from '../../../src/utils/version';

export default () => (
  <header className="docs-header bg-yellow">
    <div className="container py-5">
      <h1 className="mt-0 bold font-curve-large">Swiss Post<br/>Design System</h1>
      <p>
        The Swiss Post Design System pattern library for a unified and accessible user experience
        across the web platform.
      </p>
      <p className="fs-tiny">Docs version: { getVersion('documentation') }</p>
    </div>
  </header>
);
