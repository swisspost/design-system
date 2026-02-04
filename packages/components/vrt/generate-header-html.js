import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Base HTML structure (shared by ALL variants)
const BASE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="design-system-settings" data-post-icon-base="/assets/icons" />
    <title>Post Header - {{VARIANT_NAME}}</title>
    <link rel="stylesheet" href="/build/post-components.css" />
    <link rel="stylesheet" href="/assets/css/post-tokens-default.css" />
    <link rel="stylesheet" href="/assets/css/index.css" />
    <script type="module" src="/build/post-components.esm.js"></script>
    <style>
      /* Fake content for scroll testing */
      .fake-content {
        position: relative;
        min-height: calc(1.6rem * 8);
        background: repeating-linear-gradient(
          rgb(230, 230, 230),
          rgb(230, 230, 230) 1rem,
          transparent 1rem,
          transparent 1.6rem
        );
        &::after {
          content: '';
          background: white;
          width: 33%;
          height: 1.7rem;
          display: block;
          position: absolute;
          bottom: 0;
          right: 0;
        }
      }
    </style>
  </head>
  <body>
    <post-header text-menu="Menu">
      {{HEADER_CONTENT}}
    </post-header>
    <main>
      <div class="fake-content"></div>
      <div class="fake-content"></div>
      <div class="fake-content"></div>
      <div class="fake-content"></div>
      <div class="fake-content"></div>
    </main>
  </body>
