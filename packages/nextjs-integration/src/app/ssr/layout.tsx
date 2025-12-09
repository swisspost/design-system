import Image from 'next/image';
import {
  PostBackToTop,
  PostBreadcrumbs,
  PostBreadcrumbItem,
  PostClosebutton,
  PostFooter,
  PostHeader,
  PostIcon,
  PostLanguageMenuItem,
  PostLanguageMenu,
  PostList,
  PostListItem,
  PostLogo,
  PostMainnavigation,
  PostMegadropdown,
  PostMegadropdownTrigger,
} from '@swisspost/design-system-components-react/server';

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      {/* Throws Hydration Errors */}
      <PostHeader labelBurgerMenu="Menu">
        {/* Logo */}
        <PostLogo slot="post-logo" url="/">
          Homepage
        </PostLogo>

        {/* Target Group */}
        <ul slot="target-group">
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
        <ul slot="global-controls">
          <li>
            <a href="">
              <span>Search</span>
              <PostIcon aria-hidden="true" name="search" />
            </a>
          </li>
        </ul>

        {/* Meta navigation */}
        <ul slot="meta-navigation">
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
        <PostLanguageMenu
          caption="Change the language"
          description="The currently selected language is English."
          variant="list"
          slot="post-language-switch"
        >
          <PostLanguageMenuItem code="de" name="German">
            de
          </PostLanguageMenuItem>
          <PostLanguageMenuItem code="fr" name="French">
            fr
          </PostLanguageMenuItem>
          <PostLanguageMenuItem code="it" name="Italian">
            it
          </PostLanguageMenuItem>
          <PostLanguageMenuItem active={true} code="en" name="English">
            en
          </PostLanguageMenuItem>
        </PostLanguageMenu>

        {/* Global header login/user menu */}
        <a href="" slot="global-login">
          <span>Login</span>
          <PostIcon name="login" />
        </a>

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
        <span id="grid-1-title" slot="grid-1-title">
          Title 1
        </span>
        <ul slot="grid-1" aria-labelledby="grid-1-title">
          <li>
            <a href="#test">Text link 1</a>
          </li>

          <li>
            <a href="#test">Text link 2</a>
          </li>

          <li>
            <a href="#test">Text link 3</a>
          </li>

          <li>
            <a href="#test">Text link 4</a>
          </li>

          <li>
            <a href="#test">Text link 5</a>
          </li>

          <li>
            <a href="#test">Text link 6</a>
          </li>
        </ul>

        <span id="grid-2-title" slot="grid-2-title">
          Title 2
        </span>
        <ul slot="grid-2" aria-labelledby="grid-2-title">
          <li>
            <a href="#test">Text link 1</a>
          </li>

          <li>
            <a href="#test">Text link 2</a>
          </li>

          <li>
            <a href="#test">Text link 3</a>
          </li>

          <li>
            <a href="#test">Text link 4</a>
          </li>

          <li>
            <a href="#test">Text link 5</a>
          </li>

          <li>
            <a href="#test">Text link 6</a>
          </li>

          <li>
            <a href="#test">Text link 7</a>
          </li>

          <li>
            <a href="#test">Text link 8</a>
          </li>
        </ul>

        <span id="grid-3-title" slot="grid-3-title">
          Title 3
        </span>
        <ul slot="grid-3" aria-labelledby="grid-3-title">
          <li>
            <a href="#test">Text link 1</a>
          </li>

          <li>
            <a href="#test">Text link 2</a>
          </li>

          <li>
            <a href="#test">Text link 3</a>
          </li>

          <li>
            <a href="#test">Text link 4</a>
          </li>

          <li>
            <a href="#test">Text link 5</a>
          </li>

          <li>
            <a href="#test">Text link 6</a>
          </li>

          <li>
            <a href="#test">Text link 7</a>
          </li>

          <li>
            <a href="#test">Text link 8</a>
          </li>
        </ul>

        <span id="grid-4-titles" slot="grid-4-title">
          Title 4
        </span>
        <ul slot="grid-4" aria-labelledby="grid-4-title">
          <li>
            <a href="#test">Text link 1</a>
          </li>

          <li>
            <a href="#test">Text link 2</a>
          </li>

          <li>
            <a href="#test">Text link 3</a>
          </li>

          <li>
            <a href="#test">Text link 4</a>
          </li>

          <li>
            <a href="#test">Text link 5</a>
          </li>
        </ul>

        <div slot="socialmedia">
          <h3 id="socialmedia">Follow us</h3>
          <ul aria-labelledby="socialmedia">
            <li>
              <a href="#facebook" className="btn btn-primary btn-icon">
                <PostIcon aria-hidden="true" name="facebook"></PostIcon>
                <span className="visually-hidden">Facebook</span>
              </a>
            </li>
            <li>
              <a href="#instagram" className="btn btn-primary btn-icon">
                <PostIcon aria-hidden="true" name="instagram"></PostIcon>
                <span className="visually-hidden">Instagram</span>
              </a>
            </li>
            <li>
              <a href="#youtube" className="btn btn-primary btn-icon">
                <PostIcon aria-hidden="true" name="youtube"></PostIcon>
                <span className="visually-hidden">Youtube</span>
              </a>
            </li>
            <li>
              <a href="#snapchat" className="btn btn-primary btn-icon">
                <PostIcon aria-hidden="true" name="snapchat"></PostIcon>
                <span className="visually-hidden">Snapchat</span>
              </a>
            </li>
            <li>
              <a href="#twitter-x" className="btn btn-primary btn-icon">
                <PostIcon aria-hidden="true" name="twitterx"></PostIcon>
                <span className="visually-hidden">Twitter X</span>
              </a>
            </li>
            <li>
              <a href="#linkedin" className="btn btn-primary btn-icon">
                <PostIcon aria-hidden="true" name="linkedin"></PostIcon>
                <span className="visually-hidden">Linkedin</span>
              </a>
            </li>
            <li>
              <a href="#xing" className="btn btn-primary btn-icon">
                <PostIcon aria-hidden="true" name="xing"></PostIcon>
                <span className="visually-hidden">Xing</span>
              </a>
            </li>
            <li>
              <a href="mailto:noreply@post.ch" className="btn btn-primary btn-icon">
                <PostIcon aria-hidden="true" name="letter"></PostIcon>
                <span className="visually-hidden">E-Mail</span>
              </a>
            </li>
          </ul>
        </div>

        <div slot="app">
          <h3 id="app">Download app</h3>
          <ul aria-labelledby="app">
            <li>
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
            </li>
            <li>
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
            </li>
          </ul>
        </div>

        <div slot="businesssectors">
          <h3 id="businesssectors">Die schweizerische Post AG</h3>
          <ul aria-labelledby="businesssectors">
            <li>
              <a href="https://www.postauto.ch">PostAuto</a>
            </li>
            <li>
              <a href="https://www.postfinance.ch">PostFinance</a>
            </li>
          </ul>
        </div>

        <div slot="meta">
          <ul aria-label="Meta">
            <li>
              <a href="https://www.post.ch/en/pages/footer/accessibility-at-swiss-post">
                Accessibility
              </a>
            </li>
            <li>
              <a href="https://www.post.ch/en/pages/footer/general-terms-and-conditions-gtc">
                General Terms and Conditions
              </a>
            </li>
            <li>
              <a href="https://www.post.ch/en/pages/footer/data-protection-and-disclaimer">
                Data protection and disclaimer
              </a>
            </li>
            <li>
              <a href="https://www.post.ch/en/pages/footer/publication-details">
                Publication details
              </a>
            </li>
            <li>
              <button
                className="btn btn-link"
                style={{ minHeight: 0, border: '0 none', fontWeight: 'inherit' }}
              >
                Cookie Settings
              </button>
            </li>
          </ul>
        </div>

        <span slot="copyright">© Copyright 2024 by Swiss Post Ltd.</span>
        <span slot="copyright">All rights reserved.</span>
      </PostFooter>

      <PostBackToTop label="Back to top button" />
    </>
  );
}
