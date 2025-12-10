#!/usr/bin/env node

/**
 * Generate header HTML test files from templates
 * This eliminates duplication by using a base template with variant-specific sections
 * 
 * Usage:
 *   node generate-header-html.js
 *   npm run generate:header-html
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base HTML structure (shared by ALL variants)
const BASE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="design-system-settings" data-post-icon-base="/www/assets/icons" />
    <title>Post Header - {{VARIANT_NAME}}</title>
    <link
      href="../../node_modules/@swisspost/design-system-styles/post-default.css"
      rel="stylesheet"
    />
    <script src="../../dist/post-components/post-components.esm.js" type="module"></script>
  </head>
  <body>
    <post-header>
      {{HEADER_CONTENT}}
    </post-header>
  </body>
</html>`;

// Reusable components (used by multiple variants)
const COMPONENTS = {
  logo: `<!-- Logo -->
  <post-logo slot="post-logo" url="/">Homepage</post-logo>`,

  targetGroup: `<!-- Target Group -->
  <ul slot="target-group">
    <li>
      <a href="#"{{TARGET_GROUP_CURRENT}}>Private customers</a>
    </li>
    <li>
      <a href="#">Business customers</a>
    </li>
  </ul>`,

  globalControls: `<!-- Global controls (Search) -->
  <ul slot="global-controls">
    <li>
      <a href="">
        <span>Search</span>
        <post-icon aria-hidden="true" name="search"></post-icon>
      </a>
    </li>
  </ul>`,

  metaNavigation: `<!-- Meta navigation -->
  <ul slot="meta-navigation">
    <li>
      <a href="{{META_NAV_CURRENT}}">
        Jobs
        <post-icon name="jobs" aria-hidden="true"></post-icon>
      </a>
    </li>
    <li>
      <a href="">
        Create Account
        <post-icon name="adduser" aria-hidden="true"></post-icon>
      </a>
    </li>
  </ul>`,

  languageMenu: `<!-- Language switch -->
  <post-language-menu
    caption="Change the language"
    description="The currently selected language is English."
    variant="list"
    name="language-menu-example"
    slot="post-language-switch"
  >
    <post-language-menu-item code="de" name="German">de</post-language-menu-item>
    <post-language-menu-item code="fr" name="French">fr</post-language-menu-item>
    <post-language-menu-item code="it" name="Italian">it</post-language-menu-item>
    <post-language-menu-item active="true" code="en" name="English">en</post-language-menu-item>
  </post-language-menu>`,

  globalLogin: `<!-- Global header login link -->
  <a href="" slot="global-login">
    <span>Login</span>
    <post-icon name="login"></post-icon>
  </a>`,

  userMenu: `<!-- Global/Local user menu -->
  <post-menu-trigger for="user-menu">
    <button class="btn btn-link" type="button">
      <post-avatar
        firstname="John"
        lastname="Doe"
        description="Current user is John Doe."
      ></post-avatar>
      <span class="visually-hidden">Access user links.</span>
    </button>
  </post-menu-trigger>
  <post-menu id="user-menu" label="User links">
    <div slot="header">
      <post-avatar firstname="John" lastname="Doe" aria-hidden="true"></post-avatar>
      John Doe
    </div>
    <post-menu-item>
      <a href="">
        <post-icon aria-hidden="true" name="profile"></post-icon>
        My Profile
      </a>
    </post-menu-item>
    <post-menu-item>
      <a href="">
        <post-icon aria-hidden="true" name="letter"></post-icon>
        Messages
      </a>
    </post-menu-item>
    <post-menu-item>
      <a href="">
        <post-icon aria-hidden="true" name="gear"></post-icon>
        Setting
      </a>
    </post-menu-item>
    <post-menu-item>
      <button type="button">
        <post-icon aria-hidden="true" name="logout"></post-icon>
        Logout
      </button>
    </post-menu-item>
  </post-menu>`,

  burgerButton: `<!-- Menu button for mobile -->
  <post-togglebutton slot="post-togglebutton">
    <span>Menu</span>
    <post-icon aria-hidden="true" name="burger" data-showwhen="untoggled"></post-icon>
    <post-icon aria-hidden="true" name="closex" data-showwhen="toggled"></post-icon>
  </post-togglebutton>`,

  title: `<!-- Application title -->
  <p slot="title">{{TITLE_TEXT}}</p>`,

  mainNavigation: `<!-- Main navigation -->
  <post-mainnavigation slot="post-mainnavigation" caption="Main navigation">
    <post-list title-hidden="">
      <p>Main Navigation</p>
      <!-- Link only level 1 -->
      <post-list-item slot="post-list-item">
        <a href="/letters">Letters</a>
      </post-list-item>
      <post-list-item slot="post-list-item">
        <a href="/packages">Packages</a>
      </post-list-item>
      <!-- Level 1 with megadropdown -->
      <post-list-item slot="post-list-item">
        <post-megadropdown-trigger for="letters">Letters</post-megadropdown-trigger>
        <post-megadropdown id="letters">
          <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
            <post-icon name="arrowleft"></post-icon>
            Back
          </button>
          <post-closebutton slot="close-button">Close</post-closebutton>
          <a slot="megadropdown-overview-link" href="/letters">Overview Letters</a>
          <post-list>
            <p>Send letters</p>
            <post-list-item slot="post-list-item">
              <a href="/sch">Letters Switzerland</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="/kl">Small items abroad</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="">Goods abroad</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="">Express and courier</a>
            </post-list-item>
          </post-list>
          <post-list>
            <p><a href="/step-by-step">Step by step</a></p>
            <post-list-item slot="post-list-item">
              <a href="/sch">Packages Switzerland</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="/kl">Small items abroad</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="">Goods abroad</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="">Express and courier</a>
            </post-list-item>
          </post-list>
        </post-megadropdown>
      </post-list-item>
      <post-list-item slot="post-list-item">
        <post-megadropdown-trigger for="packages">Packages</post-megadropdown-trigger>
        <post-megadropdown id="packages">
          <button slot="back-button" class="btn btn-tertiary px-0 btn-sm">
            <post-icon name="arrowleft"></post-icon>
            Back
          </button>
          <post-closebutton slot="close-button">Close</post-closebutton>
          <a slot="megadropdown-overview-link" href="/packages">Overview Packages</a>
          <post-list>
            <p>Send packages</p>
            <post-list-item slot="post-list-item">
              <a href="/sch">Packages Switzerland</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="/kl">Small items abroad</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="">Goods abroad</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="">Express and courier</a>
            </post-list-item>
          </post-list>
          <post-list>
            <p><a href="/step-by-step">Step by step</a></p>
            <post-list-item slot="post-list-item">
              <a href="/sch">Packages Switzerland</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="/kl">Small items abroad</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="">Goods abroad</a>
            </post-list-item>
            <post-list-item slot="post-list-item">
              <a href="">Express and courier</a>
            </post-list-item>
          </post-list>
        </post-megadropdown>
      </post-list-item>
    </post-list>
  </post-mainnavigation>`,

  localNavJobs: `<!-- Navigation controls (Jobs) -->
  <ul slot="local-nav">
    <li>
      <a href="">
        Jobs Search
        <post-icon name="search" aria-hidden="true"></post-icon>
      </a>
    </li>
    {{LOCAL_NAV_LOGIN_OR_USER}}
  </ul>`,

  localNavMicrosite: `<!-- Custom controls (Microsite) -->
  <ul slot="local-nav">
    <li>
      <a href="#">
        <span>Search</span>
        <post-icon aria-hidden="true" name="search"></post-icon>
      </a>
    </li>
    {{LOCAL_NAV_LOGIN_OR_USER}}
  </ul>`,

  localLogin: `<li class="local-login">
      <a href="">
        <span>{{LOGIN_TEXT}}</span>
        <post-icon name="login"></post-icon>
      </a>
    </li>`,

  localUserMenu: `<li>
      <post-menu-trigger for="user-menu">
        <button class="btn btn-link" type="button">
          <post-avatar
            firstname="John"
            lastname="Doe"
            description="Current user is John Doe."
          ></post-avatar>
          <span class="visually-hidden">Access user links.</span>
        </button>
      </post-menu-trigger>
      <post-menu id="user-menu" label="User links">
        <div slot="header">
          <post-avatar firstname="John" lastname="Doe" aria-hidden="true"></post-avatar>
          John Doe
        </div>
        <post-menu-item>
          <a href="">
            <post-icon aria-hidden="true" name="profile"></post-icon>
            My Profile
          </a>
        </post-menu-item>
        <post-menu-item>
          <a href="">
            <post-icon aria-hidden="true" name="letter"></post-icon>
            Messages
          </a>
        </post-menu-item>
        <post-menu-item>
          <a href="">
            <post-icon aria-hidden="true" name="gear"></post-icon>
            Setting
          </a>
        </post-menu-item>
        <post-menu-item>
          <button type="button">
            <post-icon aria-hidden="true" name="logout"></post-icon>
            Logout
          </button>
        </post-menu-item>
      </post-menu>
    </li>`,
};

// Variant configurations (what components to include)
const VARIANTS = {
  'onepager': {
    components: ['logo', 'languageMenu', 'burgerButton', 'title'],
    replacements: {
      '{{TITLE_TEXT}}': '[One Pager Title]',
    },
  },

  'microsite-loggedout': {
    components: ['logo', 'languageMenu', 'burgerButton', 'title', 'localNavMicrosite', 'mainNavigation'],
    replacements: {
      '{{TITLE_TEXT}}': '[Microsite Title]',
      '{{LOCAL_NAV_LOGIN_OR_USER}}': COMPONENTS.localLogin,
      '{{LOGIN_TEXT}}': 'Login',
    },
  },

  'microsite-loggedin': {
    components: ['logo', 'languageMenu', 'burgerButton', 'title', 'localNavMicrosite', 'mainNavigation'],
    replacements: {
      '{{TITLE_TEXT}}': '[Microsite Title]',
      '{{LOCAL_NAV_LOGIN_OR_USER}}': COMPONENTS.localUserMenu,
    },
  },

  'jobs-loggedout': {
    components: ['logo', 'targetGroup', 'metaNavigation', 'languageMenu', 'burgerButton', 'mainNavigation', 'localNavJobs'],
    replacements: {
      '{{TARGET_GROUP_CURRENT}}': '',
      '{{META_NAV_CURRENT}}': ' aria-current="location"',
      '{{LOCAL_NAV_LOGIN_OR_USER}}': COMPONENTS.localLogin,
      '{{LOGIN_TEXT}}': 'Jobs Login',
    },
  },

  'jobs-loggedin': {
    components: ['logo', 'targetGroup', 'metaNavigation', 'languageMenu', 'burgerButton', 'mainNavigation', 'localNavJobs'],
    replacements: {
      '{{TARGET_GROUP_CURRENT}}': '',
      '{{META_NAV_CURRENT}}': ' aria-current="location"',
      '{{LOCAL_NAV_LOGIN_OR_USER}}': COMPONENTS.localUserMenu,
    },
  },

  'portal-loggedout': {
    components: ['logo', 'targetGroup', 'globalControls', 'metaNavigation', 'languageMenu', 'globalLogin', 'burgerButton', 'mainNavigation'],
    replacements: {
      '{{TARGET_GROUP_CURRENT}}': ' aria-current="location"',
      '{{META_NAV_CURRENT}}': '',
    },
  },

  'portal-loggedin': {
    components: ['logo', 'targetGroup', 'globalControls', 'metaNavigation', 'languageMenu', 'userMenu', 'burgerButton', 'mainNavigation'],
    replacements: {
      '{{TARGET_GROUP_CURRENT}}': ' aria-current="location"',
      '{{META_NAV_CURRENT}}': '',
    },
  },
};

// Generate HTML for a specific variant
function generateVariantHTML(variantName, config) {
  // Build header content from components
  const headerContent = config.components
    .map(componentName => COMPONENTS[componentName])
    .join('\n  ');

  // Start with base template
  let html = BASE_TEMPLATE
    .replace('{{VARIANT_NAME}}', variantName)
    .replace('{{HEADER_CONTENT}}', headerContent);

  // Apply variant-specific replacements
  Object.entries(config.replacements || {}).forEach(([placeholder, value]) => {
    html = html.replace(new RegExp(placeholder, 'g'), value);
  });

  // Clean up any remaining placeholders (set to empty)
  html = html.replace(/\{\{[^}]+\}\}/g, '');

  return html;
}

// Main function
function generateAllVariants() {
  const outputDir = path.join(__dirname, '../www/components');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Generating header HTML files...\n');

  Object.entries(VARIANTS).forEach(([variantName, config]) => {
    const html = generateVariantHTML(variantName, config);
    const filename = `post-header-${variantName}.html`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, html, 'utf8');
    console.log(`✅ Generated: ${filename}`);
  });

  console.log('\n✨ Done! All header HTML files generated.');
  console.log(`📁 Output directory: ${outputDir}\n`);
}

// Run the generator
generateAllVariants();

export { generateVariantHTML, VARIANTS, COMPONENTS };