import { Component, h, Prop } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { Required } from '../required';

@Component({ tag: 'post-test-required' })
class PostTestRequired {
  /** A required prop, as consumers set it on real components. */
  @Prop({ reflect: true })
  @Required()
  label!: string;

  render() {
    return <span>{this.label}</span>;
  }
}

describe('decorated props in spec pages', () => {
  // Stencil reuses the proxied component class across spec pages, see `test-setup.ts`.
  it.each(['first', 'second', 'third'])(
    'reaches the %s page rendering the component',
    async label => {
      const page = await newSpecPage({
        components: [PostTestRequired],
        html: `<post-test-required label="${label}"></post-test-required>`,
      });

      expect(page.root.textContent).toBe(label);
    },
  );
});
