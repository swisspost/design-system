import React from 'react';
import { useDarkMode } from 'storybook-dark-mode';

const DEVELOPERS = [
  {
    name: 'Philipp Gfeller',
    title: 'Lead UI Developer',
    avatar: 'https://avatars.githubusercontent.com/u/1659006?v=4',
  },
  {
    name: 'Alizé Debray',
    title: 'UI Developer',
    avatar: 'https://avatars.githubusercontent.com/u/33580481?v=4',
  },
  {
    name: 'Oliver Schürch',
    title: 'UI Developer',
    avatar: 'https://avatars.githubusercontent.com/u/9716662?v=4',
  },
];

function forEach(iterable, callback) {
  return Object.entries(Object.assign(iterable)).map(([key, value]) => callback(key, value));
}

export default () => (
  <footer className="docs-footer mt-huge">
    <div className={useDarkMode() ? 'bg-black' : 'bg-light'}>
      <div className="container">
        <div className="pt-big-r pb-big-r">
          <h2 className="mt-0">Support</h2>

          <div className="d-flex flex-wrap mt-huge-r mb-huge-r profile-list">
            {forEach(
              DEVELOPERS.sort(() => (Math.random() > 0.5 ? 1 : -1)),
              (key, developer) => (
                <article key={key} className="avatar">
                  <img
                    className="profile-picture"
                    src={developer.avatar}
                    alt={`Profile picture ${developer.name}`}
                  />
                  <div>
                    <p>
                      <strong>{developer.name}</strong>
                    </p>
                    <p>{developer.title}</p>
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="row mt-regular-r">
            <div className="col-12 col-rg-auto mt-regular-r">
              <a
                className="btn-primary btn btn-rg btn-animated"
                href="https://github.com/swisspost/design-system/issues"
                target="_blank"
                rel="noopener"
              >
                <span>Submit an issue</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="container d-flex justify-content-between py-regular">
      <strong>&copy; 2022 Swiss Post Ltd.</strong>
      <a href="https://github.com/swisspost/design-system" target="_blank" rel="noopener">
        Improve this page
      </a>
    </div>
  </footer>
);
