import React from 'react';
import { objectify } from '../../../utils/sass-export.ts';
import { forEach } from '../../../utils/react.ts';
import './typography.components.scss';
import scss from './typography.export.scss';

const SCSS_VARIABLES = objectify(scss);
const baseFontSize = parseFloat(SCSS_VARIABLES.base.fontSize);
console.log(SCSS_VARIABLES);

export function FontFaceWrapper (props: { children: React.ReactElement[] | null }) {
  return <div className="sb-fontface-wrapper">
    { props.children }
  </div>;
};

export function FontFace (props: { face: string, family: string, weight: string, style: string }) {
  return <article className="sb-fontface">
    <div className={ `sb-fontface__typo font-${props.family} fw-${props.weight} fst-${props.style}` }>
      Aa
    </div>

    <div className={ `sb-fontface__chars font-${props.family} fw-${props.weight} fst-${props.style}` }>
      ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
      abcdefghijklmnopqrstuvwxyz<br/>
      1234567890(,.;:?!$&*)
    </div>

    <div className="sb-fontface__settings">
      <div className="settings__face">{ props.face }</div>
      <div className="settings__weight">
        <span>Weight:</span> { props.weight }
      </div>
      <div className="settings__style">
        <span>Style:</span> { props.style }
      </div>
    </div>
  </article>;
};

export function FontSizesAndLineheights () {
  return <div className="sb-fontsizes">
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th className="w-25">Name</th>
          <th>Font Size</th>
          <th>Line Height</th>
        </tr>
      </thead>
      <tbody>
          {
            forEach(SCSS_VARIABLES.fontSizes, (data: { key: string, value: any }) => (
              <tr key={ data.key }>
                <th>{ data.key }</th>
                <td>
                  <span>{ data.value }</span><br/>
                  <span className="fs-tiny text-muted">{ `${parseFloat(data.value) * baseFontSize}px` }</span>
                </td>
                <td>
                  <span>{ SCSS_VARIABLES.lineHeights[data.key] }</span><br/>
                  <span className="fs-tiny text-muted">{ `${parseFloat(SCSS_VARIABLES.lineHeights[data.key]) * baseFontSize}px` }</span>
                </td>
              </tr>
            ))
          }
      </tbody>
    </table>
  </div>;
};

export function FontCurves () {
  return <div className="sb-fontcurves">
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          { forEach(SCSS_VARIABLES.fontCurves.tiny, (data: { key: string, value: any }) => <th key={ data.key }>{ data.key }</th>) }
        </tr>
      </thead>
      <tbody>
          {
            forEach(SCSS_VARIABLES.fontCurves, (data1: { key: string, value: any }) => (
              <tr key={ data1.key }>
                <th>{ data1.key }</th>
                {
                  forEach(data1.value, (data2: { key: string, value: any }) => (
                    <td key={ data2.key }>
                      <span>{ data2.value }</span><br/>
                      <span className="fs-tiny text-muted">{ `${parseFloat(data2.value) * baseFontSize}px` }</span>
                    </td>
                  ))
                }
              </tr>
            ))
          }
      </tbody>
    </table>
  </div>;
};

export function Headings () {
  return <div className="sb-headings">
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th className="w-25">Tag</th>
          <th>Visual</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>&lt;h1&gt;&lt;/h1&gt;</code></td>
          <td><p className="m-0 h1">h1 Heading</p></td>
        </tr>
        <tr>
          <td><code>&lt;h2&gt;&lt;/h2&gt;</code></td>
          <td><p className="m-0 h2">h2 Heading</p></td>
        </tr>
        <tr>
          <td><code>&lt;h3&gt;&lt;/h3&gt;</code></td>
          <td><p className="m-0 h3">h3 Heading</p></td>
        </tr>
        <tr>
          <td><code>&lt;h4&gt;&lt;/h4&gt;</code></td>
          <td><p className="m-0 h4">h4 Heading</p></td>
        </tr>
        <tr>
          <td><code>&lt;h5&gt;&lt;/h5&gt;</code></td>
          <td><p className="m-0 h5">h5 Heading</p></td>
        </tr>
        <tr>
          <td><code>&lt;h6&gt;&lt;/h6&gt;</code></td>
          <td><p className="m-0 h6">h6 Heading</p></td>
        </tr>
        <tr>
          <td><code>&lt;p class="lead"&gt;&lt;/p&gt;</code></td>
          <td><p className="m-0 lead">Lead sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p></td>
        </tr>
      </tbody>
    </table>
  </div>
}