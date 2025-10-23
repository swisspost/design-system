import React from 'react';

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
                This is a sample paragraph showing how text will appear in your application. It
                demonstrates the font style, size, and spacing that will be used throughout your
                content.
              </p>
              <p>
                Another paragraph follows to illustrate how multiple paragraphs will look. Notice
                the spacing between paragraphs and how the text flows naturally from one line to the
                next.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;p class="lead"&gt;&lt;/p&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p className="m-0 lead">
                This is a lead paragraph that stands out from regular text, typically used for
                introductory content.
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
                  Example Link
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
                This paragraph contains an inline{' '}
                <a href="#" onClick={e => e.preventDefault()}>
                  clickable link
                </a>{' '}
                that demonstrates how hyperlinks will appear within body text.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
