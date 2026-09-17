import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { PostKlpLoginWidget } from '../post-klp-login-widget';

const config = {
  applicationId: 'app-1',
  serviceId: 'svc-1',
  appLoginUrl: 'https://int.post.ch/login',
  currentLang: 'de',
};

async function render(attributes = '') {
  return newSpecPage({
    components: [PostKlpLoginWidget],
    html: `<post-klp-login-widget ${attributes}></post-klp-login-widget>`,
  });
}

function loginLink(page: SpecPage) {
  return page.root.shadowRoot.querySelector<HTMLAnchorElement>('a.login-link');
}

describe('post-klp-login-widget', () => {
  it('renders the anonymous login link from a config object', async () => {
    const page = await render();
    (page.root as HTMLPostKlpLoginWidgetElement).config = config;
    await page.waitForChanges();

    expect(loginLink(page).getAttribute('href')).toBe(config.appLoginUrl);
  });

  it('accepts the config as a JSON string so it can be driven from plain HTML', async () => {
    const page = await render(`config='${JSON.stringify(config)}'`);

    expect(loginLink(page).getAttribute('href')).toBe(config.appLoginUrl);
  });

  it('renders nothing when no config was provided', async () => {
    const page = await render();

    expect(loginLink(page)).toBeNull();
  });

  it('reports invalid JSON instead of throwing', async () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    const page = await render(`config='not json'`);

    expect(loginLink(page)).toBeNull();
    expect(error).toHaveBeenCalled();
    error.mockRestore();
  });

  it('renders the same markup twice, so hydration cannot mismatch', async () => {
    const first = await render(`config='${JSON.stringify(config)}'`);
    const second = await render(`config='${JSON.stringify(config)}'`);

    expect(first.root.shadowRoot.innerHTML).toBe(second.root.shadowRoot.innerHTML);
  });
});
