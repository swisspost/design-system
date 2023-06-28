import { Meta, Args, Story } from '@storybook/react';
import docsPage from './radio-button-card.docs.mdx';
import { BADGE } from '@geometricpanda/storybook-addon-badges';

export default {
  title: 'Components/Radio Button Card',
} as Meta;

const Template = (args: Args) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
    <div className="radio-button-card">
      <input
        id="radio-button-card-1"
        className="form-check-input"
        type="checkbox"
        name="radio-button-card"
        value="1"
        aria-describedby="radio-button-card-description"
      />
      <label htmlFor="radio-button-card-1" className="form-check-label">
        Radio Button Text
      </label>
      <post-icon name="1001" aria-hidden="true"></post-icon>
      <p
        id="radio-button-card-description-1"
        className="radio-button-card--description font-size-12"
      >
        Descriptionp
      </p>
    </div>
    <div className="radio-button-card">
      <input
        id="radio-button-card-1"
        className="form-check-input"
        type="checkbox"
        name="radio-button-card"
        value="1"
        aria-describedby="radio-button-card-description"
      />
      <label htmlFor="radio-button-card-1" className="form-check-label">
        Radio Button Text
      </label>
      <post-icon name="1001" aria-hidden="true"></post-icon>
      <p
        id="radio-button-card-description-1"
        className="radio-button-card--description font-size-12"
      >
        Descriptionp
      </p>
    </div>
    <div className="radio-button-card">
      <input
        id="radio-button-card-1"
        className="form-check-input"
        type="checkbox"
        name="radio-button-card"
        value="1"
        aria-describedby="radio-button-card-description"
      />
      <label htmlFor="radio-button-card-1" className="form-check-label">
        Radio Button Text
      </label>
      <post-icon name="1001" aria-hidden="true"></post-icon>
      <p
        id="radio-button-card-description-1"
        className="radio-button-card--description font-size-12"
      >
        Descriptionp
      </p>
    </div>
    <div className="radio-button-card">
      <input
        id="radio-button-card-1"
        className="form-check-input"
        type="checkbox"
        name="radio-button-card"
        value="1"
        aria-describedby="radio-button-card-description"
      />
      <label htmlFor="radio-button-card-1" className="form-check-label">
        Radio Button Text
      </label>
      <post-icon name="1001" aria-hidden="true"></post-icon>
      <p
        id="radio-button-card-description-1"
        className="radio-button-card--description font-size-12"
      >
        Descriptionp
      </p>
    </div>
  </div>
);

export const Default: Story = Template.bind({});
