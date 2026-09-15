import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { keys, texts } from '../../src/legacy/texts.js';

const languages = Object.keys(texts);

describe('the translations', () => {
  it('cover the four languages the portal is published in', () => {
    assert.deepEqual(languages.sort(), ['de', 'en', 'fr', 'it']);
  });

  it('carry the same keys in every language', () => {
    const german = Object.keys(texts.de).sort();

    for (const language of languages) {
      assert.deepEqual(Object.keys(texts[language]).sort(), german, `${language} differs`);
    }
  });

  it('leave no string empty', () => {
    for (const language of languages) {
      for (const [key, value] of Object.entries(texts[language])) {
        assert.ok(value.length > 0, `${language}.${key} is empty`);
      }
    }
  });
});

describe('the dialog strings', () => {
  // They are markup, not text: each closes the paragraph the widget opened and writes the modal
  // footer, so the confirm button only exists because the translation carries it.
  it('close the widget paragraph and bring their own confirm button', () => {
    const dialogKeys = Object.keys(texts.de).filter(key => key.endsWith('-dialog'));

    assert.equal(dialogKeys.length, 4);

    for (const language of languages) {
      for (const key of dialogKeys) {
        const value = texts[language][key];
        assert.ok(value.includes('</p></div></div>'), `${language}.${key} does not close`);
        assert.ok(
          value.includes('id="klp-widget-authenticated-dochangecompany"'),
          `${language}.${key} has no confirm button`,
        );
      }
    }
  });
});

describe('the keyboard affordances', () => {
  it('give every key an access key and a tab index slot', () => {
    for (const [key, value] of Object.entries(keys)) {
      assert.ok('access-key' in value, `${key} has no access-key`);
      assert.ok('tab-index' in value, `${key} has no tab-index`);
    }
  });

  it('cover every key the markup asks for', () => {
    for (const key of ['sign-in', 'sign-out', 'toggle-menu', 'change-company', 'change-account']) {
      assert.ok(keys[key], `${key} is missing`);
    }
  });
});
