import React, { useState } from 'react';
import { PostIcon } from '@swisspost/design-system-components-react';

// ------------------------------------------------------------------
// Copy button
// ------------------------------------------------------------------
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      className={`color-token-copy-btn${copied ? ' color-token-copy-btn--copied' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? 'Copied to clipboard' : `Copy ${value}`}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
      type="button"
    >
      {copied ? (
        <PostIcon name="checkmark" aria-hidden="true" />
      ) : (
        <PostIcon name="copy" aria-hidden="true" />
      )}
    </button>
  );
}

// ------------------------------------------------------------------
// Semantic color swatches
// ------------------------------------------------------------------
export interface ColorToken {
  cssVar: string;
  description?: string;
}

export interface ColorTokenGroup {
  title: string;
  description?: string;
  tokens: ColorToken[];
}

export function ColorSwatch({ cssVar, description }: ColorToken) {
  return (
    <div className="color-token-swatch">
      <div
        className="color-token-swatch__preview"
        style={{ backgroundColor: `var(${cssVar})` }}
        aria-hidden="true"
      />
      <div className="color-token-swatch__info">
        <span className="color-token-var">{cssVar}</span>
        {description && <span className="color-token-swatch__desc">{description}</span>}
        <CopyButton value={cssVar} />
      </div>
    </div>
  );
}

export function ColorTokenTable({ title, description, tokens }: ColorTokenGroup) {
  return (
    <section className="color-token-group">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <div className="color-token-grid">
        {tokens.map(token => (
          <ColorSwatch key={token.cssVar} {...token} />
        ))}
      </div>
    </section>
  );
}

// ------------------------------------------------------------------
// Background color tokens
// ------------------------------------------------------------------
export const BACKGROUND_TOKENS: ColorTokenGroup[] = [
  {
    title: 'Default',
    description: 'Standard surface colors for the main page background.',
    tokens: [
      { cssVar: '--post-default-bg', description: 'Background color' },
      { cssVar: '--post-default-fg', description: 'Foreground / text color' },
      { cssVar: '--post-default-border', description: 'Border color' },
    ],
  },
  {
    title: 'Alternate',
    description: 'Used to differentiate alternating sections without strong emphasis.',
    tokens: [
      { cssVar: '--post-alternate-bg', description: 'Background color' },
      { cssVar: '--post-alternate-fg', description: 'Foreground / text color' },
      { cssVar: '--post-alternate-border', description: 'Border color' },
    ],
  },
  {
    title: 'Accent',
    description: 'A complementary color used for highlights and emphasis.',
    tokens: [
      { cssVar: '--post-accent-bg', description: 'Background color' },
      { cssVar: '--post-accent-fg', description: 'Foreground / text color' },
      { cssVar: '--post-accent-border', description: 'Border color' },
    ],
  },
  {
    title: 'Brand',
    description: 'The primary Swiss Post brand color surface.',
    tokens: [
      { cssVar: '--post-brand-bg', description: 'Background color' },
      { cssVar: '--post-brand-fg', description: 'Foreground / text color' },
      { cssVar: '--post-brand-border', description: 'Border color' },
    ],
  },
];

// ------------------------------------------------------------------
// Signal color tokens
// ------------------------------------------------------------------
export const SIGNAL_TOKENS: ColorTokenGroup[] = [
  {
    title: 'Success',
    tokens: [
      { cssVar: '--post-success-bg', description: 'Background color' },
      { cssVar: '--post-success-fg', description: 'Foreground / text color' },
      { cssVar: '--post-success-border', description: 'Border color' },
    ],
  },
  {
    title: 'Info',
    tokens: [
      { cssVar: '--post-info-bg', description: 'Background color' },
      { cssVar: '--post-info-fg', description: 'Foreground / text color' },
      { cssVar: '--post-info-border', description: 'Border color' },
    ],
  },
  {
    title: 'Warning',
    tokens: [
      { cssVar: '--post-warning-bg', description: 'Background color' },
      { cssVar: '--post-warning-fg', description: 'Foreground / text color' },
      { cssVar: '--post-warning-border', description: 'Border color' },
    ],
  },
  {
    title: 'Error',
    tokens: [
      { cssVar: '--post-error-bg', description: 'Background color' },
      { cssVar: '--post-error-fg', description: 'Foreground / text color' },
      { cssVar: '--post-error-border', description: 'Border color' },
    ],
  },
];

// ------------------------------------------------------------------
// Interactive (button) color tokens
// ------------------------------------------------------------------
export interface InteractiveTokenRow {
  state: string;
  bg: string;
  fg: string;
  border: string;
}

export interface InteractiveTokenGroup {
  title: string;
  cssPrefix: string;
  rows: InteractiveTokenRow[];
}

const BUTTON_STATES: InteractiveTokenRow[] = [
  { state: 'default', bg: 'bg.default', fg: 'fg.default', border: 'border.default' },
  { state: 'hover', bg: 'bg.hover', fg: 'fg.hover', border: 'border.hover' },
  { state: 'focus', bg: 'bg.focus', fg: 'fg.focus', border: 'border.focus' },
  { state: 'disabled', bg: 'bg.disabled', fg: 'fg.disabled', border: 'border.disabled' },
];

const INPUT_STATES: InteractiveTokenRow[] = [
  { state: 'default', bg: 'bg.default', fg: 'fg.default', border: 'border.default' },
  { state: 'hover', bg: 'bg.hover', fg: 'fg.hover', border: 'border.hover' },
  { state: 'focus', bg: 'bg.focus', fg: 'fg.focus', border: 'border.focus' },
  { state: 'disabled', bg: 'bg.disabled', fg: 'fg.disabled', border: 'border.disabled' },
  { state: 'readonly', bg: 'bg.readonly', fg: 'fg.readonly', border: 'border.readonly' },
  { state: 'valid', bg: 'bg.valid', fg: 'fg.valid', border: 'border.valid' },
  { state: 'invalid', bg: 'bg.invalid', fg: 'fg.invalid', border: 'border.invalid' },
];

export const BUTTON_INTERACTIVE_GROUPS: InteractiveTokenGroup[] = [
  { title: 'Primary', cssPrefix: 'post-primary', rows: BUTTON_STATES },
  { title: 'Secondary', cssPrefix: 'post-secondary', rows: BUTTON_STATES },
  { title: 'Tertiary', cssPrefix: 'post-tertiary', rows: BUTTON_STATES },
];

export const INPUT_INTERACTIVE_GROUP: InteractiveTokenGroup = {
  title: 'Input',
  cssPrefix: 'post-input',
  rows: INPUT_STATES,
};

function InteractiveCell({ cssVar }: { cssVar: string }) {
  return (
    <div className="color-token-cell">
      <span
        className="color-token-chip"
        style={{ backgroundColor: `var(${cssVar})` }}
        aria-hidden="true"
      />
      <span className="color-token-var">{cssVar}</span>
      <CopyButton value={cssVar} />
    </div>
  );
}

export function InteractiveTokenTable({ title, cssPrefix, rows }: InteractiveTokenGroup) {
  return (
    <section className="color-token-group">
      <h3>{title}</h3>
      <table className="table color-token-table">
        <thead>
          <tr>
            <th scope="col">State</th>
            <th scope="col">Background</th>
            <th scope="col">Foreground</th>
            <th scope="col">Border</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ state, bg, fg, border }) => {
            const bgVar = `--${cssPrefix}-${bg.replace('.', '-')}`;
            const fgVar = `--${cssPrefix}-${fg.replace('.', '-')}`;
            const borderVar = `--${cssPrefix}-${border.replace('.', '-')}`;
            return (
              <tr key={state}>
                <th scope="row">
                  <span className="color-token-var">{state}</span>
                </th>
                <td><InteractiveCell cssVar={bgVar} /></td>
                <td><InteractiveCell cssVar={fgVar} /></td>
                <td><InteractiveCell cssVar={borderVar} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

// ------------------------------------------------------------------
// Core color tokens
// ------------------------------------------------------------------
export interface CoreColorToken {
  cssVar: string;
  /** Actual resolved color value for display — used to determine contrast of the swatch label */
  value: string;
  alpha?: boolean;
}

export interface CoreColorGroup {
  title: string;
  description?: string;
  tokens: CoreColorToken[];
}

function CoreColorSwatch({ cssVar, value, alpha }: CoreColorToken) {
  const previewStyle: React.CSSProperties = alpha
    ? ({ '--color-preview': `var(${cssVar})` } as React.CSSProperties)
    : { backgroundColor: `var(${cssVar})` };

  return (
    <div className={`color-token-swatch color-token-swatch--core${alpha ? ' color-token-swatch--alpha' : ''}`}>
      <div
        className="color-token-swatch__preview"
        style={previewStyle}
        aria-hidden="true"
      />
      <div className="color-token-swatch__info">
        <span className="color-token-var">{cssVar}</span>
        <span className="color-token-swatch__value">{value}</span>
        <CopyButton value={cssVar} />
      </div>
    </div>
  );
}

function CoreColorSection({ title, description, tokens }: CoreColorGroup) {
  return (
    <section className="color-token-group">
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      <div className="color-token-grid">
        {tokens.map(token => (
          <CoreColorSwatch key={token.cssVar} {...token} />
        ))}
      </div>
    </section>
  );
}

export const CORE_COLOR_GROUPS: CoreColorGroup[] = [
  {
    title: 'Brand',
    tokens: [
      { cssVar: '--post-core-color-brand-postyellow', value: '#FFCC00' },
      { cssVar: '--post-core-color-brand-black', value: '#000000' },
      { cssVar: '--post-core-color-brand-white', value: '#FFFFFF' },
    ],
  },
  {
    title: 'Sandgrey',
    description: 'A neutral scale from near-white (000) to near-black (100).',
    tokens: [
      { cssVar: '--post-core-color-sandgrey-000', value: '#FCFCFC' },
      { cssVar: '--post-core-color-sandgrey-002', value: '#FAFAFA' },
      { cssVar: '--post-core-color-sandgrey-006', value: '#F0EFED' },
      { cssVar: '--post-core-color-sandgrey-012', value: '#E1E0DC' },
      { cssVar: '--post-core-color-sandgrey-020', value: '#CDCCC8' },
      { cssVar: '--post-core-color-sandgrey-030', value: '#B4B3AF' },
      { cssVar: '--post-core-color-sandgrey-040', value: '#9B9A96' },
      { cssVar: '--post-core-color-sandgrey-050', value: '#82817D' },
      { cssVar: '--post-core-color-sandgrey-060', value: '#696864' },
      { cssVar: '--post-core-color-sandgrey-070', value: '#504F4B' },
      { cssVar: '--post-core-color-sandgrey-080', value: '#373632' },
      { cssVar: '--post-core-color-sandgrey-090', value: '#1E1D19' },
      { cssVar: '--post-core-color-sandgrey-100', value: '#050400' },
    ],
  },
  {
    title: 'Sandgrey Alpha — Dark',
    description: 'Semi-transparent dark sand overlays at 10 %–90 % opacity.',
    tokens: [
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-10', value: 'rgba(5,4,0,0.1)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-20', value: 'rgba(5,4,0,0.2)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-30', value: 'rgba(5,4,0,0.3)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-40', value: 'rgba(5,4,0,0.4)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-50', value: 'rgba(5,4,0,0.5)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-60', value: 'rgba(5,4,0,0.6)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-70', value: 'rgba(5,4,0,0.7)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-80', value: 'rgba(5,4,0,0.8)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-darksand-90', value: 'rgba(5,4,0,0.9)', alpha: true },
    ],
  },
  {
    title: 'Sandgrey Alpha — Light',
    description: 'Semi-transparent light sand overlays at 10 %–90 % opacity.',
    tokens: [
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-10', value: 'rgba(252,252,252,0.1)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-20', value: 'rgba(252,252,252,0.2)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-30', value: 'rgba(252,252,252,0.3)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-40', value: 'rgba(252,252,252,0.4)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-50', value: 'rgba(252,252,252,0.5)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-60', value: 'rgba(252,252,252,0.6)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-70', value: 'rgba(252,252,252,0.7)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-80', value: 'rgba(252,252,252,0.8)', alpha: true },
      { cssVar: '--post-core-color-sandgrey-alpha-lightsand-90', value: 'rgba(252,252,252,0.9)', alpha: true },
    ],
  },
  {
    title: 'Notification',
    description: 'Colors used for success, error, warning, and information states.',
    tokens: [
      { cssVar: '--post-core-color-notification-green', value: '#107800' },
      { cssVar: '--post-core-color-notification-red', value: '#B20000' },
      { cssVar: '--post-core-color-notification-orange', value: '#D93D00' },
      { cssVar: '--post-core-color-notification-blue', value: '#0050A1' },
      { cssVar: '--post-core-color-notification-green-light', value: '#C3DDBF' },
      { cssVar: '--post-core-color-notification-red-light', value: '#EBBFBF' },
      { cssVar: '--post-core-color-notification-orange-light', value: '#F5CEBF' },
      { cssVar: '--post-core-color-notification-blue-light', value: '#BFD3E7' },
      { cssVar: '--post-core-color-notification-green-night', value: '#55E543' },
      { cssVar: '--post-core-color-notification-red-night', value: '#FFC2C2' },
    ],
  },
  {
    title: 'Cargo',
    tokens: [
      { cssVar: '--post-core-color-cargo-green', value: '#00411C' },
      { cssVar: '--post-core-color-cargo-blue', value: '#AADCFF' },
    ],
  },
];

export function CoreColorPalette() {
  return (
    <div>
      {CORE_COLOR_GROUPS.map(group => (
        <CoreColorSection key={group.title} {...group} />
      ))}
    </div>
  );
}
