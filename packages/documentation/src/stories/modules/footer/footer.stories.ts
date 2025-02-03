import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const GRID_CELLS = [1, 2, 3, 4];
const LINKS_PER_CELL = [6, 8, 8, 5];

const meta: MetaComponent = {
  id: 'd97528b3-a9ef-4201-bf28-9caf6e8997dc',
  title: 'Modules/Footer',
  component: 'post-footer',
  tags: ['package:WebComponents'],
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=1009-25200&node-type=frame&t=Fmc9LEl8mpYnfRid-0',
    },
  },
  render,
  args: {
    label: 'Footer label',
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj;

function render(args: Args) {
  return html`<post-footer label=${args.label}>
    ${GRID_CELLS.map(
      cell => html`
        <span slot="grid-${cell}-title">Title ${cell}</span>
        <post-list slot="grid-${cell}">
          <h3>Title ${cell}</h3>
          ${Array.from(Array(LINKS_PER_CELL[cell - 1]).keys()).map(
            item => html`
              <post-list-item>
                <a href="#">Text link ${item + 1}</a>
              </post-list-item>
            `,
          )}
        </post-list>
      `,
    )}

    <!-- socialmedia links -->
    <post-list slot="socialmedia">
      <h3>Follow us</h3>
      <post-list-item>
        <a href="https://www.facebook.com/swisspost" class="btn btn-primary btn-icon">
          <post-icon aria-hidden="true" name="8004"></post-icon>
          <span class="visually-hidden">Facebook</span>
        </a>
      </post-list-item>
      <post-list-item>
        <a href="https://www.instagram.com/swisspost/" class="btn btn-primary btn-icon">
          <post-icon aria-hidden="true" name="8007"></post-icon>
          <span class="visually-hidden">Instagram</span>
        </a>
      </post-list-item>
      <post-list-item>
        <a href="http://www.youtube.com/swisspost" class="btn btn-primary btn-icon">
          <post-icon aria-hidden="true" name="8002"></post-icon>
          <span class="visually-hidden">Youtube</span>
        </a>
      </post-list-item>
      <post-list-item>
        <a href="https://www.snapchat.com/add/swisspostjobs" class="btn btn-primary btn-icon">
          <post-icon aria-hidden="true" name="8017"></post-icon>
          <span class="visually-hidden">Snapchat</span>
        </a>
      </post-list-item>
      <post-list-item>
        <a href="https://twitter.com/PostSchweiz" class="btn btn-primary btn-icon">
          <post-icon aria-hidden="true" name="8000"></post-icon>
          <span class="visually-hidden">Titter X</span>
        </a>
      </post-list-item>
      <post-list-item>
        <a href="https://www.linkedin.com/company/swiss-post" class="btn btn-primary btn-icon">
          <post-icon aria-hidden="true" name="8005"></post-icon>
          <span class="visually-hidden">Linkedin</span>
        </a>
      </post-list-item>
      <post-list-item>
        <a
          href="https://www.xing.com/companies/dieschweizerischepost"
          class="btn btn-primary btn-icon"
        >
          <post-icon aria-hidden="true" name="8001"></post-icon>
          <span class="visually-hidden">Xing</span>
        </a>
      </post-list-item>
      <post-list-item>
        <a href="mailto:noreply@post.ch" class="btn btn-primary btn-icon">
          <post-icon aria-hidden="true" name="letter"></post-icon>
          <span class="visually-hidden">E-Mail</span>
        </a>
      </post-list-item>
    </post-list>

    <!-- app links -->
    <post-list slot="app">
      <h3>Download app</h3>
      <post-list-item>
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
      </post-list-item>
      <post-list-item>
        <a class="app-store-badge" href="https://apps.apple.com/ch/app/die-post/id378676700">
          <img
            src="https://next.design-system.post.ch/assets/images/apple-store-badge.svg"
            alt="Apple App Store badge"
          />
          <span class="visually-hidden">Download the App on the Apple Store</span>
        </a>
      </post-list-item>
    </post-list>

    <!-- sector links -->
    <post-list slot="businesssectors">
      <h3>Die schweizerische Post AG</h3>
      <post-list-item>
        <a href="https://www.postauto.ch">PostAuto</a>
      </post-list-item>
      <post-list-item>
        <a href="https://www.postfinance.ch">PostFinance</a>
      </post-list-item>
    </post-list>

    <!-- meta links -->
    <post-list slot="meta" title-hidden>
      <h3>Meta</h3>
      <post-list-item>
        <a href="https://www.post.ch/en/pages/footer/accessibility-at-swiss-post">Accessibility</a>
      </post-list-item>
      <post-list-item>
        <a href="https://www.post.ch/en/pages/footer/general-terms-and-conditions-gtc"
          >General Terms and Conditions</a
        >
      </post-list-item>
      <post-list-item>
        <a href="https://www.post.ch/en/pages/footer/data-protection-and-disclaimer"
          >Data protection and disclaimer</a
        >
      </post-list-item>
      <post-list-item>
        <a href="https://www.post.ch/en/pages/footer/publication-details">Publication details</a>
      </post-list-item>
      <post-list-item>
        <button class="btn btn-link" style="min-height: 0; border: 0 none; font-weight: inherit;">
          Cookie Settings
        </button>
      </post-list-item>
    </post-list>

    <span slot="copyright">© Copyright 2024 by Swiss Post Ltd.</span>
    <span slot="copyright">All rights reserved.</span>
  </post-footer>`;
}

export const Default: Story = {};
