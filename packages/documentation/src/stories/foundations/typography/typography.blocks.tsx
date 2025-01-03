import React from 'react';
import { parse } from '@/utils/sass-export';
import { forEach } from '@/utils/react';
import { round } from '@/utils/units';
import scss from './typography.module.scss';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const SCSS_VARIABLES: any = parse(scss);
const baseFontSize = parseFloat(SCSS_VARIABLES.base.fontSize);

export function FontFaceWrapper(props: { children: React.ReactElement[] | null }) {
  return <div className="sb-fontface-wrapper">{props.children}</div>;
}

export function FontFace(props: { face: string; family: string; weight: string; style: string }) {
  return (
    <article className="sb-fontface">
      <div
        className={`sb-fontface__typo font-${props.family} fw-${props.weight} fst-${props.style}`}
      >
        Aa
      </div>

      <div
        className={`sb-fontface__chars font-${props.family} fw-${props.weight} fst-${props.style}`}
      >
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
        <br />
        abcdefghijklmnopqrstuvwxyz
        <br />
        1234567890(,.;:?!$&*)
      </div>

      <div className="sb-fontface__settings">
        <div className="settings__face">{props.face}</div>
        <div className="settings__weight">
          <span>Weight:</span> {props.weight}
        </div>
        <div className="settings__style">
          <span>Style:</span> {props.style}
        </div>
      </div>
    </article>
  );
}

