import React, { ChangeEvent } from 'react';

const backgrounds: { [key: string]: string } = {
  'White': 'bg-white',
  'Yellow': 'bg-yellow',
  'Primary': 'bg-primary',
  'Nightblue Bright': 'bg-nightblue-bright',
  'Purple Bright': 'bg-purple-bright',
};

interface IState {
  currentColor: string;
}

interface IBackgroundState {
  backgroundHidden: boolean;
}

export class BackgroundSwitch extends React.Component<{}, IBackgroundState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { backgroundHidden: false };
  }

  onChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ backgroundHidden: e.currentTarget.checked });
    document
      .querySelector<HTMLDivElement>('.elevation-container')
      ?.style.setProperty('--post-bg-rgb', e.currentTarget.checked ? '255, 255, 255' : null);
  }

  render() {
    return (
      <fieldset className="mt-4">
        <legend>Background visibility (for testing purposes)</legend>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            id="docs_Default_ExampleSwitch"
            role="switch"
            type="checkbox"
            onChange={e => this.onChange(e)}
          />
          <label className="form-check-label order-first" htmlFor="docs_Default_ExampleSwitch">
            Backgroud visible
          </label>
          <label className="form-check-label" htmlFor="docs_Default_ExampleSwitch">
            Backgroud hidden
          </label>
        </div>
      </fieldset>
    );
  }
}

export class ColorSwitchClass extends React.Component<{}, IState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { currentColor: 'White' };
  }

  onChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ currentColor: e.currentTarget.value });
    document
      .querySelector('.elevation-container')
      ?.setAttribute('class', `elevation-container ${backgrounds[e.currentTarget.value]}`);
  }

  render() {
    return (
      <fieldset className="color-switch my-3">
        <legend>Background color</legend>
        <div className="btn-group">
          {Object.entries(backgrounds).map(([key, value]) => [
            <input
              type="radio"
              name="elevation-background"
              value={key}
              id={`color-${key}`}
              key={key}
              className="btn-check"
              checked={key === this.state.currentColor}
              onChange={e => this.onChange(e)}
            />,
            <label
              htmlFor={`color-${key}`}
              className="btn btn-secondary color-label"
              key={key + 'label'}
            >
              <span className={`color-badge ${value}`}></span>
              {key}
            </label>,
          ])}
        </div>
      </fieldset>
    );
  }
}
