import React from "react";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <header className="docs-header">
        <div className="container py-5">
          <h1 className="mt-0 bold font-curve-large">Swiss Post<br/>Design System</h1>
          <p className="font-monospace small">
            v{ this.props.getVersion('styles') ?? '' }
          </p>
          <p>
            The Swiss Post Design System pattern library for a unified and accessible user experience
            across the web platform.
          </p>
        </div>
      </header>
    );
  }
};
