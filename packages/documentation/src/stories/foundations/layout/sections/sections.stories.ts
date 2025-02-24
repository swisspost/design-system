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

export const Alignment: Story = {
  render: () => html`
    <section class="section palette-brand">
      <div class="container">
        <h2>Aligning classes</h2>
        <img class="align-section-stretch" src="https://picsum.photos/id/20/1920/640" alt="" />
        <img class="align-section-start" src="https://picsum.photos/id/20/1920/640" alt="" />
        <img class="align-section-end" src="https://picsum.photos/id/20/1920/640" alt="" />

        <h2>Responsive aligning classes</h2>
        <img
          class="align-section-stretch align-section-md-start align-section-lg-end align-section-xl-none"
          src="https://picsum.photos/id/20/1920/640"
          alt=""
        />
        <img
          class="align-section-stretch align-section-sm-none align-section-md-start align-section-lg-end"
          src="https://picsum.photos/id/20/1920/640"
          alt=""
        />

        <h2>Aligning classes in grid</h2>
        <div class="row gy-16">
          <div class="col">
            <img class="align-section-stretch" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-full"></div>
          <div class="col">
            <img class="align-section-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <img class="align-section-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-full"></div>
          <div class="col">
            <img class="align-section-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p>Text next to a <code>.align-section-start</code> image.</p>
          </div>
          <div class="w-full"></div>
          <div class="col">
            <p>Text next to a <code>.align-section-end</code> image.</p>
          </div>
          <div class="col">
            <img class="align-section-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-full"></div>
          <div class="col-3">
            <img class="align-section-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p>
              Text between <code>.align-section-start</code> and
              <code>.align-section-end</code> images.
            </p>
          </div>
          <div class="col-3">
            <img class="align-section-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-full"></div>
          <div class="col">
            <img class="align-section-start" src="https://picsum.photos/id/20/1920/640" alt="" />
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
            <img class="align-section-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-full"></div>
          <div class="col-8">
            <img class="align-section-start" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p>Works also with custom with columns.</p>
          </div>
          <div class="w-full"></div>
          <div class="col">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <div class="col-8">
            <img class="align-section-end" src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-full"></div>
          <div class="col">
            <p class="align-section-start">
              The aligning classes do not need to be applied on an image tag, you can align whatever
              block element you want.
            </p>
          </div>
          <div class="col-4">
            <img src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="w-full"></div>
          <div class="col-4">
            <img src="https://picsum.photos/id/20/1920/640" alt="" />
          </div>
          <div class="col">
            <p class="align-section-end">
              The aligning classes do not need to be applied on an image tag, you can align whatever
              block element you want.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
};
