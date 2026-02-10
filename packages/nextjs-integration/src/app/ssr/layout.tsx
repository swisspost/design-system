import {
  PostHeader,
  PostIcon,
  PostLanguageMenuItem,
  PostLanguageMenu,
  PostLogo,
  PostMainnavigation,
  PostMegadropdown,
  PostMegadropdownTrigger,
} from '@swisspost/design-system-components-react/server';

export default function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <>
      {/* Throws Hydration Errors */}

      {/* --- Microsite ---- 


    ---- ONE PAGER ---- */}

      {/* Throws Hydration Errors */}
      <PostHeader textMenu="Menu">
        {/* Logo */}
        <PostLogo slot="post-logo" url="/">
          Homepage
        </PostLogo>

        {/* Language switch */}
        <PostLanguageMenu
          text-change-language="Change the language"
          text-current-language="The currently selected language is #name."
          variant="list"
          slot="language-menu"
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

        <p slot="title">[Microsite Title]</p>

        <ul slot="local-nav">
          <li>
            <a href="#">
              <span>Search</span>
              <PostIcon aria-hidden="true" name="search"></PostIcon>
            </a>
          </li>
          <li className="local-login">
            <a href="">
              <span>Login</span>
              <PostIcon name="login"></PostIcon>
            </a>
          </li>
        </ul>

        {/* Main navigation */}
        <PostMainnavigation slot="main-nav" text-main="Main">
          <ul>
            {/* Link only level 1 */}
            <li>
              <a href="/letters">Letters</a>
            </li>
            <li>
              <a href="/packages">Packages</a>
            </li>

            {/* Level 1 with megadropdown - Letters */}
            <li>
              <PostMegadropdownTrigger for="letters">Letters</PostMegadropdownTrigger>
              <PostMegadropdown id="letters" text-close="Close" text-back="Back">
                <a className="megadropdown-overview-link" href="/letters">
                  Overview Letters
                </a>
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col">
                    <p className="post-megadropdown-list-title" id="send-letters">
                      Send letters
                    </p>
                    <ul className="post-megadropdown-list" aria-labelledby="send-letters">
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
                  <div className="col">
                    <a
                      className="post-megadropdown-list-title"
                      id="step-by-step-letters"
                      href="/step-by-step"
                    >
                      Step by step
                    </a>
                    <ul className="post-megadropdown-list" aria-labelledby="step-by-step-letters">
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
              </PostMegadropdown>
            </li>

            {/* Level 1 with megadropdown - Packages */}
            <li>
              <PostMegadropdownTrigger for="packages">Packages</PostMegadropdownTrigger>
              <PostMegadropdown id="packages" text-close="Close" text-back="Back">
                <a className="megadropdown-overview-link" href="/packages">
                  Overview Packages
                </a>
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col">
                    <p className="post-megadropdown-list-title" id="send-packages">
                      Send packages
                    </p>
                    <ul className="post-megadropdown-list" aria-labelledby="send-packages">
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
                  <div className="col">
                    <a
                      className="post-megadropdown-list-title"
                      id="step-by-step-packages"
                      href="/step-by-step"
                    >
                      Step by step
                    </a>
                    <ul className="post-megadropdown-list" aria-labelledby="step-by-step-packages">
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
              </PostMegadropdown>
            </li>
          </ul>
        </PostMainnavigation>
      </PostHeader>

      <main style={{ paddingBlock: '3rem' }}>
        <div className="container">{children}</div>
      </main>
    </>
  );
}
