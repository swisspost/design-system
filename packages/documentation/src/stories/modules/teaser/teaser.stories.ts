import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MetaComponent } from '@root/types';

const meta: MetaComponent = {
  id: '68699b2c-ec1f-467d-81ae-8b3f48d7c595',
  title: 'Modules/Teaser',
  tags: ['package:HTML'],
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/JIT5AdGYqv6bDRpfBPV8XR/Foundations-%26-Components-Next-Level?node-id=3850-8203',
    },
  },
  render,
  args: {
    size: 'sm',
  },
  argTypes: {
    size: {
      name: 'Size',
      description: 'Size of the teaser cards',
      control: {
        type: 'radio',
        labels: {
          sm: 'Small (default)',
          lg: 'Large',
        },
      },
      options: ['sm', 'lg'],
      table: {
        category: 'General',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

function render(args: Args) {
  return html`
      <div class="container teaser-section">
      <div class="teaser-section-header">
        <div>
          <h2>Teaser section</h2>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempo</p>
        </div>
        <a href="#" class="btn btn-primary">Let's go <post-icon name="arrowright"></post-icon></a>
      </div>
      <div class="teaser-cards">
        <div class="teaser-card ${args.size === 'lg' ? 'teaser-card-lg' : ''}">
          <img src="https://picsum.photos/500/600" alt="My placeholder">
          <div>
            <div>
              <h3>Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <a href="#" class="btn btn-tertiary px-0">Read more <post-icon name="arrowright"></post-icon></post-icon></a>
          </div>
        </div>
        <div class="teaser-card ${args.size === 'lg' ? 'teaser-card-lg' : ''}">
          <img src="https://picsum.photos/400/600" alt="My placeholder">
          <div>
            <div>
              <h3>Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <a href="#" class="btn btn-tertiary px-0">Read more <post-icon name="arrowright"></post-icon></post-icon></a>
          </div>
        </div>
        <div class="teaser-card ${args.size === 'lg' ? 'teaser-card-lg' : ''}">
          <img src="https://picsum.photos/400/200" alt="My placeholder">
          <div>
            <div>
              <h3>Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <a href="#" class="btn btn-tertiary px-0">Read more <post-icon name="arrowright"></post-icon></post-icon></a>
          </div>
        </div>
        <div class="teaser-card ${args.size === 'lg' ? 'teaser-card-lg' : ''}">
          <img src="https://picsum.photos/500/600" alt="My placeholder">
          <div>
            <div>
              <h3>Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <a href="#" class="btn btn-tertiary px-0">Read more <post-icon name="arrowright"></post-icon></post-icon></a>
          </div>
        </div>
        <div class="teaser-card ${args.size === 'lg' ? 'teaser-card-lg' : ''}">
          <img src="https://picsum.photos/400/600" alt="My placeholder">
          <div>
            <div>
              <h3>Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <a href="#" class="btn btn-tertiary px-0">Read more <post-icon name="arrowright"></post-icon></post-icon></a>
          </div>
        </div>
        <div class="teaser-card ${args.size === 'lg' ? 'teaser-card-lg' : ''}">
          <img src="https://picsum.photos/400/200" alt="My placeholder">
          <div>
            <div>
              <h3>Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <a href="#" class="btn btn-tertiary px-0">Read more <post-icon name="arrowright"></post-icon></post-icon></a>
          </div>
        </div>
        <div class="teaser-card ${args.size === 'lg' ? 'teaser-card-lg' : ''}">
          <img src="https://picsum.photos/500/600" alt="My placeholder">
          <div>
            <div>
              <h3>Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            </div>
            <a href="#" class="btn btn-tertiary px-0">Read more <post-icon name="arrowright"></post-icon></post-icon></a>
          </div>
        </div>
        <div class="teaser-card ${args.size === 'lg' ? 'teaser-card-lg' : ''}">
          <img src="https://picsum.photos/400/600" alt="My placeholder">
          <div>
            <div>
              <h3>Title</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <a href="#" class="btn btn-tertiary px-0">Read more <post-icon name="arrowright"></post-icon></post-icon></a>
          </div>
        </div>
      </div>
    </div>`;
}

export const Default: Story = {};
