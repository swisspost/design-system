import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { spreadArgs } from '../../../utils';
import { bombArgs } from '../../utilities/bombArgs';
import alertMeta from './standard-html/alert.stories';
import { getAlertClasses } from './standard-html/getAlertClasses';

export default {
  ...alertMeta,
  title: 'Snapshots',
};

type Story = StoryObj;

export const Alert: Story = {
  render: () => html`
    <div class="d-flex gap-3 flex-wrap">
      ${['bg-white', 'bg-dark'].map(
        bg => html`
          <div class=${bg + ' d-flex flex-column gap-3 flex-wrap p-3'}>
            ${bombArgs({
              type: alertMeta?.argTypes?.type?.options,
              icon: ['no-icon', undefined, '1001'],
              action: [true, false],
            })
              .map(args => ({ ...args, show: true } as Args))
              .map(
                args => html`
                  <div class=${getAlertClasses(args)} role="alert">
                    ${args.dismissible || args.fixed
                      ? html`
                          <button class="btn-close">
                            <span class="visually-hidden">Close</span>
                          </button>
                        `
                      : null}
                    ${args.icon && args.icon !== 'no-icon'
                      ? html`
                          <post-icon
                            aria-hidden="true"
                            class="alert-icon"
                            name=${args.icon}
                          ></post-icon>
                        `
                      : null}
                    ${args.action
                      ? html`
                          <div class="alert-content">
                            <h4 class="alert-heading">Alert</h4>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
                              temporibus blanditiis expedita inventore atque. Numquam velit aut
                              eveniet cumque non?
                            </p>
                          </div>
                        `
                      : html`
                          <h4 class="alert-heading">Alert</h4>
                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
                            temporibus blanditiis expedita inventore atque. Numquam velit aut
                            eveniet cumque non?
                          </p>
                        `}
                    ${args.action
                      ? html`
                          <div class="alert-buttons">
                            <button class="btn btn-primary btn-animated">
                              <span>Akcepti</span>
                            </button>
                            <button class="btn btn-secondary btn-animated">
                              <span>Aborti</span>
                            </button>
                          </div>
                        `
                      : null}
                  </div>
                `,
              )}
          </div>
        `,
      )}
    </div>
  `,
};

export const PostAlert: Story = {
  render: () => {
    const textContent =
      '<h4 slot="heading">post-alert</h4>' +
      '<p>' +
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis' +
      'temporibus blanditiis expedita inventore atque. Numquam velit aut' +
      'eveniet cumque non?' +
      '</p>';

    const actionButton =
      '<button class="btn btn-primary btn-animated" slot="actions" >' +
      '<span>Akcepti</span>' +
      '</button>' +
      '<button class="btn btn-default btn-animated" slot="actions" >' +
      '<span>Aborti</span>' +
      '</button>';

    return html`
      <div class="d-flex gap-3 flex-wrap">
        ${['bg-white', 'bg-dark'].map(
          bg => html`
            <div class="${bg + ' d-flex flex-column gap-3 flex-wrap p-3'}">
              ${bombArgs({
                type: ['primary', 'success', 'danger', 'warning', 'info', 'gray'],
                icon: ['none', undefined, '1001'],
                dismissible: [true, false],
                innerHTML: [textContent + actionButton, textContent],
              }).map(
                args => html`
                  <post-alert
                    ${spreadArgs(args)}
                    dismiss-label=${args.dismissible ? 'Dismiss' : undefined}
                  ></post-alert>
                `,
              )}
            </div>
          `,
        )}
      </div>
    `;
  },
};
