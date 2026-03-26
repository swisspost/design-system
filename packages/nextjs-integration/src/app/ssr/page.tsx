import {
  PostAccordion,
  PostAccordionItem,
  PostAvatar,
  PostBackToTop,
  PostBanner,
  PostClosebutton,
  PostCollapsible,
  PostCollapsibleTrigger,
  PostDatePicker,
  PostFooter,
  PostHeader,
  PostIcon,
  PostLanguageMenu,
  PostLanguageMenuItem,
  PostLogo,
  PostMainnavigation,
  PostMegadropdown,
  PostMegadropdownTrigger,
  PostPopover,
  PostPopoverTrigger,
} from '@swisspost/design-system-components-react/server';

export default function Page() {
  return (
    <>
      <h4>PopoverTrigger</h4>
      {/* PopoverTrigger */}
      <PostPopoverTrigger for="popover-one">
        <button className="btn btn-secondary">Popover Trigger</button>
      </PostPopoverTrigger>

      <h4>Popover</h4>
      {/* Popover */}
      <PostPopover
        id="popover-one"
        textClose="Close"
        data-version="10.0.0-next.65"
        data-hydrated=""
      >
        <p id="testtext">
          This is a <a href="">test</a>
        </p>
      </PostPopover>

      <h4>Accordion</h4>
      {/* Accordion */}
      <PostAccordion headingLevel={3}>
        <PostAccordionItem>
          <span slot="header">Title 1</span>
          <p>
            Example content for accordion item 1. This is a sample text demonstrating how the
            accordion component works.
          </p>
        </PostAccordionItem>
        <PostAccordionItem>
          <span slot="header">Title 2</span>
          <p>
            Example content for accordion item 2. This is a sample text demonstrating how the
            accordion component works.
          </p>
        </PostAccordionItem>
        <PostAccordionItem>
          <span slot="header">Title 3</span>
          <p>
            Example content for accordion item 3. This is a sample text demonstrating how the
            accordion component works.
          </p>
        </PostAccordionItem>
      </PostAccordion>

      <h4>Avatar</h4>
      {/* Avatar */}
      <PostAvatar firstname="Firstname" description="The current user is Firstname." />

      <h4>BackToTop</h4>
      {/* BackToTop */}
      <PostBackToTop textBackToTop="Back to top" />

      <h4>Banner</h4>
      {/* Banner */}
      <PostBanner>
        <p>This is the content of the banner. It helps to draw attention to critical messages.</p>
      </PostBanner>

      <h4>Closebutton</h4>
      {/* Closebutton */}
      <PostClosebutton>Close</PostClosebutton>

      <h4>CollapsibleTrigger</h4>
      {/* CollapsibleTrigger */}
      <PostCollapsibleTrigger for="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default">
        <button className="btn btn-secondary">Toggle Collapsible</button>
      </PostCollapsibleTrigger>

      <h4>Collapsible</h4>
      {/* Collapsible */}
      <PostCollapsible
        id="6a91848c-16ec-4a23-bc45-51c797b5b2c3--default"
        dataVersion="10.0.0-next.65"
        data-hydrated=""
      >
        <p className="border rounded p-24">
          This is collapsible content that can be shown or hidden.
        </p>
      </PostCollapsible>

      <h4>DatePicker</h4>
      {/* DatePicker */}
      <PostDatePicker
        textToggleCalendar="Open calendar"
        text-next-decade="Next decade"
        text-next-month="Next month"
        text-next-year="Next year"
        text-previous-decade="Previous decade"
        text-previous-month="Previous month"
        text-previous-year="Previous year"
        text-switch-year="Switch to year view"
        id="main"
      >
        <input className="form-control" type="text" />
        <p className="form-hint">Format: DD.MM.YYYY</p>
      </PostDatePicker>

      <h4>Header</h4>
      {/* Header */}
      <PostHeader textMenu="Menu">
        <PostLogo slot="post-logo" url="/">
          Homepage
        </PostLogo>
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
        <ul slot="global-nav-primary">
          <li>
            <a href="">
              <span>Search</span>
              <PostIcon aria-hidden="true" name="search" />
            </a>
          </li>
        </ul>
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
        <PostLanguageMenu
          textChangeLanguage="Change the language"
          text-current-language="The currently selected language is #name."
          name="language-menu-example"
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
        <a href="" slot="post-login">
          <span>Login</span>
          <PostIcon name="login" />
        </a>
        <PostMainnavigation slot="main-nav" textMain="Main">
          <ul>
            <li>
              <a href="/letters">Letters</a>
            </li>
            <li>
              <a href="/packages">Packages</a>
            </li>
            <li>
              <PostMegadropdownTrigger for="letters">Letters</PostMegadropdownTrigger>
              <PostMegadropdown id="letters" textClose="Close" text-back="Back">
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
              <PostMegadropdown id="packages" textClose="Close" text-back="Back">
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
      </PostHeader>

      <h4>Icon</h4>
      {/* Icon */}
      <PostIcon name="stampapostplus" />
    </>
  );
}
