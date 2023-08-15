import { Args, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { bombArgs } from '../../utilities/bombArgs';
import alertMeta from './alert.stories';
import { getAlertClasses } from './getAlertClasses';

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
          <div class=${bg + ' d-flex gap-3 flex-wrap p-3'}>
            ${bombArgs({
      variant: alertMeta?.argTypes?.variant?.options,
      noIcon: [true, false],
      icon: ['null', '1001'],
      dismissible: [true, false],
      action: [true, false],
    })
      .filter(args => !(args.noIcon && args.icon === 'null'))
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
  `
};
