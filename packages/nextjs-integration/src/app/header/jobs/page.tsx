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

export default function Home() {
  return (
    <PostHeader text-menu="Menu">
      <PostLogo slot="post-logo" url="/">
        Homepage
      </PostLogo>

      <ul slot="audience">
        <li>
          <a href="#">Private customers</a>
        </li>
        <li>
          <a href="#">Business customers</a>
        </li>
      </ul>

      <a href="" slot="global-nav-secondary" aria-current="location">
        Jobs
        <PostIcon name="jobs" aria-hidden="true"></PostIcon>
      </a>

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

      <PostMainnavigation slot="main-nav" text-main="Main">
        <ul>
          <li>
            <a href="/letters">Letters</a>
          </li>
          <li>
            <a href="/packages">Packages</a>
          </li>

          <li>
            <PostMegadropdownTrigger for="letters">Letters</PostMegadropdownTrigger>
            <PostMegadropdown id="letters" text-close="Close" text-back="Back">
              <a className="post-megadropdown-overview" href="/letters">
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
          <li>
            <PostMegadropdownTrigger for="packages">Packages</PostMegadropdownTrigger>
            <PostMegadropdown id="packages" text-close="Close" text-back="Back">
              <a className="post-megadropdown-overview" href="/packages">
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

      <ul slot="local-nav">
        <li>
          <a href="">
            Jobs Search
            <PostIcon name="search" aria-hidden="true"></PostIcon>
          </a>
        </li>
        <li>
          <a href="">
            Jobs Login
            <PostIcon name="login" aria-hidden="true"></PostIcon>
          </a>
        </li>
      </ul>
    </PostHeader>
  );
}
