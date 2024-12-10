interface CodePenData {
  html: string;
  js: string;
  title: string;
  editors: string;
  css_external: string;
}

export const openInCodePen = (e: Event) => {
  const target = e.target as HTMLButtonElement;
  const canvas = target.closest('.docs-story');
  const rootInner = canvas?.querySelector('#root-inner') as HTMLElement;

  if (rootInner) {
    // Clone the rootInner to avoid modifying the actual DOM
    const clonedRootInner = rootInner.cloneNode(true) as HTMLElement;

    // Remove the p.story-url element if it exists
    const storyUrl = clonedRootInner.querySelector('p.storyURL');
    if (storyUrl) {
      clonedRootInner.removeChild(storyUrl);
    }

    // Get the HTML content
    let html = clonedRootInner.innerHTML;

    // Clean up the HTML
    html = html
      .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
      .replace(/<!--\?lit\$\d+\$-->/g, '') // Remove Lit-specific comments
      .trim(); // Remove leading and trailing whitespace

    // Check if there's any element with data-hydrated attribute
    const isWebComponent = clonedRootInner.querySelector('[data-hydrated]') !== null;

    // Extract JavaScript if it's a web component
    let js = '';
    console.log(document);
    if (isWebComponent) {
      const scriptTag = canvas?.querySelector('script[data-preview-script]');
      if (scriptTag) {
        js = scriptTag.textContent || '';
      }
      console.log(scriptTag);
    }

    const data: CodePenData = {
      html: html,
      js: js,
      title: 'Storybook Example',
      editors: isWebComponent ? '111' : '110',
      css_external:
        'https://unpkg.com/@swisspost/design-system-styles@9.0.0-next.8/post-external.css',
    };

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://codepen.io/pen/define';
    form.target = '_blank';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(data);

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  } else {
    alert('The story content could not be found for CodePen.');
  }
};
