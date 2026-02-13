import Image from 'next/image';
import {
  PostBackToTop,
  PostBreadcrumbs,
  PostBreadcrumbItem,
  PostFooter,
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
      <PostHeader textMenu="Menu">
        {/* Logo */}
        <PostLogo slot="post-logo" url="/">
          Homepage
        </PostLogo>

        {/* Audience */}
        <ul slot="audience">
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
        <ul slot="global-nav-primary">
          <li>
            <a href="">
              <span>Search</span>
              <PostIcon aria-hidden="true" name="search" />
            </a>
          </li>
        </ul>

        {/* Global secondary navigation */}
        <ul slot="global-nav-secondary">
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
          text-change-language="Change the language"
          text-current-language="The currently selected language is #name."
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

        {/* Global header login/user menu */}
        <a href="" slot="post-login">
          <span>Login</span>
          <PostIcon name="login" />
        </a>
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
    </>
  );
}
