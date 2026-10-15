import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { setUnread } from '../../post-klp-login-widget/lib/unread-store';
import { PostKlpLoginWidgetMessages } from '../post-klp-login-widget-messages';

async function render(attributes = '') {
  return newSpecPage({
    components: [PostKlpLoginWidgetMessages],
    html: `<post-klp-login-widget-messages url="/messages" text="Messages" ${attributes}></post-klp-login-widget-messages>`,
  });
}

function query(page: SpecPage, selector: string) {
  return page.root.querySelector(selector);
}

describe('post-klp-login-widget-messages', () => {
  // The store outlives a spec page, so one test's count would otherwise leak into the next.
  afterEach(() => setUnread(0));

  it('renders an entry the menu can style and focus', async () => {
    const page = await render();

    expect(query(page, 'post-menu-item a').getAttribute('href')).toBe('/messages');
    expect(query(page, 'post-menu-item span').textContent).toBe('Messages');
  });

  it('shows no count while nothing is unread', async () => {
    const page = await render();

    expect(query(page, '.badge')).toBeNull();
  });

  it('counts what the widget put in the store', async () => {
    const page = await render('text-unread="{count} unread messages"');

    setUnread(3);
    await page.waitForChanges();

    expect(query(page, '.badge [aria-hidden="true"]').textContent).toBe('3');
    expect(query(page, '.badge .visually-hidden').textContent).toBe('3 unread messages');
  });

  it('caps the count, past which the exact number stops being worth the space', async () => {
    const page = await render();

    setUnread(250);
    await page.waitForChanges();

    expect(query(page, '.badge [aria-hidden="true"]').textContent).toBe('99+');
  });

  /** The widget may well connect after the entry, so the count cannot be pushed only once. */
  it('picks up a count the store already held when it connected', async () => {
    setUnread(7);
    const page = await render();

    expect(query(page, '.badge [aria-hidden="true"]').textContent).toBe('7');
  });
});
