import { MetaComponent } from '@root/types';
import { Args, StoryObj } from '@storybook/web-components-vite';
import { html, nothing } from 'lit';

const meta: MetaComponent = {
  id: 'd97528b3-a9ef-4201-bf28-9caf6e8997dc',
  title: 'Components/Footer/Self-Managed',
  component: 'post-footer',
  tags: ['package:WebComponents', 'status:New'],
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations---Components-Next-Level?node-id=558-7013',
    },
    controls: {
      exclude: ['App Links', 'Meta Links', 'Copyright'],
    },
  },
  render,
  args: {
    textFooter: 'Footer',
    prefooter: true,
    linkColumns: 4,
    socialmedia: true,
    app: true,
    businesssectors: true,
    meta: true,
    copyright: true,
  },
  argTypes: {
    prefooter: {
      name: 'Pre-footer',
      description: 'Whether the footer contains a pre-footer or not.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    linkColumns: {
      name: 'Link Columns',
      description: 'The number of link columns the footer contains.',
      control: {
        type: 'select',
      },
      options: [0, 1, 2, 3, 4],
      table: {
        category: 'General',
      },
    },
    socialmedia: {
      name: 'Socials Media Links',
      description: 'Whether the footer contains social media and app links or not.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    app: {
      name: 'App Links',
      description: 'Whether the footer contains app links or not.',
      if: {
        arg: 'socialmedia',
      },
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    businesssectors: {
      name: 'Business Sectors',
      description: 'Whether the footer contains business sectors links or not.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    meta: {
      name: 'Meta Links',
      description: 'Whether the footer contains meta links or not.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
    copyright: {
      name: 'Copyright',
      description: 'Whether the footer contains copyright text or not.',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function render(args: Args) {
  return html`<post-footer text-footer=${args.textFooter}>
    ${args.prefooter
      ? html`
          <div slot="prefooter">
            <h3 id="prefooter">Service name</h3>
            <ul aria-labelledby="prefooter">
              <li>
                <a href="#" class="btn btn-link">Pre-Footer Link 1</a>
              </li>
              <li>
                <a href="#" class="btn btn-link">Pre-Footer Link 2</a>
              </li>
              <li>
                <a href="#" class="btn btn-link">Pre-Footer Link 3</a>
              </li>
            </ul>
          </div>
        `
      : nothing}
    ${Array.from({ length: args.linkColumns || 0 }).map(
      (_, i) => html`
        <span id="grid-${i + 1}-title" slot="grid-${i + 1}-title">Title ${i + 1}</span>

        <ul slot="grid-${i + 1}" aria-labelledby="grid-${i + 1}-title">
          ${Array.from({ length: Math.floor(Math.random() * 5) + 4 }).map(
            (_, j) => html`
              <li>
                <a href="#">Text link ${j + 1}</a>
              </li>
            `,
          )}
        </ul>
      `,
    )}
    ${args.socialmedia
      ? html`
          <!-- social media links -->

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
                <a
                  href="https://www.snapchat.com/add/swisspostjobs"
                  class="btn btn-primary btn-icon"
                >
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
                <a
                  href="https://www.linkedin.com/company/swiss-post"
                  class="btn btn-primary btn-icon"
                >
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
        `
      : nothing}
    ${args.app
      ? html`
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
                <a
                  class="app-store-badge"
                  href="https://apps.apple.com/ch/app/die-post/id378676700"
                >
                  <img
                    src="https://next.design-system.post.ch/assets/images/apple-store-badge.svg"
                    alt="Apple App Store badge"
                  />
                  <span class="visually-hidden">Download the App on the Apple Store</span>
                </a>
              </li>
            </ul>
          </div>
        `
      : nothing}
    ${args.businesssectors
      ? html`
          <!-- sector links -->
          <div slot="businesssectors">
            <h3 id="businesssectors">Die Schweizerische Post AG</h3>
            <ul aria-labelledby="businesssectors">
              <li>
                <a href="https://www.postauto.ch">PostAuto</a>
              </li>
              <li>
                <a href="https://www.postfinance.ch">PostFinance</a>
              </li>
            </ul>
          </div>
        `
      : nothing}
    ${args.copyright
      ? html`
          <!-- copyright -->
          <span slot="copyright">© Copyright 2024 by Swiss Post Ltd. All rights reserved.</span>
        `
      : nothing}
    ${args.meta
      ? html`
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
                <a href="https://www.post.ch/en/pages/footer/publication-details"
                  >Publication details</a
                >
              </li>
              <li>
                <button
                  class="btn btn-link"
                  style="min-height: 0; border: 0 none; font-weight: inherit;"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </div>
        `
      : nothing}
  </post-footer>`;
}

export const Default: Story = {};

export const Mid: Story = {
  args: {
    prefooter: false,
    linkColumns: 0,
  },
};

export const Minimal: Story = {
  args: {
    ...Mid.args,
    socialmedia: false,
    app: false,
    businesssectors: false,
  },
};

export const MinimalPreFooter: Story = {
  args: {
    ...Minimal.args,
    prefooter: true,
  },
};
