import {
  //   PostHeader,
  //   PostLogo,
  //   PostTogglebutton,
  //   PostLanguageOption,
  PostIcon,
  //   PostLanguageSwitch,
  //   PostMainnavigation,
  //   PostList,
  //   PostListItem,
  //   PostClosebutton,
  //   PostMegadropdownTrigger,
  //   PostMegadropdown,
} from '@swisspost/design-system-components-react';

// import Link from 'next/link';
export default function Other2() {
  return (
    <>
      {/* <PostHeader suppressHydrationWarning={true}>
        <PostLogo slot="post-logo" url="/" suppressHydrationWarning={true}>
          Logo
        </PostLogo>
        <ul className="list-inline" slot="meta-navigation">
          <li>
            <Link href="other2">Other2</Link>
          </li>
          <li>
            <Link href="other">Other</Link>
          </li>
        </ul>
        <PostTogglebutton slot="post-togglebutton" suppressHydrationWarning={true}>
          <span className="visually-hidden-sm">Menu</span>
          <PostIcon aria-hidden="true" name="burger" data-showwhen="untoggled"></PostIcon>
          <PostIcon aria-hidden="true" name="closex" data-showwhen="toggled"></PostIcon>
        </PostTogglebutton>
        <PostLanguageSwitch
          suppressHydrationWarning={true}
          caption="Change the language"
          description="The currently selected language is English."
          variant="list"
          slot="post-language-switch"
        >
          <PostLanguageOption
            active={false}
            code="de"
            name="Deutsch"
            suppressHydrationWarning={true}
          >
            de
          </PostLanguageOption>
          <PostLanguageOption
            active={false}
            code="fr"
            name="French"
            suppressHydrationWarning={true}
          >
            fr
          </PostLanguageOption>
          <PostLanguageOption
            active={false}
            code="it"
            name="Italiano"
            suppressHydrationWarning={true}
          >
            it
          </PostLanguageOption>
          <PostLanguageOption
            active={true}
            code="en"
            name="English"
            suppressHydrationWarning={true}
          >
            en
          </PostLanguageOption>
        </PostLanguageSwitch>
        <h1 slot="title">Application title</h1>
        <ul className="list-inline">
          <li>
            <Link href="/">
              <span className="visually-hidden-sm">Search</span>
              <PostIcon aria-hidden="true" name="search" suppressHydrationWarning={true}></PostIcon>
            </Link>
          </li>
          <li>
            <Link href="other">
              <span className="visually-hidden-sm">Login</span>
              <PostIcon aria-hidden="true" name="login" suppressHydrationWarning={true}></PostIcon>
            </Link>
          </li>
        </ul>
        <PostMainnavigation suppressHydrationWarning={true}>
          <button type="button" slot="back-button" className="btn btn-sm btn-tertiary">
            <PostIcon
              aria-hidden="true"
              name="arrowright"
              suppressHydrationWarning={true}
            ></PostIcon>{' '}
            Back
          </button>
          <PostList title-hidden="" suppressHydrationWarning={true}>
            <h2>Main Navigation</h2>

            <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
              <Link href="/">Briefe</Link>
            </PostListItem>
            <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
              <Link href="other">Pakete</Link>
            </PostListItem>

            <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
              <PostMegadropdownTrigger for="briefe" suppressHydrationWarning={true}>
                Briefe
              </PostMegadropdownTrigger>
              <PostMegadropdown id="briefe">
                <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
                  <PostIcon name="arrowright" suppressHydrationWarning={true}></PostIcon>
                  Back
                </button>
                <PostClosebutton slot="close-button" suppressHydrationWarning={true}>
                  Schliessen
                </PostClosebutton>
                <h2 slot="megadropdown-title">Briefe title</h2>
                <PostList>
                  <h3>Briefe senden</h3>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/sch">Briefe Schweiz</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/kl">Kleinwaren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/">Waren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/">Express und Kurier</Link>
                  </PostListItem>
                </PostList>
                <PostList>
                  <h3>
                    <Link href="/schritt-für-schritt" suppressHydrationWarning={true}>
                      Schritt für Schritt
                    </Link>
                  </h3>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/sch">Pakete Schweiz</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/kl">Kleinwaren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/">Waren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/">Express und Kurier</Link>
                  </PostListItem>
                </PostList>
              </PostMegadropdown>
            </PostListItem>
            <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
              <PostMegadropdownTrigger for="pakete" suppressHydrationWarning={true}>
                Pakete
              </PostMegadropdownTrigger>
              <PostMegadropdown id="pakete" suppressHydrationWarning={true}>
                <button slot="back-button" className="btn btn-tertiary px-0 btn-sm">
                  <PostIcon name="arrowright"></PostIcon>
                  Back
                </button>
                <PostClosebutton slot="close-button" suppressHydrationWarning={true}>
                  Schliessen
                </PostClosebutton>
                <h2 slot="megadropdown-title">Pakete title</h2>
                <PostList>
                  <h3>Pakete senden</h3>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/sch">Pakete Schweiz</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/kl">Kleinwaren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/">Waren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/">Express und Kurier</Link>
                  </PostListItem>
                </PostList>
                <PostList suppressHydrationWarning={true}>
                  <h3>
                    <Link href="/schritt-für-schritt">Schritt für Schritt</Link>
                  </h3>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/sch">Pakete Schweiz</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/kl">Kleinwaren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/">Waren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item" suppressHydrationWarning={true}>
                    <Link href="/">Express und Kurier</Link>
                  </PostListItem>
                </PostList>
              </PostMegadropdown>
            </PostListItem>
          </PostList>
        </PostMainnavigation>
      </PostHeader> */}
      <h1 className="visually-hidden">This is another page</h1>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <PostIcon name="1010" className="fs-small-huge"></PostIcon>
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <PostIcon name="1010" className="fs-small-huge"></PostIcon>
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <PostIcon name="1010" className="fs-small-huge"></PostIcon>
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
      <section>
        <h2 className="h4 mt-40">Sendung Verfolgen</h2>
        <form className="palette-brand mt-16 py-16 px-32 d-flex gap-24">
          <PostIcon name="1010" className="fs-small-huge"></PostIcon>
          <div className="form-floating" style={{ minWidth: '50%' }}>
            <input
              id="ExampleTextarea_Default"
              className="form-control"
              type="text"
              name="text-input"
              placeholder="Sendungsnummber eingeben"
            />

            <label className="form-label" htmlFor="ExampleTextarea_Default">
              Sendungsnummer
            </label>
          </div>
          <button className="btn btn-primary align-self-center" style={{ marginLeft: 'auto' }}>
            Suchen
          </button>
        </form>
      </section>
    </>
  );
}
