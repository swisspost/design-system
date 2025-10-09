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
        <PostLogo slot="post-logo" url="/">
          Homepage
        </PostLogo>

        <ul className="list-inline" slot="meta-navigation">
          <li>
            <a href="#test">Jobs</a>
          </li>
          <li>
            <a href="#test">Über uns</a>
          </li>
        </ul>

        <PostTogglebutton slot="post-togglebutton">
          <span>Menu</span>
          <PostIcon aria-hidden="true" name="burger" data-showwhen="untoggled"></PostIcon>
          <PostIcon aria-hidden="true" name="closex" data-showwhen="toggled"></PostIcon>
        </PostTogglebutton>

        <PostLanguageSwitch
          caption="Change the language"
          description="The currently selected language is English."
          variant="menu"
          slot="post-language-switch"
        >
          <PostLanguageOption active={false} code="de" name="Deutsch">
            de
          </PostLanguageOption>
          <PostLanguageOption active={false} code="fr" name="French">
            fr
          </PostLanguageOption>
          <PostLanguageOption active={false} code="it" name="Italiano">
            it
          </PostLanguageOption>
          <PostLanguageOption active={true} code="en" name="English">
            en
          </PostLanguageOption>
        </PostLanguageSwitch>

        <h1 slot="title">Application title</h1>

        <ul className="list-inline">
          <li>
            <a href="#test">
              <span>Search</span>
              <PostIcon aria-hidden="true" name="search"></PostIcon>
            </a>
          </li>
          <li>
            <a href="#test">
              <span>Login</span>
              <PostIcon aria-hidden="true" name="login"></PostIcon>
            </a>
          </li>
        </ul>

        {/* Throws Hydration Errors */}
        <PostMainnavigation>
          {/* Throws Hydration Errors */}
          <PostList title-hidden="">
            <h2>Main Navigation</h2>
            <PostListItem slot="post-list-item">
              <a href="/briefe">Briefe</a>
            </PostListItem>
            <PostListItem slot="post-list-item">
              <a href="/pakete">Pakete</a>
            </PostListItem>

            <PostListItem slot="post-list-item">
              <PostMegadropdownTrigger for="briefe">Briefe</PostMegadropdownTrigger>
              {/* Throws Hydration Errors */}
              <PostMegadropdown id="briefe">
                <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
                  <PostIcon name="arrowright"></PostIcon>
                  Back
                </button>
                <PostClosebutton slot="close-button">Schliessen</PostClosebutton>
                <h2 slot="megadropdown-title">Briefe title</h2>
                <PostList>
                  <h3>Briefe senden</h3>
                  <PostListItem slot="post-list-item">
                    <a href="/sch">Briefe Schweiz</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/kl">Kleinwaren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="#test">Waren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="#test">Express und Kurier</a>
                  </PostListItem>
                </PostList>
                <PostList>
                  <h3>
                    <a href="/schritt-für-schritt">Schritt für Schritt</a>
                  </h3>
                  <PostListItem slot="post-list-item">
                    <a href="/sch">Pakete Schweiz</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/kl">Kleinwaren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="#test">Waren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="#test">Express und Kurier</a>
                  </PostListItem>
                </PostList>
              </PostMegadropdown>
            </PostListItem>
            <PostListItem slot="post-list-item">
              <PostMegadropdownTrigger for="pakete">Pakete</PostMegadropdownTrigger>
              <PostMegadropdown id="pakete">
                <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
                  <PostIcon name="arrowright"></PostIcon>
                  Back
                </button>
                <PostClosebutton slot="close-button">Schliessen</PostClosebutton>
                <h2 slot="megadropdown-title">Pakete title</h2>
                <PostList>
                  <h3>Pakete senden</h3>
                  <PostListItem slot="post-list-item">
                    <a href="/sch">Pakete Schweiz</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/kl">Kleinwaren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="#test">Waren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="#test">Express und Kurier</a>
                  </PostListItem>
                </PostList>
                <PostList>
                  <h3>
                    <a href="/schritt-für-schritt">Schritt für Schritt</a>
                  </h3>
                  <PostListItem slot="post-list-item">
                    <a href="/sch">Pakete Schweiz</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/kl">Kleinwaren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="#test">Waren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="#test">Express und Kurier</a>
                  </PostListItem>
                </PostList>
              </PostMegadropdown>
            </PostListItem>
          </PostList>
        </PostMainnavigation>
      </PostHeader>

      <main style={{ paddingBlock: '3rem' }}>
        <div className="container">
          <PostBreadcrumbs home-url="/" home-text="Home">
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
          <h3>Title 1</h3>

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
          <h3>Title 2</h3>

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
          <h3>Title 3</h3>

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
          <h3>Title 4</h3>

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
          <h3>Follow us</h3>
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
              <span className="visually-hidden">Titter X</span>
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
          <h3>Download app</h3>
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
          <h3>Die schweizerische Post AG</h3>
          <PostListItem>
            <a href="https://www.postauto.ch">PostAuto</a>
          </PostListItem>
          <PostListItem>
            <a href="https://www.postfinance.ch">PostFinance</a>
          </PostListItem>
        </PostList>

        <PostList slot="meta" title-hidden="">
          <h3>Meta</h3>
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
