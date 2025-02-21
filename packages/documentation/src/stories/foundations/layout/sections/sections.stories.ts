import type { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: '49b036fc-5c54-46da-b6d1-081f0c731b05',
  title: 'Foundations/Layout/Sections',
  parameters: {
    layout: 'fullscreen',
    badges: [],
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/sybxin85kCZNXQjQFOTc2a/PPNL-Cargo-layout-examples?node-id=609-51503&m=dev',
    },
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <section class="section palette-brand">
      <div class="container py-64">
        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium facere maiores unde
          magni sequi a? Id ipsam neque hic consequuntur, iusto nemo, nisi in cupiditate numquam
          necessitatibus, dicta voluptate ipsum?
        </p>
      </div>
    </section>
  `,
};

export const Bleed: Story = {
  render: () => html`
    <section class="section palette-brand">
      <div class="container">
        <img class="section-bleed" src="https://picsum.photos/id/20/1920/640" alt="" />
        <img class="section-bleed-start" src="https://picsum.photos/id/20/1920/640" alt="" />
        <img class="section-bleed-end" src="https://picsum.photos/id/20/1920/640" alt="" />

        <img
          class="section-bleed section-md-bleed-start section-lg-bleed-end section-xl-bleed-none"
          src="https://picsum.photos/id/20/1920/640"
          alt=""
        />
        <img
          class="section-bleed section-md-bleed-start section-lg-bleed-end section-sm-bleed-none"
          src="https://picsum.photos/id/20/1920/640"
          alt=""
        />

        <div class="row">
          <div class="col">
            <img class="section-bleed" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-100"></div>
          <div class="col">
            <img class="section-bleed-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <img class="section-bleed-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-100"></div>
          <div class="col">
            <img class="section-bleed-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p>Text next to a <code>.section-bleed-start</code> image.</p>
          </div>
          <div class="w-100"></div>
          <div class="col">
            <p>Text next to a <code>.section-bleed-end</code> image.</p>
          </div>
          <div class="col">
            <img class="section-bleed-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-100"></div>
          <div class="col-3">
            <img class="section-bleed-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p>
              Text between <code>.section-bleed-start</code> and
              <code>.section-bleed-end</code> images.
            </p>
          </div>
          <div class="col-3">
            <img class="section-bleed-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-100"></div>
          <div class="col">
            <img class="section-bleed-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p>Works also with more columns.</p>
          </div>
          <div class="col">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque eius sit eligendi
              nulla.
            </p>
          </div>
          <div class="col">
            <img class="section-bleed-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-100"></div>
          <div class="col-8">
            <img class="section-bleed-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p>Works also with custom with columns.</p>
          </div>
          <div class="w-100"></div>
          <div class="col">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div class="col-8">
            <img class="section-bleed-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-100"></div>
          <div class="col">
            <p class="section-bleed-start">
              The bleeing classes do not need to be applied on an image tag, you can let bleed out,
              whatever block element you want.
            </p>
          </div>
          <div class="col-4">
            <img src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-100"></div>
          <div class="col-4">
            <img src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p class="section-bleed-end">
              The bleeing classes do not need to be applied on an image tag, you can let bleed out,
              whatever block element you want.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
};
