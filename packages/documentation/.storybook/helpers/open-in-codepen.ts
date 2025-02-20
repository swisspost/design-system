import { version } from '@swisspost/design-system-components/package.json';

export const openInCodePen = (e: Event) => {
  // Get document from parent window's iframe
  const parentDocument = window.parent.document;
  const iframe = parentDocument.querySelector<HTMLIFrameElement>(
    'iframe[data-is-storybook="true"]',
  );
  const iframeDocument = iframe?.contentDocument;

  // Extract stylesheet tags from iframe head, skipping first two
  const stylesheetTags = iframeDocument
    ? Array.from(iframeDocument.head.querySelectorAll('link[rel="stylesheet"]'))
        .slice(2)
        .map(link => link.outerHTML)
        .join('\n')
    : '';

  const target = e.target as HTMLButtonElement;
  const canvas = target.closest('.docs-story');
  const rootInner = canvas?.querySelector('#root-inner') as HTMLElement;

  if (!rootInner) {
    alert('The story content could not be found for CodePen.');
    return;
  }

  // Clone and clean up HTML
  const clonedRootInner = rootInner.cloneNode(true) as HTMLElement;
  clonedRootInner.querySelector('p.storyURL')?.remove();

  const html = clonedRootInner.innerHTML
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/<!--\?lit\$\d+\$-->/g, '') // Remove Lit-specific comments
    .trim();

  const data = JSON.stringify({
    html,
    title: 'Storybook Example',
    head: stylesheetTags,
    js: `import "https://esm.sh/@swisspost/design-system-components@${version}/dist/post-components/post-components.esm.js";`,
    css_external: `https://cdn.jsdelivr.net/npm/@swisspost/design-system-styles@${version}/cargo-external.css`,
  });

  // Create and submit form
  const form = Object.assign(document.createElement('form'), {
    method: 'POST',
    action: 'https://codepen.io/pen/define',
    target: '_blank',
    innerHTML: `<input type="hidden" name="data" value='${data.replace(/'/g, '&apos;')}'>`,
  });

  document.body.appendChild(form);
  form.submit();
  form.remove();
};
