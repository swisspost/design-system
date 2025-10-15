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
                This text contains <small>small inline text</small> for fine print or disclaimers.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;strong&gt;&lt;/strong&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                This text shows <strong>strong emphasis</strong> for important words or phrases.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;em&gt;&lt;/em&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                This text shows <em>emphasis through italics</em> for subtle highlighting.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;sub&gt;&lt;/sub&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                This text contains <sub>subscript text</sub> for chemical formulas or footnotes.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;sup&gt;&lt;/sup&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                This text contains <sup>superscript text</sup> for exponents or references.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;mark&gt;&lt;/mark&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                This text <mark>highlights important information</mark> for visual scanning.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;abbr&gt;&lt;/abbr&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                This text contains an <abbr title="abbreviation">abbr</abbr> element for shortened
                forms.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;code&gt;&lt;/code&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                This text shows <code>inline code examples</code> for technical documentation.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;kbd&gt;&lt;/kbd&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy text to clipboard.
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <code>&lt;del&gt;&lt;/del&gt;</code>
            </td>
            <td className="font-sans-serif">
              <p>
                This shows <del>deleted text</del> for tracking changes or corrections.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
// TODO: remove examples for List
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
                <li>First item in an unordered list</li>
                <li>Second item with standard bullet points</li>
                <li>
                  Third item with nested list
                  <ul>
                    <li>First nested item</li>
                    <li>Second nested item</li>
                    <li>Third nested item</li>
                  </ul>
                </li>
                <li>Final item in the main list</li>
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
                <li>First step in a numbered list</li>
                <li>Second step with sequential numbering</li>
                <li>
                  Third step with nested instructions
                  <ol>
                    <li>First sub-step</li>
                    <li>Second sub-step</li>
                    <li>Third sub-step</li>
                  </ol>
                </li>
                <li>Final step in the main sequence</li>
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
                <dt className="fw-bold">Term 1</dt>
                <dd>Definition or description of the first term</dd>
                <dt className="fw-bold">Term 2</dt>
                <dd>Explanation of the second term in the list</dd>
                <dt className="fw-bold">Term 3</dt>
                <dd>Detailed description for the third entry</dd>
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
                  <dt className="col-3 fw-bold">Name</dt>
                  <dd className="col-9">John Smith</dd>
                  <dt className="col-3 fw-bold">Email</dt>
                  <dd className="col-9">john@example.com</dd>
                  <dt className="col-3 fw-bold">Role</dt>
                  <dd className="col-9">Frontend Developer</dd>
                </dl>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// TODO: add example for Legend
// 1) Legend for small and large in Canvas (How to Canvas look for 'Text' Component as idea)
// 2) Code snippets for small and large like in Docs, that means two <fieldset> with <legend>
// 3) Table to test the small and large toggle
export function Legends() {
  return (
    <div>
      <fieldset>
        <legend>Default legend</legend>
      </fieldset>

      <fieldset>
        <legend className="large">Default legend</legend>
      </fieldset>
    </div>
  );
}

// export function Legends() {
//   return (
//     <div className="sb-legends table-responsive">
//       <table className="table">
//         <thead>
//           <tr>
//             <th className="w-quarter">Tag</th>
//             <th>Visual</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <code>&lt;legend&gt;&lt;/legend&gt;</code>
//             </td>
//             <td>
//               <fieldset>
//                 <legend className="small">Default legend</legend>
//               </fieldset>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <code>&lt;legend class="large"&gt;&lt;/legend&gt;</code>
//             </td>
//             <td>
//               <fieldset>
//                 <legend className="large">Default legend</legend>
//               </fieldset>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// TODO: add examples for Headings with Subheadings
// 1) Canvas with examples
// 2) Code snippets like in Docs
// 3) Table to test the h1-h6 with subheadings
export function HeadingsWithSubheadings() {
  return (
    <div>
      <h1>
        <span className="d-block">h1 Heading</span>
        <span className="fw-normal">h1 Subheading</span>
      </h1>

      <h2>
        <span className="d-block">h2 Heading</span>
        <span className="fw-normal">h2 Subheading</span>
      </h2>

      <h3>
        <span className="d-block">h3 Heading</span>
        <span className="fw-normal">h3 Subheading</span>
      </h3>

      <h4>
        <span className="d-block">h4 Heading</span>
        <span className="fw-normal">h4 Subheading</span>
      </h4>

      <h5>
        <span className="d-block">h5 Heading</span>
        <span className="fw-normal">h5 Subheading</span>
      </h5>

      <h6>
        <span className="d-block">h6 Heading</span>
        <span className="fw-normal">h6 Subheading</span>
      </h6>
    </div>
  );
}

// export function HeadingsWithSubheadings() {
//   return (
//     <div className="sb-headings-with-subheadings table-responsive">
//       <table className="table">
//         <thead>
//           <tr>
//             <th className="w-quarter">Tag</th>
//             <th>Visual</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <code>
//                 &lt;h1&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="d-block"&gt;&lt;/span&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="fw-normal"&gt;&lt;/span&gt;
//                 <br />
//                 &lt;/h1&gt;
//               </code>
//             </td>
//             <td className="font-sans-serif">
//               <h1>
//                 h1 Heading <br />
//                 <span className="fw-normal d-block">h1 Subheading</span>
//               </h1>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <code>
//                 &lt;h2&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="d-block"&gt;&lt;/span&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="fw-normal"&gt;&lt;/span&gt;
//                 <br />
//                 &lt;/h2&gt;
//               </code>
//             </td>
//             <td className="font-sans-serif">
//               <h2>
//                 h2 Heading <br />
//                 <span className="fw-normal d-block">h2 Subheading</span>
//               </h2>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <code>
//                 &lt;h3&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="d-block"&gt;&lt;/span&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="fw-normal"&gt;&lt;/span&gt;
//                 <br />
//                 &lt;/h3&gt;
//               </code>
//             </td>
//             <td className="font-sans-serif">
//               <h3>
//                 h3 Heading <br />
//                 <span className="fw-normal d-block">h3 Subheading</span>
//               </h3>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <code>
//                 &lt;h4&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="d-block"&gt;&lt;/span&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="fw-normal"&gt;&lt;/span&gt;
//                 <br />
//                 &lt;/h4&gt;
//               </code>
//             </td>
//             <td className="font-sans-serif">
//               <h4>
//                 h4 Heading <br />
//                 <span className="fw-normal d-block">h4 Subheading</span>
//               </h4>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <code>
//                 &lt;h5&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="d-block"&gt;&lt;/span&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="fw-normal"&gt;&lt;/span&gt;
//                 <br />
//                 &lt;/h5&gt;
//               </code>
//             </td>
//             <td className="font-sans-serif">
//               <h5>
//                 h5 Heading <br />
//                 <span className="fw-normal d-block">h5 Subheading</span>
//               </h5>
//             </td>
//           </tr>
//           <tr>
//             <td>
//               <code>
//                 &lt;h6&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="d-block"&gt;&lt;/span&gt;
//                 <br />
//                 &nbsp;&nbsp;&lt;span class="fw-normal"&gt;&lt;/span&gt;
//                 <br />
//                 &lt;/h6&gt;
//               </code>
//             </td>
//             <td className="font-sans-serif">
//               <h6>
//                 h6 Heading <br />
//                 <span className="fw-normal d-block">h6 Subheading</span>
//               </h6>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }
