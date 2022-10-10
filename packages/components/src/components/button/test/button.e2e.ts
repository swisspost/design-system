import { newE2EPage } from '@stencil/core/testing';

describe('post-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<post-button></post-button>');

    const element = await page.find('post-button');
    expect(element).toHaveClass('hydrated');
  });
});
