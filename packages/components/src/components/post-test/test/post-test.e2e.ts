import { newE2EPage } from '@stencil/core/testing';

describe('post-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<post-test></post-test>');

    const element = await page.find('post-test');
    expect(element).toHaveClass('hydrated');
  });
});