</html>`;

// Reusable components (used by multiple variants)
const COMPONENTS = {
  logo: `<!-- Logo -->
  <post-logo slot="post-logo" url="/">Homepage</post-logo>`,

  audience: `<!-- Audience -->
  <ul slot="audience">
    <li>
      <a href="#"{{AUDIENCE_CURRENT}}>Private customers</a>
    </li>
    <li>
      <a href="#">Business customers</a>
    </li>
  </ul>`,

  globalNavPrimary: `<!-- Global primary navigation (Search) -->
  <ul slot="global-nav-primary">
    <li>
      <a href="">
        <span>Search</span>
        <post-icon aria-hidden="true" name="search"></post-icon>
      </a>
    </li>
  </ul>`,

  globalNavSecondary: `<!-- Global secondary navigation -->
  <ul slot="global-nav-secondary">
    <li>
      <a href="{{GLOBAL_NAV_SECONDARY_CURRENT}}">
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

  globalNavSecondaryJobsOnly: `<!-- Global secondary navigation (Jobs link only) -->
  <a href="" slot="global-nav-secondary" aria-current="location">
    Jobs
    <post-icon name="jobs" aria-hidden="true"></post-icon>
  </a>`,

  languageMenu: `<!-- Language menu -->
  <post-language-menu
    text-change-language="Change the language"
    text-current-language="The currently selected language is English."
    variant="list"
    name="language-menu-example"
    slot="language-menu"
  >
    <post-language-menu-item code="de" name="German">de</post-language-menu-item>
    <post-language-menu-item code="fr" name="French">fr</post-language-menu-item>
    <post-language-menu-item code="it" name="Italian">it</post-language-menu-item>
    <post-language-menu-item active="true" code="en" name="English">en</post-language-menu-item>
  </post-language-menu>`,

  globalLogin: `<!-- Global header login link -->
  <a href="" slot="post-login">
    <span>Login</span>
    <post-icon name="login"></post-icon>
  </a>`,

  globalUserMenu: `<!-- Global user menu -->
  <div slot="post-login">
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
  </div>`,

  title: `<!-- Application title -->
  <p slot="title">{{TITLE_TEXT}}</p>`,

  mainNavigation: `<!-- Main navigation -->
  <post-mainnavigation slot="main-nav" text-main="Main">
    <ul>
      <!-- Link only level 1 -->
      <li>
        <a href="/letters">Letters</a>
      </li>
      <li>
        <a href="/packages">Packages</a>
      </li>
      <!-- Level 1 with megadropdown -->
      <li>
        <post-megadropdown-trigger for="letters">Letters</post-megadropdown-trigger>
        <post-megadropdown id="letters" text-close="Close" text-back="Back">
          <a class="post-megadropdown-overview" href="/letters">Overview Letters</a>
          <div class="row row-cols-1 row-cols-sm-2">
            <div class="col">
              <p class="post-megadropdown-list-title" id="send-letters">Send letters</p>
              <ul class="post-megadropdown-list" aria-labelledby="send-letters">
                <li>
                  <a href="/sch">Letters Switzerland</a>
                </li>
                <li>
                  <a href="/kl">Small items abroad</a>
                </li>
                <li>
                  <a href="">Goods abroad</a>
                </li>
                <li>
                  <a href="">Express and courier</a>
                </li>
              </ul>
            </div>
            <div class="col">
              <a class="post-megadropdown-list-title" id="step-by-step-letters" href="/step-by-step">Step by step</a>
              <ul class="post-megadropdown-list" aria-labelledby="step-by-step-letters">
                <li>
                  <a href="/sch">Packages Switzerland</a>
                </li>
                <li>
                  <a href="/kl">Small items abroad</a>
                </li>
                <li>
                  <a href="">Goods abroad</a>
                </li>
                <li>
                  <a href="">Express and courier</a>
                </li>
              </ul>
            </div>
          </div>
        </post-megadropdown>
      </li>
      <li>
        <post-megadropdown-trigger for="packages">Packages</post-megadropdown-trigger>
        <post-megadropdown id="packages" text-close="Close" text-back="Back">
          <a class="post-megadropdown-overview" href="/packages">Overview Packages</a>
          <div class="row row-cols-1 row-cols-sm-2">
            <div class="col">
              <p class="post-megadropdown-list-title" id="send-packages">Send packages</p>
              <ul class="post-megadropdown-list" aria-labelledby="send-packages">
                <li>
                  <a href="/sch">Packages Switzerland</a>
                </li>
                <li>
                  <a href="/kl">Small items abroad</a>
                </li>
                <li>
                  <a href="">Goods abroad</a>
                </li>
                <li>
                  <a href="">Express and courier</a>
                </li>
              </ul>
            </div>
            <div class="col">
              <a class="post-megadropdown-list-title" id="step-by-step-packages" href="/step-by-step">Step by step</a>
              <ul class="post-megadropdown-list" aria-labelledby="step-by-step-packages">
                <li>
                  <a href="/sch">Packages Switzerland</a>
                </li>
                <li>
                  <a href="/kl">Small items abroad</a>
                </li>
                <li>
                  <a href="">Goods abroad</a>
                </li>
                <li>
                  <a href="">Express and courier</a>
                </li>
              </ul>
            </div>
          </div>
        </post-megadropdown>
      </li>
    </ul>
  </post-mainnavigation>`,

  localNavJobs: `<!-- Local navigation (Jobs) -->
  <ul slot="local-nav">
    <li>
      <a href="">
        Jobs Search
        <post-icon name="search" aria-hidden="true"></post-icon>
      </a>
    </li>
    {{LOCAL_NAV_LOGIN_OR_USER}}
  </ul>`,

  localNavMicrosite: `<!-- Local navigation (Microsite) -->
  <ul slot="local-nav">
    <li>
      <a href="#">
        <span>Search</span>
        <post-icon aria-hidden="true" name="search"></post-icon>
      </a>
    </li>
  </ul>`,

  localLogin: `<li class="local-login">
      <a href="">
        <span>{{LOGIN_TEXT}}</span>
        <post-icon name="login"></post-icon>
      </a>
    </li>`,

  localUserMenu: `<li class="local-login">
      <post-menu-trigger for="user-menu-local">
        <button class="btn btn-link" type="button">
          <post-avatar
            firstname="John"
            lastname="Doe"
            description="Current user is John Doe."
          ></post-avatar>
          <span class="visually-hidden">Access user links.</span>
        </button>
      </post-menu-trigger>
      <post-menu id="user-menu-local" label="User links">
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


// Variant configurations
const VARIANTS = {
  'onepager': {
    components: ['logo', 'languageMenu', 'title'],
    replacements: {
      '{{TITLE_TEXT}}': '[One Pager Title]',
    },
  },

  'microsite-loggedout': {
    components: ['logo', 'languageMenu', 'title', 'localNavMicrosite', 'globalLogin', 'mainNavigation'],
    replacements: {
      '{{TITLE_TEXT}}': '[Microsite Title]',
    },
  },

  'microsite-loggedin': {
    components: ['logo', 'languageMenu', 'title', 'localNavMicrosite', 'globalUserMenu', 'mainNavigation'],
    replacements: {
      '{{TITLE_TEXT}}': '[Microsite Title]',
    },
  },

  'jobs-loggedout': {
    components: ['logo', 'audience', 'globalNavSecondaryJobsOnly', 'languageMenu', 'mainNavigation', 'localNavJobs'],
    replacements: {
      '{{AUDIENCE_CURRENT}}': '',
      '{{LOCAL_NAV_LOGIN_OR_USER}}': COMPONENTS.localLogin,
      '{{LOGIN_TEXT}}': 'Jobs Login',
    },
  },

  'jobs-loggedin': {
    components: [
      'logo', 
      'audience', 
      'globalNavSecondaryJobsOnly', 
      'languageMenu', 
      'globalUserMenu',
      'mainNavigation', 
      'localNavJobs'
    ],
    replacements: {
      '{{AUDIENCE_CURRENT}}': '',
      '{{LOCAL_NAV_LOGIN_OR_USER}}': '',
    },
  },

  'portal-loggedout': {
    components: ['logo', 'audience', 'globalNavSecondary', 'languageMenu', 'globalLogin', 'mainNavigation'],
    replacements: {
      '{{AUDIENCE_CURRENT}}': ' aria-current="location"',
      '{{GLOBAL_NAV_SECONDARY_CURRENT}}': '',
    },
  },

  'portal-loggedin': {
    components: ['logo', 'audience', 'globalNavPrimary', 'globalNavSecondary', 'languageMenu', 'globalUserMenu', 'mainNavigation'],
    replacements: {
      '{{AUDIENCE_CURRENT}}': ' aria-current="location"',
      '{{GLOBAL_NAV_SECONDARY_CURRENT}}': '',
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
    html = html.replaceAll(placeholder, value);
  });

  // Clean up any remaining placeholders
  // Use a linear-time scanner instead of a regex to avoid super-linear
  // backtracking risks when processing untrusted or very large input
  let cleaned = '';
  let pos = 0;
  while (pos < html.length) {
    const start = html.indexOf('{{', pos);
    if (start === -1) {
      cleaned += html.slice(pos);
      break;
    }
    cleaned += html.slice(pos, start);
    const end = html.indexOf('}}', start + 2);
    if (end === -1) {
      // No closing braces found — append the rest and stop.
      cleaned += html.slice(start);
      break;
    }
    // Skip past the closing '}}'
    pos = end + 2;
  }
  html = cleaned;

  return html;
}

// Main function
function generateAllVariants() {
  const outputDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../www/vrt'
  );
  
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Generating header HTML files...\n');

  Object.entries(VARIANTS).forEach(([variantName, config]) => {
    const html = generateVariantHTML(variantName, config);
    fs.writeFileSync(
      path.join(outputDir, `post-header-${variantName}.html`),
      html,
      'utf8'
    );
    console.log(`✅ Generated: post-header-${variantName}.html`);
  });

  console.log('\n✨ Done! All header HTML files generated.');
  console.log(`📁 Output directory: ${outputDir}\n`);
}

// Run the generator
generateAllVariants();
