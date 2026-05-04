import { PostBackToTop, PostBreadcrumbItem, PostBreadcrumbs, PostFooter, PostHeader, PostIcon, PostLanguageMenu, PostLanguageMenuItem, PostLogo, PostMainnavigation, PostMegadropdown, PostMegadropdownTrigger, PostMenuItem } from '@swisspost/design-system-components-react/server';
export default function Layout({ children }: { readonly children: React.ReactNode }) {
  const routes = [
    { label: 'Home', href: '/ssr' },
    { label: 'Header: active-navigation-item', href: '/ssr/header-active-navigation-item' },
    { label: 'Header: portal', href: '/ssr/header-portal' },
    { label: 'Header: jobs', href: '/ssr/header-jobs' },
    { label: 'Header: microsite', href: '/ssr/header-microsite' },
    { label: 'Header: one-pager', href: '/ssr/header-one-pager' },
    { label: 'Header: one-pager-h-1', href: '/ssr/header-one-pager-h-1' },
    { label: 'Header: logged-in', href: '/ssr/header-logged-in' },
    { label: 'Header: logged-out', href: '/ssr/header-logged-out' }
  ];
  return (
    <>
      <div className="header-story-wrapper">
        <div className="virtual-body">
      <PostHeader text-menu="Menu" data-version="10.0.0-next.67" data-color-scheme="light" style={{ ['--post-header-scroll-parent-height']: '1549px' }}>
        <PostLogo slot="post-logo" url="/" data-version="10.0.0-next.67" data-hydrated="">Homepage</PostLogo>
    <ul slot="audience">
      <li>
        <a href="#" aria-current="location">Private customers</a>
      </li>
      <li>
        <a href="#">Business customers</a>
      </li>
    </ul>
      <ul slot="global-nav-primary">
        <li>
          <a href="">
            <span>Search</span>
            <PostIcon aria-hidden="true" name="search" data-version="10.0.0-next.67" data-hydrated="" />
          </a>
        </li>
      </ul>
    <ul slot="global-nav-secondary">
      <li>
    <a href="">
      Career
      <PostIcon name="rocket" aria-hidden="true" data-version="10.0.0-next.67" data-hydrated="" />
    </a>
  </li>
      <li>
        <a href="">
          Create Account
          <PostIcon name="adduser" aria-hidden="true" data-version="10.0.0-next.67" data-hydrated="" />
        </a>
      </li>
    </ul>
        <PostLanguageMenu textChangeLanguage="Change the language" textCurrentLanguage="The currently selected language is #name." slot="language-menu" variant="menu" data-version="10.0.0-next.67">
          <PostLanguageMenuItem code="de" name="German" data-version="10.0.0-next.67"><PostMenuItem ><button lang="de">de<span className="visually-hidden">German</span></button></PostMenuItem></PostLanguageMenuItem>
          <PostLanguageMenuItem code="fr" name="French" data-version="10.0.0-next.67"><PostMenuItem ><button lang="fr">fr<span className="visually-hidden">French</span></button></PostMenuItem></PostLanguageMenuItem>
          <PostLanguageMenuItem code="it" name="Italian" data-version="10.0.0-next.67"><PostMenuItem ><button lang="it">it<span className="visually-hidden">Italian</span></button></PostMenuItem></PostLanguageMenuItem>
          <PostLanguageMenuItem active={true} code="en" name="English" data-version="10.0.0-next.67"><PostMenuItem ><button aria-current="true" lang="en">en<span className="visually-hidden">English</span></button></PostMenuItem></PostLanguageMenuItem>
        </PostLanguageMenu>
          <a href="" slot="post-login">
            <span>Login</span>
            <PostIcon name="login" data-version="10.0.0-next.67" data-hydrated="" />
          </a>
    <PostMainnavigation slot="main-nav" textMain="Main" version="10.0.0-next.67" className="" data-hydrated="">
      <ul>
        <li>
          <a href="/letters">Letters</a>
        </li>
        <li>
          <a href="/packages" aria-current="page">Packages</a>
        </li>
      </ul>
    </PostMainnavigation>
      </PostHeader>
     <div className="container">
    <p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p>
  </div></div>
      </div>
      <nav className="palette palette-alternate" style={{ padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {routes.map(r => (
            <a key={r.href} href={r.href} style={{ fontWeight: 'bold' }}>{r.label}</a>
          ))}
        </div>
      </nav>
      <main style={{ paddingBlock: '3rem' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <PostBreadcrumbs homeUrl="/" textHome="Home" textBreadcrumbs="Breadcrumbs" textMoreItems="More items" data-version="10.0.0-next.67" data-hydrated="">
      <PostBreadcrumbItem url="/section1" data-version="10.0.0-next.67" data-hydrated="">Section 1</PostBreadcrumbItem>
      <PostBreadcrumbItem url="/section2" data-version="10.0.0-next.67" data-hydrated="">Section 2</PostBreadcrumbItem>
      <PostBreadcrumbItem url="/section3" data-version="10.0.0-next.67" data-hydrated="">Section 3</PostBreadcrumbItem>
    </PostBreadcrumbs>
          {children}
        </div>
      </main>
      <PostFooter textFooter="Footer" data-version="10.0.0-next.67" data-color-scheme="light" data-hydrated="">
        <span id="grid-1-title" slot="grid-1-title">Title 1</span>
        <ul slot="grid-1" aria-labelledby="grid-1-title">
              <li>
                <a href="#">Text link 1</a>
              </li>
              <li>
                <a href="#">Text link 2</a>
              </li>
              <li>
                <a href="#">Text link 3</a>
              </li>
              <li>
                <a href="#">Text link 4</a>
              </li>
              <li>
                <a href="#">Text link 5</a>
              </li>
              <li>
                <a href="#">Text link 6</a>
              </li>
        </ul>
        <span id="grid-2-title" slot="grid-2-title">Title 2</span>
        <ul slot="grid-2" aria-labelledby="grid-2-title">
              <li>
                <a href="#">Text link 1</a>
              </li>
              <li>
                <a href="#">Text link 2</a>
              </li>
              <li>
                <a href="#">Text link 3</a>
              </li>
              <li>
                <a href="#">Text link 4</a>
              </li>
              <li>
                <a href="#">Text link 5</a>
              </li>
              <li>
                <a href="#">Text link 6</a>
              </li>
              <li>
                <a href="#">Text link 7</a>
              </li>
              <li>
                <a href="#">Text link 8</a>
              </li>
        </ul>
        <span id="grid-3-title" slot="grid-3-title">Title 3</span>
        <ul slot="grid-3" aria-labelledby="grid-3-title">
              <li>
                <a href="#">Text link 1</a>
              </li>
              <li>
                <a href="#">Text link 2</a>
              </li>
              <li>
                <a href="#">Text link 3</a>
              </li>
              <li>
                <a href="#">Text link 4</a>
              </li>
              <li>
                <a href="#">Text link 5</a>
              </li>
              <li>
                <a href="#">Text link 6</a>
              </li>
              <li>
                <a href="#">Text link 7</a>
              </li>
              <li>
                <a href="#">Text link 8</a>
              </li>
        </ul>
        <span id="grid-4-title" slot="grid-4-title">Title 4</span>
        <ul slot="grid-4" aria-labelledby="grid-4-title">
              <li>
                <a href="#">Text link 1</a>
              </li>
              <li>
                <a href="#">Text link 2</a>
              </li>
              <li>
                <a href="#">Text link 3</a>
              </li>
              <li>
                <a href="#">Text link 4</a>
              </li>
              <li>
                <a href="#">Text link 5</a>
              </li>
        </ul>
    <div slot="socialmedia">
      <h3 id="socialmedia">Follow us</h3>
      <ul aria-labelledby="socialmedia">
        <li>
          <a href="https://www.facebook.com/swisspost" className="btn btn-primary btn-icon">
            <PostIcon aria-hidden="true" name="facebook" data-version="10.0.0-next.67" data-hydrated="" />
            <span className="visually-hidden">Facebook</span>
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/swisspost/" className="btn btn-primary btn-icon">
            <PostIcon aria-hidden="true" name="instagram" data-version="10.0.0-next.67" data-hydrated="" />
            <span className="visually-hidden">Instagram</span>
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/swisspost" className="btn btn-primary btn-icon">
            <PostIcon aria-hidden="true" name="youtube" data-version="10.0.0-next.67" data-hydrated="" />
            <span className="visually-hidden">Youtube</span>
          </a>
        </li>
        <li>
          <a href="https://www.snapchat.com/add/swisspostjobs" className="btn btn-primary btn-icon">
            <PostIcon aria-hidden="true" name="snapchat" data-version="10.0.0-next.67" data-hydrated="" />
            <span className="visually-hidden">Snapchat</span>
          </a>
        </li>
        <li>
          <a href="https://twitter.com/PostSchweiz" className="btn btn-primary btn-icon">
            <PostIcon aria-hidden="true" name="twitterx" data-version="10.0.0-next.67" data-hydrated="" />
            <span className="visually-hidden">Twitter X</span>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/swiss-post" className="btn btn-primary btn-icon">
            <PostIcon aria-hidden="true" name="linkedin" data-version="10.0.0-next.67" data-hydrated="" />
            <span className="visually-hidden">Linkedin</span>
          </a>
        </li>
        <li>
          <a href="https://www.xing.com/companies/dieschweizerischepost" className="btn btn-primary btn-icon">
            <PostIcon aria-hidden="true" name="xing" data-version="10.0.0-next.67" data-hydrated="" />
            <span className="visually-hidden">Xing</span>
          </a>
        </li>
        <li>
          <a href="mailto:noreply@post.ch" className="btn btn-primary btn-icon">
            <PostIcon aria-hidden="true" name="letter" data-version="10.0.0-next.67" data-hydrated="" />
            <span className="visually-hidden">E-Mail</span>
          </a>
        </li>
      </ul>
    </div>
    <div slot="app">
      <h3 id="app">Download app</h3>
      <ul aria-labelledby="app">
        <li>
          <a className="app-store-badge" href="https://play.google.com/store/apps/details?id=com.nth.swisspost&amp;hl=de_CH&amp;pli=1">
            <img src="https://next.design-system.post.ch/assets/images/google-play-badge.svg" alt="Google Play Store badge" />
            <span className="visually-hidden">Download the App on Google Play</span>
          </a>
        </li>
        <li>
          <a className="app-store-badge" href="https://apps.apple.com/ch/app/die-post/id378676700">
            <img src="https://next.design-system.post.ch/assets/images/apple-store-badge.svg" alt="Apple App Store badge" />
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
          <a href="https://www.post.ch/en/pages/footer/accessibility-at-swiss-post">Accessibility</a>
        </li>
        <li>
          <a href="https://www.post.ch/en/pages/footer/general-terms-and-conditions-gtc">General Terms and Conditions</a>
        </li>
        <li>
          <a href="https://www.post.ch/en/pages/footer/data-protection-and-disclaimer">Data protection and disclaimer</a>
        </li>
        <li>
          <a href="https://www.post.ch/en/pages/footer/publication-details">Publication details</a>
        </li>
        <li>
          <button className="btn btn-link" style={{ minHeight: '0', border: '0 none', fontWeight: 'inherit' }}>
            Cookie Settings
          </button>
        </li>
      </ul>
    </div>
    <span slot="copyright">© Copyright 2024 by Swiss Post Ltd.</span>
    <span slot="copyright">All rights reserved.</span>
  </PostFooter>
      <div>
      <PostHeader text-menu="Menu" data-version="10.0.0-next.67" data-color-scheme="light" style={{ ['--post-header-scroll-parent-height']: '4210px' }}>
        <PostLogo slot="post-logo" url="/" data-version="10.0.0-next.67" data-hydrated="">Homepage</PostLogo>
        <ul slot="audience">
          <li>
            <a href="#" aria-current="location">Private customers</a>
          </li>
          <li>
            <a href="#">Business customers</a>
          </li>
        </ul>
        <PostLanguageMenu textChangeLanguage="Change the language" textCurrentLanguage="The currently selected language is #name." slot="language-menu" variant="menu" data-version="10.0.0-next.67">
          <PostLanguageMenuItem active={false} code="de" name="Deutsch" data-version="10.0.0-next.67"><PostMenuItem ><button lang="de">de<span className="visually-hidden">Deutsch</span></button></PostMenuItem></PostLanguageMenuItem>
          <PostLanguageMenuItem active={false} code="fr" name="French" data-version="10.0.0-next.67"><PostMenuItem ><button lang="fr">fr<span className="visually-hidden">French</span></button></PostMenuItem></PostLanguageMenuItem>
          <PostLanguageMenuItem active={false} code="it" name="Italiano" data-version="10.0.0-next.67"><PostMenuItem ><button lang="it">it<span className="visually-hidden">Italiano</span></button></PostMenuItem></PostLanguageMenuItem>
          <PostLanguageMenuItem active={true} code="en" name="English" data-version="10.0.0-next.67"><PostMenuItem ><button aria-current="true" lang="en">en<span className="visually-hidden">English</span></button></PostMenuItem></PostLanguageMenuItem>
        </PostLanguageMenu>
        <p slot="title">Application title</p>
        <ul slot="local-nav">
          <li>
            <a href="#">
              <span>Search</span>
              <PostIcon aria-hidden="true" name="search" data-version="10.0.0-next.67" data-hydrated="" />
            </a>
          </li>
          <li>
            <a href="#">
              <span>Login</span>
              <PostIcon aria-hidden="true" name="login" data-version="10.0.0-next.67" data-hydrated="" />
            </a>
          </li>
        </ul>
        <PostMainnavigation slot="main-nav" textMain="Main" version="10.0.0-next.67" className="">
          <ul>
            <li>
              <a href="/letters">Letters</a>
            </li>
            <li>
              <a href="/packages">Packages</a>
            </li>
            <li>
              <PostMegadropdownTrigger for="briefe" data-version="10.0.0-next.67" data-hydrated="">Briefe</PostMegadropdownTrigger>
              <PostMegadropdown id="briefe" textClose="Schliessen" textBack="Back">
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col">
                    <p className="post-megadropdown-list-title" id="send-letters">Briefe senden</p>
                    <ul className="post-megadropdown-list" aria-labelledby="send-letters">
                      <li>
                        <a href="/sch">Briefe Schweiz</a>
                      </li>
                      <li>
                        <a href="/kl">Kleinwaren Ausland</a>
                      </li>
                      <li>
                        <a href="">Waren Ausland</a>
                      </li>
                      <li>
                        <a href="">Express und Kurier</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <a className="post-megadropdown-list-title" id="step-by-step-letters" href="/schritt-für-schritt">Schritt für Schritt</a>
                    <ul className="post-megadropdown-list" aria-labelledby="step-by-step-letters">
                      <li>
                        <a href="/sch">Pakete Schweiz</a>
                      </li>
                      <li>
                        <a href="/kl">Kleinwaren Ausland</a>
                      </li>
                      <li>
                        <a href="">Waren Ausland</a>
                      </li>
                      <li>
                        <a href="">Express und Kurier</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </PostMegadropdown>
            </li>
            <li>
              <PostMegadropdownTrigger for="pakete" data-version="10.0.0-next.67" data-hydrated="">Pakete</PostMegadropdownTrigger>
              <PostMegadropdown id="pakete" textClose="Schliessen" textBack="Back">
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col">
                    <p className="post-megadropdown-list-title" id="send-packages">Pakete senden</p>
                    <ul className="post-megadropdown-list" aria-labelledby="send-packages">
                      <li>
                        <a href="/sch">Pakete Schweiz</a>
                      </li>
                      <li>
                        <a href="/kl">Kleinwaren Ausland</a>
                      </li>
                      <li>
                        <a href="">Waren Ausland</a>
                      </li>
                      <li>
                        <a href="">Express und Kurier</a>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <a className="post-megadropdown-list-title" id="step-by-step-packages" href="/schritt-für-schritt">Schritt für Schritt</a>
                    <ul className="post-megadropdown-list" aria-labelledby="step-by-step-packages">
                      <li>
                        <a href="/sch">Pakete Schweiz</a>
                      </li>
                      <li>
                        <a href="/kl">Kleinwaren Ausland</a>
                      </li>
                      <li>
                        <a href="">Waren Ausland</a>
                      </li>
                      <li>
                        <a href="">Express und Kurier</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </PostMegadropdown>
            </li>
          </ul>
        </PostMainnavigation>
      </PostHeader>
      <div className="container">
    <p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p><p aria-hidden="true" className="fake-content"></p>
  </div>
      <PostBackToTop textBackToTop="Back to top" /></div>
    </>
  );
}