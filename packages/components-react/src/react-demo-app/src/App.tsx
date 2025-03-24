import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home.tsx';
import Test from './components/test.tsx';

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
    <>
      <PostHeader>
        <Router>
          <Link to="/test">
            <PostLogo slot="post-logo">Homepage</PostLogo>
          </Link>
          <ul className="list-inline" slot="meta-navigation">
            <li>
              <a href="/">Jobs</a>
            </li>
            <li>
              <a href="/">Über uns</a>
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
            slot="postLanguageSwitch"
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
              <Link to="/home">
                <span className="visually-hidden-sm">Search</span>
                <PostIcon aria-hidden="true" name="search"></PostIcon>
              </Link>
            </li>
            <li>
              <Link to="/other">
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

              <PostListItem slot="post-list-item">afasf</PostListItem>
              <PostListItem slot="post-list-item">asfasf</PostListItem>

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
                    <PostListItem slot="post-list-item"></PostListItem>
                    <PostListItem slot="post-list-item"></PostListItem>
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
                  </PostList>
                  <PostList>
                    <h3>ιυθιυ</h3>
                  </PostList>
                </PostMegadropdown>
              </PostListItem>
            </PostList>
          </PostMainnavigation>

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </Router>
      </PostHeader>

      <h1>Post Logo & Header Check with React</h1>
    </>
  );
}

export default App;
