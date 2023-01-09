import { newE2EPage } from '@stencil/core/testing';

describe('post-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<post-icon></post-icon>');

    const element = await page.find('post-icon');
    expect(element).toHaveClass('hydrated');
  });
});
