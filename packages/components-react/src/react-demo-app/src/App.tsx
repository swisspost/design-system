import './App.scss';
import Other from './components/other.tsx';
import Home from './components/home.tsx';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

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
} from '../../components/stencil-generated/index.ts';

function App() {
  return (
    <Router>
      <PostHeader>
        <Link to="/other" slot="post-logo">
          <PostLogo>Homepage</PostLogo>
        </Link>
        <ul className="list-inline" slot="meta-navigation">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/other">Other</Link>
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
            <a href="/">
              <span className="visually-hidden-sm">Search</span>
              <PostIcon aria-hidden="true" name="search"></PostIcon>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="visually-hidden-sm">Login</span>
              <PostIcon aria-hidden="true" name="login"></PostIcon>
            </a>
          </li>
        </ul>
        <PostMainnavigation>
          <button type="button" slot="back-button" className="btn btn-sm btn-tertiary">
            <PostIcon aria-hidden="true" name="arrowright"></PostIcon> Back
          </button>
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
                    <a href="/">Waren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/">Express und Kurier</a>
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
                    <a href="/">Waren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/">Express und Kurier</a>
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
                    <a href="/">Waren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/">Express und Kurier</a>
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
                    <a href="/">Waren Ausland</a>
                  </PostListItem>
                  <PostListItem slot="post-list-item">
                    <a href="/">Express und Kurier</a>
                  </PostListItem>
                </PostList>
              </PostMegadropdown>
            </PostListItem>
          </PostList>
        </PostMainnavigation>
      </PostHeader>

      <h2>Post Header in React</h2>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/other" element={<Other />} />
      </Routes>
    </Router>
  );
}

export default App;
