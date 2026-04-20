import { Args, StoryObj } from '@storybook/web-components-vite';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const GRID_CELLS = [1, 2, 3, 4];
const LINKS_PER_CELL = [6, 8, 8, 5];

const meta: MetaComponent = {
  id: 'd97528b3-a9ef-4201-bf28-9caf6e8997dc',
  title: 'Components/Footer',
  component: 'post-footer',
  tags: ['package:WebComponents', 'status:InProgress'],
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=558-7013',
    },
  },
  render,
  args: {
    textFooter: 'Footer',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj;

function render(args: Args) {
  return html`<post-footer text-footer=${args.textFooter}>
    ${GRID_CELLS.map(
      cell => html`
        <span id="grid-${cell}-title" slot="grid-${cell}-title">Title ${cell}</span>

        <ul slot="grid-${cell}" aria-labelledby="grid-${cell}-title">
          ${Array.from(Array(LINKS_PER_CELL[cell - 1]).keys()).map(
            item => html`
              <li>
                <a href="#">Text link ${item + 1}</a>
              </li>
            `,
          )}
        </ul>
      `,
    )}

    <!-- socialmedia links -->

    <div slot="socialmedia">
      <h3 id="socialmedia">Follow us</h3>
      <ul aria-labelledby="socialmedia">
        <li>
          <a href="https://www.facebook.com/swisspost" class="btn btn-primary btn-icon">
            <post-icon aria-hidden="true" name="facebook"></post-icon>
            <span class="visually-hidden">Facebook</span>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/swisspost/" class="btn btn-primary btn-icon">
            <post-icon aria-hidden="true" name="instagram"></post-icon>
            <span class="visually-hidden">Instagram</span>
          </a>
        </li>
        <li>
          <a href="http://www.youtube.com/swisspost" class="btn btn-primary btn-icon">
            <post-icon aria-hidden="true" name="youtube"></post-icon>
            <span class="visually-hidden">Youtube</span>
          </a>
        </li>
        <li>
          <a href="https://www.snapchat.com/add/swisspostjobs" class="btn btn-primary btn-icon">
            <post-icon aria-hidden="true" name="snapchat"></post-icon>
            <span class="visually-hidden">Snapchat</span>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/PostSchweiz" class="btn btn-primary btn-icon">
            <post-icon aria-hidden="true" name="twitterx"></post-icon>
            <span class="visually-hidden">Twitter X</span>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/swiss-post" class="btn btn-primary btn-icon">
            <post-icon aria-hidden="true" name="linkedin"></post-icon>
            <span class="visually-hidden">Linkedin</span>
          </a>
        </li>
        <li>
          <a
            href="https://www.xing.com/companies/dieschweizerischepost"
            class="btn btn-primary btn-icon"
          >
            <post-icon aria-hidden="true" name="xing"></post-icon>
            <span class="visually-hidden">Xing</span>
          </a>
        </li>
        <li>
          <a href="mailto:noreply@post.ch" class="btn btn-primary btn-icon">
            <post-icon aria-hidden="true" name="letter"></post-icon>
            <span class="visually-hidden">E-Mail</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- app links -->
    <div slot="app">
      <h3 id="app">Download app</h3>
      <ul aria-labelledby="app">
        <li>
          <a
            class="app-store-badge"
            href="https://play.google.com/store/apps/details?id=com.nth.swisspost&hl=de_CH&pli=1"
          >
            <img
              src="https://next.design-system.post.ch/assets/images/google-play-badge.svg"
              alt="Google Play Store badge"
            />
            <span class="visually-hidden">Download the App on Google Play</span>
          </a>
        </li>
        <li>
          <a class="app-store-badge" href="https://apps.apple.com/ch/app/die-post/id378676700">
            <img
              src="https://next.design-system.post.ch/assets/images/apple-store-badge.svg"
              alt="Apple App Store badge"
            />
            <span class="visually-hidden">Download the App on the Apple Store</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- sector links -->
    <div slot="businesssectors">
      <h3 id="businesssectors">Die schweizerische Post AG</h3>
      <ul aria-labelledby="businesssectors">
        <li>
          <a href="https://www.postauto.ch">PostAuto</a>
        </li>
        <li>
          <a href="https://www.postfinance.ch">PostFinance</a>
        </li>
      </ul>
    </div>

    <!-- meta links -->
    <div slot="meta">
      <ul aria-label="Meta">
        <li>
          <a href="https://www.post.ch/en/pages/footer/accessibility-at-swiss-post"
            >Accessibility</a
          >
        </li>
        <li>
          <a href="https://www.post.ch/en/pages/footer/general-terms-and-conditions-gtc"
            >General Terms and Conditions</a
          >
        </li>
        <li>
          <a href="https://www.post.ch/en/pages/footer/data-protection-and-disclaimer"
            >Data protection and disclaimer</a
          >
        </li>
        <li>
          <a href="https://www.post.ch/en/pages/footer/publication-details">Publication details</a>
        </li>
        <li>
          <button class="btn btn-link" style="min-height: 0; border: 0 none; font-weight: inherit;">
            Cookie Settings
          </button>
        </li>
      </ul>
    </div>

    <span slot="copyright">© Copyright 2024 by Swiss Post Ltd.</span>
    <span slot="copyright">All rights reserved.</span>
  </post-footer>`;
}

export const Default: Story = {};
