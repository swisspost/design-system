// icons.stories.ts
import { Canvas } from '@storybook/blocks';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';
import reportData from '../../../../node_modules/@swisspost/design-system-icons/public/report.json';
import { IconReport } from './icons-report';

// Assert the type of the imported report
const report = reportData as IconReport;

const meta: Meta = {
  title: 'Health/Icons',
};

export default meta;

type Story = StoryObj;

const renderIconReport = () => {
  return html`
    <style>
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
      }
      .icons {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem;
      }
      .icon {
        text-align: center;
        font-size: 0.8rem;
      }
      .icon img {
        width: 32px;
        height: 32px;
      }
      pre {
        white-space: pre-wrap;
        word-break: break-all;
      }
    </style>
    <div class="container">
      <section>
        <h1 id="converted">Icons</h1>
        <code class="my-32 d-block">
          Version: ${report.version}<br />
          Last updated: ${new Date(report.created).toLocaleString()}<br />
          Successful: ${report.stats.success}<br />
          Errored: ${report.stats.errors}<br />
          Not found: ${report.stats.notFound}
        </code>

        <hr style="margin-block: 1rem" />

        <div class="converted-icons icons">
          ${report.icons.map(
            icon => html`
              <div class="icon">
                <img src="./post-icons/${icon.file.name}" alt="icon" />
                <span>${icon.file.basename}</span>
              </div>
            `,
          )}
        </div>
      </section>

      ${report.wrongViewBox.length > 0
        ? html`
            <section>
              <h1 class="mt-56 mb-32">Wrong ViewBox</h1>
              <p>The viewBox attribute of the incoming SVG file is not set to "0 0 32 32".</p>
              <div class="converted-icons icons">
                ${report.wrongViewBox.map(
                  icon => html`
                    <div class="icon">
                      <img
                        src="./post-icons/${icon.file.name}"
                        alt="icon"
                        style="background: #ccc"
                      />
                      <span>${icon.file.basename}</span>
                    </div>
                  `,
                )}
              </div>
            </section>
          `
        : ''}
      ${report.noKeywords.length > 0
        ? html`
            <section>
              <h1 class="mt-56 mb-32">No Keywords</h1>
              <p>The incoming SVG file has no keywords specified.</p>
              <div class="converted-icons icons">
                ${report.noKeywords.map(
                  icon => html`
                    <div class="icon">
                      <img
                        src="./post-icons/${icon.file.name}"
                        alt="icon"
                        style="background: #ccc"
                      />
                      <span>${icon.file.basename}</span>
                    </div>
                  `,
                )}
              </div>
            </section>
          `
        : ''}
      ${report.errored.length > 0
        ? html`
            <section>
              <h1 class="mt-56 mb-32">Errored</h1>
              <ul>
                ${report.errored.map(
                  icon => html`
                    <li>
                      <a href="${icon.meta.downloadLink}">${icon.file.name}</a><br />
                      <pre>${icon.errorMessage}</pre>
                    </li>
                  `,
                )}
              </ul>
            </section>
          `
        : ''}
      ${report.noSVG.length > 0
        ? html`
            <section>
              <h1 class="mt-56 mb-32">SVG file not found</h1>
              <ul>
                ${report.noSVG.map(icon => html` <li>${icon.file.basename}</li> `)}
              </ul>
            </section>
          `
        : ''}
    </div>
  `;
};

export const Icons: Story = {
  render: renderIconReport,
};
