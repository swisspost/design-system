import { Args, StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const meta: MetaExtended = {
  id: 'cb34361c-7d3f-4c21-bb9c-874c73e82579',
  title: 'Guidelines/Header with Custom Logo Link',
  parameters: {
    badges: [],
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  args: {
    framework: 'none',
  },
  argTypes: {
    framework: {
      name: 'JS Framework',
      description: 'Select your framework',
      options: ['none', 'angular', 'react', 'nextjs'],
      control: {
        type: 'select',
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Default: Story = {
  render(args: Args) {
    switch (args.framework) {
      case 'angular':
        return html`<a routerLink="/path" class="h-full p-0 d-inline-block"
          ><post-logo>Homepage</post-logo></a
        >`;

      case 'react':
        return html`<Router><Link to="/path"  class="h-full p-0 d-inline-block" ><post-logo>Homepage</post-logo></Link><Router`;

      case 'nextjs':
        return html`<Link href="/path" class="h-full p-0 d-inline-block"><post-logo>Homepage</post-logo></Link>`;

      default:
        return html`<post-logo url="/path">Homepage</post-logo>`;
    }
  },
  decorators: [
    story => {
      return html`<div class="h-32">${story()}</div>`;
    },
  ],
};

export const Full: Story = {
  render(args: Args) {
    switch (args.framework) {
      case 'angular':
        return html`<a routerLink="/path" class="h-full p-0 d-inline-block" slot="post-logo"
          ><post-logo>Homepage</post-logo></a
        >`;

      case 'react':
        return html`<Link to="/path"  class="h-full p-0 d-inline-block"  slot="post-logo"><post-logo>Homepage</post-logo></Link>`;

      case 'nextjs':
        return html`${unsafeHTML(
          `<Link href="/path" class="h-full p-0 d-inline-block" slot="post-logo"><post-logo>Homepage</post-logo></Link>`,
        )}`;

      default:
        return html`<post-logo slot="post-logo" url="/path">Homepage</post-logo>`;
    }
  },
};

// decorators: [
//   story => {
//     return html`<post-header
//       ><!-- Logo -->
//       ${story()}
//       <!-- Meta navigation -->
//       <ul class="list-inline" slot="meta-navigation">
//         <li><a href="">Jobs</a></li>
//         <li><a href="">Über uns</a></li>
//       </ul>
//       <!-- Menu button for mobile -->
//       <post-togglebutton slot="post-togglebutton">
//         <span class="visually-hidden-sm">Menu</span>
//         <post-icon aria-hidden="true" name="burger" data-showWhen="untoggled"></post-icon>
//         <post-icon aria-hidden="true" name="closex" data-showWhen="toggled"></post-icon>
//       </post-togglebutton>

//       <!-- Language switch -->
//       <post-language-switch
//         caption="Change the language"
//         description="The currently selected language is English."
//         name="language-switch-example"
//         slot="post-language-switch"
//         variant="menu"
//       >
//         <post-language-option code="de" name="Deutsch">DE</post-language-option>
//         <post-language-option code="fr" name="French">FR</post-language-option>
//         <post-language-option code="it" name="Italiano">IT</post-language-option>
//         <post-language-option active code="en" name="English">EN</post-language-option>
//       </post-language-switch>

//       <!-- Application title (optional) -->
//       <h1 slot="title">Application title</h1>

//       <!-- Custom content (optional) -->
//       <ul class="list-inline">
//         <li>
//           <a href="#">
//             <span class="visually-hidden-sm">Search</span>
//             <post-icon aria-hidden="true" name="search"></post-icon>
//           </a>
//         </li>
//         <li>
//           <a href="#">
//             <span class="visually-hidden-sm">Login</span>
//             <post-icon aria-hidden="true" name="login"></post-icon>
//           </a>
//         </li>
//       </ul>

//       <!-- Main navigation -->
//       <post-mainnavigation caption="Hauptnavigation">
//         <button type="button" slot="back-button" class="btn btn-sm btn-tertiary">
//           <post-icon aria-hidden="true" name="arrowright"></post-icon> Back
//         </button>

//         <post-list title-hidden="">
//           <h2>Main Navigation</h2>

//           <!-- Link only level 1 -->
//           <post-list-item slot="post-list-item"><a href="/briefe">Briefe</a></post-list-item>
//           <post-list-item slot="post-list-item"><a href="/pakete">Pakete</a></post-list-item>

//           <!-- Level 1 with megadropdown -->
//           <post-list-item slot="post-list-item">
//             <post-megadropdown-trigger for="briefe">Briefe</post-megadropdown-trigger>
//             <post-megadropdown id="briefe">
//               <button slot="back-button" class="btn btn-tertiary btn-sm">
//                 <post-icon name="arrowright"></post-icon>
//                 Back
//               </button>
//               <post-closebutton slot="close-button">Schliessen</post-closebutton>
//               <h2 slot="megadropdown-title">Briefe title</h2>
//               <post-list>
//                 <h3>Briefe senden</h3>
//                 <post-list-item slot="post-list-item"
//                   ><a href="/sch">Briefe Schweiz</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="/kl">Kleinwaren Ausland</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="">Waren Ausland</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="">Express und Kurier</a></post-list-item
//                 >
//               </post-list>
//               <post-list>
//                 <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
//                 <post-list-item slot="post-list-item"
//                   ><a href="/sch">Pakete Schweiz</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="/kl">Kleinwaren Ausland</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="">Waren Ausland</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="">Express und Kurier</a></post-list-item
//                 >
//               </post-list>
//             </post-megadropdown>
//           </post-list-item>
//           <post-list-item slot="post-list-item">
//             <post-megadropdown-trigger for="pakete">Pakete</post-megadropdown-trigger>
//             <post-megadropdown id="pakete">
//               <button slot="back-button" class="btn btn-tertiary btn-sm">
//                 <post-icon name="arrowright"></post-icon>
//                 Back
//               </button>
//               <post-closebutton slot="close-button">Schliessen</post-closebutton>
//               <h2 slot="megadropdown-title">Pakete title</h2>
//               <post-list>
//                 <h3>Pakete senden</h3>
//                 <post-list-item slot="post-list-item"
//                   ><a href="/sch">Pakete Schweiz</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="/kl">Kleinwaren Ausland</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="">Waren Ausland</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="">Express und Kurier</a></post-list-item
//                 >
//               </post-list>
//               <post-list>
//                 <h3><a href="/schritt-für-schritt">Schritt für Schritt</a></h3>
//                 <post-list-item slot="post-list-item"
//                   ><a href="/sch">Pakete Schweiz</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="/kl">Kleinwaren Ausland</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="">Waren Ausland</a></post-list-item
//                 >
//                 <post-list-item slot="post-list-item"
//                   ><a href="">Express und Kurier</a></post-list-item
//                 >
//               </post-list>
//             </post-megadropdown>
//           </post-list-item>
//         </post-list>
//       </post-mainnavigation>
//     </post-header>`;
//   },
// ],
