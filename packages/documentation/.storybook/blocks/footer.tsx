import React from 'react';

interface Developer {
  name: string;
  title: string;
  avatar: string;
}

const DEVELOPERS: Developer[] = [
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
  {
    name: 'Loïc Fürhoff',
    title: 'UI Developer',
    avatar: 'https://avatars.githubusercontent.com/u/12294151?v=4',
  },
];

const BASEURL = 'https://github.com/swisspost/design-system/tree/main/packages/documentation';

function getGitHubUrl(path: String) {
  return `${BASEURL}${path.replace(/^\./, '').replace(/\.stories\.ts$/, '.docs.mdx')}`;
}

export default (params: { pathToStoryFile?: String }) => (
  <>
    <div className="container mt-huge font-size-18 text-end">
      {params.pathToStoryFile && (
        <a href={getGitHubUrl(params.pathToStoryFile)} target="_blank">
          Edit this page on GitHub
        </a>
      )}
    </div>
    <footer className="docs-footer mt-huge bg-light">
      <div className="container">
        <div className="pt-big-r pb-big-r">
          <h2 className="mt-0">Support</h2>

          <div className="d-flex flex-wrap mt-huge-r mb-huge-r profile-list">
            {DEVELOPERS.sort(() => (Math.random() > 0.5 ? 1 : -1)).map((developer, index) => (
              <article key={index} className="avatar">
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
            ))}
          </div>

          <div className="row mt-regular-r">
            <div className="col-12 col-rg-auto mt-regular-r">
              <a
                className="btn-primary btn btn-rg btn-animated"
                href="https://github.com/swisspost/design-system/issues"
                target="_blank"
              >
                <span>Submit an issue</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-between py-regular">
        <strong>&copy; {new Date().getFullYear()} Swiss Post Ltd.</strong>
        <div className="d-flex gap-3">
          <a
            href="https://www.post.ch/en/pages/footer/data-protection-and-disclaimer"
            target="_blank"
          >
            Data protection and disclaimer
          </a>
        </div>
      </div>
    </footer>
  </>
);
