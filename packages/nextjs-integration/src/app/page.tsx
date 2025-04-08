import {
  PostHeader,
  PostLogo,
  PostTogglebutton,
  PostIcon,
  PostLanguageOption,
  PostLanguageSwitch,
  PostMainnavigation,
  PostList,
  PostListItem,
  PostClosebutton,
  PostMegadropdownTrigger,
  PostMegadropdown,
} from '@swisspost/design-system-components-react';

import Link from 'next/link';
export default function Home() {
  return (
    <>
      <PostHeader>
        <Link href="other" slot="post-logo">
          <PostLogo>/page</PostLogo>
        </Link>
        <ul className="list-inline" slot="meta-navigation">
          <li>
            <Link href="/"></Link>
          </li>
          <li>
            <Link href="other">Other</Link>
          </li>
        </ul>
        <PostTogglebutton slot="post-togglebutton">
          <span className="visually-hidden-sm">Menu</span>
          <PostIcon aria-hidden="true" name="burger" data-showwhen="untoggled"></PostIcon>
          <PostIcon aria-hidden="true" name="closex" data-showwhen="toggled"></PostIcon>
        </PostTogglebutton>
        <PostLanguageSwitch
          caption="Change the language"
          description="The currently selected language is English."
          variant="list"
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
            <Link href="/">
              <span className="visually-hidden-sm">Search</span>
              <PostIcon aria-hidden="true" name="search"></PostIcon>
            </Link>
          </li>
          <li>
            <Link href="other">
              <span className="visually-hidden-sm">Login</span>
              <PostIcon aria-hidden="true" name="login"></PostIcon>
            </Link>
          </li>
        </ul>
        <PostMainnavigation>
          <button type="button" slot="back-button" className="btn btn-sm btn-tertiary">
            <PostIcon aria-hidden="true" name="arrowright"></PostIcon> Back
          </button>
          <PostList title-hidden="">
            <h2>Main Navigation</h2>

            <PostListItem slot="post-list-item">
              <Link href="/">Briefe</Link>
            </PostListItem>
            <PostListItem slot="post-list-item">
              <Link href="other">Pakete</Link>
            </PostListItem>

            <PostListItem slot="post-list-item">
              <PostMegadropdownTrigger for="briefe">Briefe</PostMegadropdownTrigger>
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
                    <Link href="/sch">Briefe Schweiz</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/kl">Kleinwaren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/">Waren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/">Express und Kurier</Link>
                  </PostListItem>
                </PostList>
                <PostList>
                  <h3>
                    <Link href="/schritt-für-schritt">Schritt für Schritt</Link>
                  </h3>
                  <PostListItem slot="post-list-item">
                    <Link href="/sch">Pakete Schweiz</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/kl">Kleinwaren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/">Waren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/">Express und Kurier</Link>
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
                    <Link href="/sch">Pakete Schweiz</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/kl">Kleinwaren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/">Waren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/">Express und Kurier</Link>
                  </PostListItem>
                </PostList>
                <PostList>
                  <h3>
                    <Link href="/schritt-für-schritt">Schritt für Schritt</Link>
                  </h3>
                  <PostListItem slot="post-list-item">
                    <Link href="/sch">Pakete Schweiz</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/kl">Kleinwaren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/">Waren Ausland</Link>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <Link href="/">Express und Kurier</Link>
                  </PostListItem>
                </PostList>
              </PostMegadropdown>
            </PostListItem>
          </PostList>
        </PostMainnavigation>
      </PostHeader>
      <h1 className="visually-hidden">This is another page</h1>
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
