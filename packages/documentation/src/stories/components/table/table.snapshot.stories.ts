import type { Args, StoryContext, StoryObj } from '@storybook/web-components';
import meta from './table.stories';
import { html } from 'lit';
import { bombArgs } from '@/utils';

const { id, ...metaWithoutId } = meta;

export default {
  ...metaWithoutId,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Table: Story = {
  render: (_args: Args, context: StoryContext) => {
    const longCaption =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem maxime eius aut quae ducimus dignissimos pariatur suscipit distinctio, accusamus laudantium, sint quibusdam nisi optio? Ut quae obcaecati, harum ullam quos beatae, ipsam enim, placeat eligendi dolores excepturi. Quia quod eligendi ab voluptas modi id distinctio iure vel possimus deserunt, amet, dolores laboriosam quas qui aut laborum? Et numquam esse laboriosam totam quod sapiente recusandae consectetur optio, quaerat quia. Sequi excepturi quia voluptate nesciunt cum veritatis? Quas molestias nostrum temporibus saepe porro facilis tempora natus non modi fugiat, vitae facere quos placeat maiores incidunt illo itaque sequi dolore! Temporibus recusandae, veritatis eos vitae optio porro magni rem culpa enim provident sed. Libero blanditiis delectus voluptatibus, temporibus alias laudantium ad tempora iure, sunt minima maiores qui ut? Aliquam quis obcaecati id, officiis accusamus voluptas rerum magnam, est a culpa voluptatum tenetur ab, asperiores vel dolor ipsum alias tempore sint aliquid? Eum architecto laboriosam dolor inventore deleniti? Repellat perferendis ratione dolorem, amet deleniti minima repudiandae eos iure maiores, dicta sequi architecto ipsa sit ab laudantium praesentium maxime asperiores molestiae ad nulla ullam est saepe vero. Qui ratione vero dicta nisi molestiae rem consectetur, natus ipsam facilis repellendus animi ullam debitis temporibus sapiente quam.';
    return html`
      <div style="display: 'flex'; flexWrap: 'wrap'; gap: '1rem'; alignItems: 'start';">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div
              class="${bg}"
              style="padding: '1rem'; display: 'flex'; flexWrap: 'wrap'; alignItems: 'start; justify-conent:'space-between'"
            >
              ${[
                ...bombArgs({
                  content: [
                    html`
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Someone</td>
                        <td>
                          else
                          <br />
                          entirely
                        </td>
                        <td>@twitter</td>
                      </tr>
                    `,
                  ],
                  caption: [
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero mollitia magnam quo quam saepe. Aliquam tempore non deleniti culpa reprehenderit.',
                    longCaption,
                  ],
                  captionPlacement: context.argTypes.captionPlacement.options,
                  borderStyle: context.argTypes.borderStyle.options,
                  alignment: context.argTypes.alignment.options,
                }) /*
                prevents combinations with changed borderStyle and changed
                alignement also prevents their respective duplicate hiddens
             */
                  .filter(
                    (args: Args) =>
                      (args.borderStyle === 'null' || args.alignment === 'align-top') &&
                      (args.captionPlacement === 'bottom' || args.alignment === 'align-top') &&
                      (args.borderStyle === 'null' || args.captionPlacement === 'bottom'),
                  )
                  /*
                prevents more long text captions than neccessary
           */
                  .filter(
                    (args: Args) =>
                      (args.borderStyle === 'null' &&
                        args.alignment === 'align-top' &&
                        args.captionPlacement !== 'hidden') ||
                      args.caption !== longCaption,
                  ),
                ...bombArgs({
                  content: [
                    html`
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <th scope="row">4</th>
                        <td>Someone</td>
                        <td>
                          else
                          <br />
                          entirely
                        </td>
                        <td>@twitter</td>
                      </tr>
                    `,
                    html`
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>
                          <button class="btn btn-secondary btn-icon btn-md">
                            <span class="visually-hidden">Edit</span>
                            <i class="pi pi-2012"></i>
                          </button>
                          <button class="btn btn-primary btn-icon btn-md ms-8">
                            <span class="visually-hidden">Edit</span>
                            <i class="pi pi-3193"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>
                          <button class="btn btn-secondary btn-icon btn-md">
                            <span class="visually-hidden">Edit</span>
                            <i class="pi pi-2012"></i>
                          </button>
                          <button class="btn btn-primary btn-icon btn-md ms-8">
                            <span class="visually-hidden">Edit</span>
                            <i class="pi pi-3193"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>
                          <button class="btn btn-secondary btn-icon btn-md">
                            <span class="visually-hidden">Edit</span>
                            <i class="pi pi-2012"></i>
                          </button>
                          <button class="btn btn-primary btn-icon btn-md ms-8">
                            <span class="visually-hidden">Edit</span>
                            <i class="pi pi-3193"></i>
                          </button>
                        </td>
                      </tr>
                    `,
                  ],
                  borderStyle: ['null', 'table-bordered', 'table-borderless'],
                  alignment: ['align-top'],
                  variant: [
                    ['table-hover'],
                    ['table-sm'],
                    ['table-striped'],
                    ['table-mono'],
                    ['table-sm', 'table-striped'],
                  ],
                }),
              ].map((args: Args) => meta.render?.({ ...context.args, ...args }, context))}
            </div>
          `,
        )}
      </div>
    `;
  },
};
