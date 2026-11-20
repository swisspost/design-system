/**
 * Wait for fragment navigation handlers and their next rendering opportunity.
 */
export function navigateToFragment(win: Window, id: string): Promise<void> {
  const hash = `#${id}`;
  if (win.location.hash === hash) throw new Error(`Already at fragment ${hash}.`);

  return new Promise(resolve => {
    const onHashChange = (event: HashChangeEvent) => {
      if (new URL(event.newURL).hash !== hash) return;
      win.removeEventListener('hashchange', onHashChange);
      win.requestAnimationFrame(() => resolve());
    };
    win.addEventListener('hashchange', onHashChange);
    win.location.hash = id;
  });
}