export function FontSizesAndLineheights() {
  return (
    <div className="sb-fontsizes table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="w-quarter">Name</th>
            <th>Class</th>
            <th>Scss variable</th>
            <th>Font Size</th>
            <th>Line Height</th>
          </tr>
        </thead>
        <tbody>
          {forEach(SCSS_VARIABLES.fontSizes, ({ key, value }) => (
            <tr key={key}>
              <th>font-size-{key}</th>
              <td>
                <code>font-size-{key}</code>
              </td>
              <td>
                <code>$font-size-{key}</code>
              </td>
              <td>
                <span>{`${round(parseFloat(value) * baseFontSize, 4)}px`}</span>
                <br />
                <span className="fs-tiny text-muted">{value}</span>
              </td>
              <td>
                <span>1.{parseInt(key) >= 24 ? '2' : '5'}</span>
                <br />
                <span className="fs-tiny text-muted">
                  {round(parseFloat(value) * (parseFloat(key) >= 24 ? 1.2 : 1.5), 4)}
                  rem
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FontCurves() {
  return (
    <div className="sb-fontcurves table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            {forEach(SCSS_VARIABLES.fontCurves.tiny, ({ key }) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {forEach(SCSS_VARIABLES.fontCurves, curve => (
            <tr key={curve.key}>
              <th>{curve.key}</th>
              {forEach(curve.value, ({ key, value }) => (
                <td key={key}>
                  <span>{round(parseFloat(value) * baseFontSize, 4)}px</span>
                  <br />
                  <span className="fs-tiny text-muted">{value}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Headings() {
  return (
    <div className="sb-headings table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="w-quarter">Tag</th>
            <th>Visual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>&lt;h1&gt;&lt;/h1&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p className="m-0 h1">h1 Heading</p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;h2&gt;&lt;/h2&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p className="m-0 h2">h2 Heading</p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;h3&gt;&lt;/h3&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p className="m-0 h3">h3 Heading</p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;h4&gt;&lt;/h4&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p className="m-0 h4">h4 Heading</p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;h5&gt;&lt;/h5&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p className="m-0 h5">h5 Heading</p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;h6&gt;&lt;/h6&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p className="m-0 h6">h6 Heading</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Paragraphs() {
  return (
    <div className="sb-paragraphs table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="w-quarter">Tag</th>
            <th>Visual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>&lt;p&gt;&lt;/p&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et justo accusam et duo dolores et ea rebum. Consetetur sadipscing
                elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                erat, sed diam voluptua.
              </p>
              <p>
                Nullam quis risus eget urna mollis ornare veleu leo. Cum sociis natoque penatibus et
                magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh
                ultricies vehicula.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;p class="lead"&gt;&lt;/p&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p className="m-0 lead">
                Lead sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Links() {
  return (
    <div className="sb-links table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="w-quarter">Tag</th>
            <th>Visual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>&lt;a&gt;&lt;/a&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                <a href="#" onClick={e => e.preventDefault()}>
                  Link
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>
                &lt;p&gt;
                <br />
                &nbsp;&nbsp;&lt;a&gt;&lt;/a&gt;
                <br />
                &lt;/p&gt;
              </code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et justo accusam et duo dolores et ea rebum. Consetetur sadipscing
                elitr, sed diam nonumy eirmod tempor{' '}
                <a href="#" onClick={e => e.preventDefault()}>
                  invidunt ut labore et dolore
                </a>{' '}
                magna aliquyam erat, sed diam voluptua.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Inlines() {
  return (
    <div className="sb-inlines table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="w-quarter">Tag</th>
            <th>Visual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>&lt;small&gt;&lt;/small&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <small>accusam et justo duo</small> dolores et ea rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;strong&gt;&lt;/strong&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <strong>accusam et justo duo</strong> dolores et ea rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;em&gt;&lt;/em&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <em>accusam et justo duo</em> dolores et ea rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;sub&gt;&lt;/sub&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <sub>accusam et justo duo</sub> dolores et ea rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;sup&gt;&lt;/sup&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <sup>accusam et justo duo</sup> dolores et ea rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;mark&gt;&lt;/mark&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <mark>accusam et justo duo</mark> dolores et ea rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;abbr&gt;&lt;/abbr&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <abbr title="abbrevation"> accusam et justo duo</abbr> dolores et ea
                rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;code&gt;&lt;/code&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <code>accusam et justo duo</code> dolores et ea rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;kbd&gt;&lt;/kbd&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <kbd>accusam et justo duo</kbd> dolores et ea rebum.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;del&gt;&lt;/del&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                At vero eos et <del>accusam et justo duo</del> dolores et ea rebum.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function Lists() {
  return (
    <div className="sb-inlines table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th className="w-quarter">Tag</th>
            <th>Visual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p className="small">Unordered Lists</p>
              <code>
                &lt;ul&gt;
                <br />
                &nbsp;&nbsp;&lt;li&gt;&lt;/li&gt;
                <br />
                &lt;/ul&gt;
              </code>
            </td>
            <td>
              <ul>
                <li>Nullam quis risus eget urna mollis.</li>
                <li>At vero eos et justo accusam et duo dolores et ea rebum.</li>
                <li>
                  Invidunt ut labore et dolore magna aliquyam erat.
                  <ul>
                    <li>Nullam quis risus eget urna mollis.</li>
                    <li>At vero eos et justo accusam et duo dolores et ea rebum.</li>
                    <li>Invidunt ut labore et dolore magna aliquyam erat.</li>
                  </ul>
                </li>
                <li>At vero eos et justo accusam et duo dolores et ea rebum.</li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <p className="small">Ordered Lists</p>
              <code>
                &lt;ol&gt;
                <br />
                &nbsp;&nbsp;&lt;li&gt;&lt;/li&gt;
                <br />
                &lt;/ol&gt;
              </code>
            </td>
            <td>
              <ol>
                <li>Nullam quis risus eget urna mollis.</li>
                <li>At vero eos et justo accusam et duo dolores et ea rebum.</li>
                <li>
                  Invidunt ut labore et dolore magna aliquyam erat.
                  <ol>
                    <li>Nullam quis risus eget urna mollis.</li>
                    <li>At vero eos et justo accusam et duo dolores et ea rebum.</li>
                    <li>Invidunt ut labore et dolore magna aliquyam erat.</li>
                  </ol>
                </li>
                <li>At vero eos et justo accusam et duo dolores et ea rebum.</li>
              </ol>
            </td>
          </tr>
          <tr>
            <td>
              <p className="small">Description Lists (inline)</p>
              <code>
                &lt;dl&gt;
                <br />
                &nbsp;&nbsp;&lt;dt&gt;&lt;/dt&gt;
                <br />
                &nbsp;&nbsp;&lt;dd&gt;&lt;/dd&gt;
                <br />
                &lt;/dl&gt;
              </code>
            </td>
            <td>
              <dl>
                <dt>Title</dt>
                <dd>Nullam quis risus eget urna mollis.</dd>
                <dt>Second Title</dt>
                <dd>At vero eos et justo accusam et duo dolores et ea rebum.</dd>
                <dt>Third Title</dt>
                <dd>Invidunt ut labore et dolore magna aliquyam erat.</dd>
              </dl>
            </td>
          </tr>
          <tr>
            <td>
              <p className="small">Description Lists (grid)</p>
              <code>
                &lt;dl class="row"&gt;
                <br />
                &nbsp;&nbsp;&lt;dt class="col-3"&gt;&lt;/dt&gt;
                <br />
                &nbsp;&nbsp;&lt;dd class="col-9"&gt;&lt;/dd&gt;
                <br />
                &lt;/dl&gt;
              </code>
            </td>
            <td>
              <div className="overflow-hidden">
                <dl className="row">
                  <dt className="col-3">Title</dt>
                  <dd className="col-9">Nullam quis risus eget urna mollis.</dd>
                  <dt className="col-3">Second Title</dt>
                  <dd className="col-9">
                    At vero eos et justo accusam et duo dolores et ea rebum.
                  </dd>
                  <dt className="col-3">Third Title</dt>
                  <dd className="col-9">Invidunt ut labore et dolore magna aliquyam erat.</dd>
                </dl>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
