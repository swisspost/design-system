import { version } from '@swisspost/design-system-components/package.json';

/**
 * Search for source code elements in the DOM
 */
const searchForSourceElement = (canvas: Element | null): string | null => {
  if (!canvas || !canvas.parentElement) {
    return null;
  }

  // Check siblings
  let sibling = canvas.nextElementSibling;
  while (sibling) {
    const sourceElement = sibling.querySelector('pre');
    if (sourceElement && sourceElement.textContent && sourceElement.textContent.trim()) {
      return sourceElement.textContent;
    }
    sibling = sibling.nextElementSibling;
  }
  return null;
};

/**
 * Find the show/hide source code button
 */
const findSourceButton = (canvas: Element | null): HTMLElement | null => {
  if (!canvas) {
    return null;
  }

  // Look for source buttons within the canvas
  const viewSourceButtons = Array.from(canvas.querySelectorAll('button'));
  const sourceButton = viewSourceButtons.find(button => {
    const text = button.textContent?.toLowerCase() || '';
    return text.includes('show') || text.includes('hide') || text.includes('code');
  });

  return (sourceButton as HTMLElement) || null;
};

/**
 * Extract story code by searching for source block
 * Returns a Promise that resolves with the source code
 */
const getSourceForStory = (canvas: Element | null): Promise<string | null> => {
  return new Promise(resolve => {
    if (!canvas) {
      resolve(null);
      return;
    }

    // First try to find the source code without clicking any buttons
    const sourceCode = searchForSourceElement(canvas);
    if (sourceCode) {
      // Source code already visible, no need to open/close
      resolve(sourceCode);
      return;
    }

    let buttonWasClicked = false;
    let sourceButton: HTMLElement | null = null;
    const observer = new MutationObserver(_ => {
      const newSourceCode = searchForSourceElement(canvas);

      if (newSourceCode) {
        observer.disconnect();
        if (buttonWasClicked && sourceButton) {
          try {
            sourceButton.click();
          } catch (e) {
            console.error('Error clicking source button to close:', e);
          }
        }

        resolve(newSourceCode);
      }
    });

    // Set up mutation observer to watch for changes
    try {
      observer.observe(canvas.parentElement || canvas, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false,
      });

      // Click the button to show the source code
      // This will trigger mutations which our observer will detect
      sourceButton = findSourceButton(canvas);
      if (sourceButton) {
        try {
          sourceButton.click();
          buttonWasClicked = true;
        } catch (e) {
          console.error('Error clicking source button:', e);
          observer.disconnect();
          resolve(null);
        }
      } else {
        observer.disconnect();
        resolve(null);
      }
    } catch (error) {
      observer.disconnect();
      console.error('Error in getSourceForStory:', error);
      resolve(null);
    }
  });
};

export const openInCodePen = async (e: Event) => {
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

  try {
    // Get the source code - now awaiting the Promise
    const sourceCode = await getSourceForStory(canvas);

    if (!sourceCode) {
      console.error('No source code found');
      return;
    }

    const data = JSON.stringify({
      html: sourceCode,
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
  } catch (error) {
    console.error('Error processing source code:', error);
  }
};
