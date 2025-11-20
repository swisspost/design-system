import Image from 'next/image';
import {
  PostBackToTop,
  PostBreadcrumbs,
  PostBreadcrumbItem,
  PostClosebutton,
  PostFooter,
  PostHeader,
  PostIcon,
  PostLanguageOption,
  PostLanguageSwitch,
  PostList,
  PostListItem,
  PostLogo,
  PostMainnavigation,
  PostMegadropdown,
  PostMegadropdownTrigger,
  PostTogglebutton,
} from '@swisspost/design-system-components-react/server';

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      {/* Throws Hydration Errors */}
      <PostHeader>
        {/* Logo */}
        <PostLogo slot="post-logo" url="/">
          Homepage
        </PostLogo>

        {/* Target Group */}
        <ul slot="target-group" className="target-group">
          <li>
            <a href="#" aria-current="location">
              Private customers
            </a>
          </li>
          <li>
            <a href="#">Business customers</a>
          </li>
        </ul>

        {/* Global controls (Search) */}
        <ul className="list-inline" slot="global-controls">
          <li>
            <a href="">
              <span>Search</span>
              <PostIcon aria-hidden="true" name="search" />
            </a>
          </li>
        </ul>

        {/* Meta navigation */}
        <ul className="list-inline" slot="meta-navigation">
          <li>
            <a href="">
              Jobs
              <PostIcon name="jobs" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a href="">
              Create Account
              <PostIcon name="adduser" aria-hidden="true" />
            </a>
          </li>
        </ul>

        {/* Language switch */}
        <PostLanguageSwitch
          caption="Change the language"
          description="The currently selected language is English."
          variant="list"
          slot="post-language-switch"
        >
          <PostLanguageOption code="de" name="German">
            de
          </PostLanguageOption>
          <PostLanguageOption code="fr" name="French">
            fr
          </PostLanguageOption>
          <PostLanguageOption code="it" name="Italian">
            it
          </PostLanguageOption>
          <PostLanguageOption active={true} code="en" name="English">
            en
          </PostLanguageOption>
        </PostLanguageSwitch>

        {/* Global header login/user menu */}
        <a href="" slot="global-login">
          <span>Login</span>
          <PostIcon name="login" />
        </a>

        {/* Menu button for mobile */}
        <PostTogglebutton slot="post-togglebutton">
          <span>Menu</span>
          <PostIcon aria-hidden="true" name="burger" data-showwhen="untoggled" />
          <PostIcon aria-hidden="true" name="closex" data-showwhen="toggled" />
        </PostTogglebutton>

        {/* Main navigation */}
        <PostMainnavigation slot="post-mainnavigation">
          <PostList title-hidden="">
            <p>Main Navigation</p>

            {/* Link only level 1 */}
            <PostListItem slot="post-list-item">
              <a href="/letters">Letters</a>
            </PostListItem>
            <PostListItem slot="post-list-item">
              <a href="/packages">Packages</a>
            </PostListItem>

            {/* Level 1 with megadropdown - Letters */}
            <PostListItem slot="post-list-item">
              <PostMegadropdownTrigger for="letters">Letters</PostMegadropdownTrigger>
              <PostMegadropdown id="letters">
                <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
                  <PostIcon name="arrowleft" />
                  Back
                </button>
                <PostClosebutton slot="close-button">Close</PostClosebutton>
                <a slot="megadropdown-overview-link" href="/letters">
                  Overview Letters
                </a>
                <PostList>
                  <p>Send letters</p>
                  <PostListItem slot="post-list-item">
                    <a href="/sch">Letters Switzerland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/kl">Small items abroad</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="">Goods abroad</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="">Express and courier</a>
                  </PostListItem>
                </PostList>
                <PostList>
                  <p>
                    <a href="/step-by-step">Step by step</a>
                  </p>
                  <PostListItem slot="post-list-item">
                    <a href="/sch">Packages Switzerland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/kl">Small items abroad</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="">Goods abroad</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="">Express and courier</a>
                  </PostListItem>
                </PostList>
              </PostMegadropdown>
            </PostListItem>

            {/* Level 1 with megadropdown - Packages */}
            <PostListItem slot="post-list-item">
              <PostMegadropdownTrigger for="packages">Packages</PostMegadropdownTrigger>
              <PostMegadropdown id="packages">
                <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
                  <PostIcon name="arrowleft" />
                  Back
                </button>
                <PostClosebutton slot="close-button">Close</PostClosebutton>
                <a slot="megadropdown-overview-link" href="/packages">
                  Overview Packages
                </a>
                <PostList>
                  <p>Send packages</p>
                  <PostListItem slot="post-list-item">
                    <a href="/sch">Packages Switzerland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/kl">Small items abroad</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="">Goods abroad</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="">Express and courier</a>
                  </PostListItem>
                </PostList>
                <PostList>
                  <p>
                    <a href="/step-by-step">Step by step</a>
                  </p>
                  <PostListItem slot="post-list-item">
                    <a href="/sch">Packages Switzerland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/kl">Small items abroad</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="">Goods abroad</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="">Express and courier</a>
                  </PostListItem>
                </PostList>
              </PostMegadropdown>
            </PostListItem>
          </PostList>
        </PostMainnavigation>
      </PostHeader>

      <main style={{ paddingBlock: '3rem' }}>
        <div className="container">
          <PostBreadcrumbs
            home-url="/"
            home-text="Home"
            label="Breadcrumbs"
            menu-label="More breadcrumb items"
          >
            <PostBreadcrumbItem url="/section1">Section 1</PostBreadcrumbItem>
            <PostBreadcrumbItem url="/section2">Section 2</PostBreadcrumbItem>
            <PostBreadcrumbItem url="/section3">Section 3</PostBreadcrumbItem>
          </PostBreadcrumbs>
          {children}
        </div>
      </main>

      <PostFooter label="Footer label">
        <span slot="grid-1-title">Title 1</span>
        <PostList slot="grid-1" id="grid-1">
          <p>Title 1</p>

          <PostListItem>
            <a href="#test">Text link 1</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 2</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 3</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 4</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 5</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 6</a>
          </PostListItem>
        </PostList>

        <span slot="grid-2-title">Title 2</span>
        <PostList slot="grid-2">
          <p>Title 2</p>

          <PostListItem>
            <a href="#test">Text link 1</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 2</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 3</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 4</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 5</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 6</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 7</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 8</a>
          </PostListItem>
        </PostList>

        <span slot="grid-3-title">Title 3</span>
        <PostList slot="grid-3">
          <p>Title 3</p>

          <PostListItem>
            <a href="#test">Text link 1</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 2</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 3</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 4</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 5</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 6</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 7</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 8</a>
          </PostListItem>
        </PostList>

        <span slot="grid-4-title">Title 4</span>
        <PostList slot="grid-4">
          <p>Title 4</p>

          <PostListItem>
            <a href="#test">Text link 1</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 2</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 3</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 4</a>
          </PostListItem>

          <PostListItem>
            <a href="#test">Text link 5</a>
          </PostListItem>
        </PostList>

        <PostList slot="socialmedia">
          <p>Follow us</p>
          <PostListItem>
            <a href="#facebook" className="btn btn-primary btn-icon">
              <PostIcon aria-hidden="true" name="8004"></PostIcon>
              <span className="visually-hidden">Facebook</span>
            </a>
          </PostListItem>
          <PostListItem>
            <a href="#instagram" className="btn btn-primary btn-icon">
              <PostIcon aria-hidden="true" name="8007"></PostIcon>
              <span className="visually-hidden">Instagram</span>
            </a>
          </PostListItem>
          <PostListItem>
            <a href="#youtube" className="btn btn-primary btn-icon">
              <PostIcon aria-hidden="true" name="8002"></PostIcon>
              <span className="visually-hidden">Youtube</span>
            </a>
          </PostListItem>
          <PostListItem>
            <a href="#snapchat" className="btn btn-primary btn-icon">
              <PostIcon aria-hidden="true" name="8017"></PostIcon>
              <span className="visually-hidden">Snapchat</span>
            </a>
          </PostListItem>
          <PostListItem>
            <a href="#twitter-x" className="btn btn-primary btn-icon">
              <PostIcon aria-hidden="true" name="8000"></PostIcon>
              <span className="visually-hidden">Twitter X</span>
            </a>
          </PostListItem>
          <PostListItem>
            <a href="#linkedin" className="btn btn-primary btn-icon">
              <PostIcon aria-hidden="true" name="8005"></PostIcon>
              <span className="visually-hidden">Linkedin</span>
            </a>
          </PostListItem>
          <PostListItem>
            <a href="#xing" className="btn btn-primary btn-icon">
              <PostIcon aria-hidden="true" name="8001"></PostIcon>
              <span className="visually-hidden">Xing</span>
            </a>
          </PostListItem>
          <PostListItem>
            <a href="mailto:noreply@post.ch" className="btn btn-primary btn-icon">
              <PostIcon aria-hidden="true" name="letter"></PostIcon>
              <span className="visually-hidden">E-Mail</span>
            </a>
          </PostListItem>
        </PostList>

        <PostList slot="app">
          <p>Download app</p>
          <PostListItem>
            <a
              className="app-store-badge"
              href="https://play.google.com/store/apps/details?id=com.nth.swisspost&amp;hl=de_CH&amp;pli=1"
            >
              <Image
                width="135"
                height="40"
                src="https://next.design-system.post.ch/assets/images/google-play-badge.svg"
                alt="Google Play Store badge"
              />
              <span className="visually-hidden">Download the App on Google Play</span>
            </a>
          </PostListItem>
          <PostListItem>
            <a
              className="app-store-badge"
              href="https://apps.apple.com/ch/app/die-post/id378676700"
            >
              <Image
                width="120"
                height="40"
                src="https://next.design-system.post.ch/assets/images/apple-store-badge.svg"
                alt="Apple App Store badge"
              />
              <span className="visually-hidden">Download the App on the Apple Store</span>
            </a>
          </PostListItem>
        </PostList>

        <PostList slot="businesssectors">
          <p>Die schweizerische Post AG</p>
          <PostListItem>
            <a href="https://www.postauto.ch">PostAuto</a>
          </PostListItem>
          <PostListItem>
            <a href="https://www.postfinance.ch">PostFinance</a>
          </PostListItem>
        </PostList>

        <PostList slot="meta" title-hidden="">
          <p>Meta</p>
          <PostListItem>
            <a href="https://www.post.ch/en/pages/footer/accessibility-at-swiss-post">
              Accessibility
            </a>
          </PostListItem>
          <PostListItem>
            <a href="https://www.post.ch/en/pages/footer/general-terms-and-conditions-gtc">
              General Terms and Conditions
            </a>
          </PostListItem>
          <PostListItem>
            <a href="https://www.post.ch/en/pages/footer/data-protection-and-disclaimer">
              Data protection and disclaimer
            </a>
          </PostListItem>
          <PostListItem>
            <a href="https://www.post.ch/en/pages/footer/publication-details">
              Publication details
            </a>
          </PostListItem>
          <PostListItem>
            <button
              className="btn btn-link"
              style={{ minHeight: 0, border: '0 none', fontWeight: 'inherit' }}
            >
              Cookie Settings
            </button>
          </PostListItem>
        </PostList>

        <span slot="copyright">© Copyright 2024 by Swiss Post Ltd.</span>
        <span slot="copyright">All rights reserved.</span>
      </PostFooter>

      <PostBackToTop label="Back to top button" />
    </>
  );
}
