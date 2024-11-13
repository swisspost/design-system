import React from 'react';

interface TeamMember {
  name: string;
  title: string;
  githubImageId: string;
  githubUsername: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Philipp Gfeller',
    title: 'Context switcher',
    githubImageId: '1659006',
    githubUsername: 'gfellerph',
  },
  {
    name: 'Alizé Debray',
    title: 'UI Mademoiselle',
    githubImageId: '33580481',
    githubUsername: 'alizedebray',
  },
  {
    name: 'Oliver Schürch',
    title: 'Señor Developer',
    githubImageId: '9716662',
    githubUsername: 'oliverschuerch',
  },
  {
    name: 'Myrta Sakellariou',
    title: 'Mama Pigxel',
    githubImageId: '66249294',
    githubUsername: 'myrta2302',
  },
  {
    name: 'Lea Gardavaud',
    title: 'UI Developer',
    githubImageId: '183501002',
    githubUsername: 'leagrdv',
  },
  {
    name: 'Alona Zherdetska',
    title: 'Component Fairy',
    githubImageId: '138328641',
    githubUsername: 'alionazherdetska',
  },
  {
    name: 'Tim Schär',
    title: 'UI Developer',
    githubImageId: '59233938',
    githubUsername: 'schaertim',
  },
  {
    name: 'Rouven Steiger',
    title: 'Art Guy EDK',
    githubImageId: '104423005',
    githubUsername: 'rouvenpost',
  },
  {
    name: 'Christian Zundel',
    title: 'UX Designer',
    githubImageId: '119845956',
    githubUsername: 'Cian77',
  },
  {
    name: 'Alessio Travaglini',
    title: 'Token Orchestrator',
    githubImageId: '158268546',
    githubUsername: 'Vandapanda',
  },
  {
    name: 'Romain Veya',
    title: 'UI Developer',
    githubImageId: '111903046',
    githubUsername: 'veyaromain',
  },
];

const BASEURL = 'https://github.com/swisspost/design-system/tree/main/packages/documentation';

function getGitHubUrl(path: String) {
  return `${BASEURL}${path.replace(/^\./, '').replace(/\.stories\.ts$/, '.docs.mdx')}`;
}

export default (params: { pathToStoryFile?: String }) => (
  <>
    <div className="container mt-56 font-size-18 text-end">
      {params.pathToStoryFile && (
        <a href={getGitHubUrl(params.pathToStoryFile)} rel="noopener">
          Edit this page on GitHub
        </a>
      )}
    </div>
    <footer className="docs-footer mt-56">
      <div className="bg-light">
        <div className="container">
          <div className="pt-big-r pb-big-r">
            <h2 className="mt-0">Design System Team Members</h2>
            <ul className="list-profile">
              {TEAM_MEMBERS.sort(() => (Math.random() > 0.5 ? 1 : -1)).map((developer, index) => (
                <li key={index}>
                  <a className="avatar" href={`https://github.com/${developer.githubUsername}`}>
                    <div className="avatar-image">
                      <img
                        src={`https://avatars.githubusercontent.com/u/${developer.githubImageId}?v=4`}
                        alt={developer.name}
                      />
                    </div>
                    <div className="avatar-description">
                      <span>{developer.title}</span>
                      <span>{developer.name}</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="row mt-regular-r">
              <div className="col-12 col-rg-auto mt-regular-r">
                <a
                  className="btn-primary btn"
                  href="https://github.com/swisspost/design-system/issues"
                  rel="noopener"
                >
                  <span>Submit an issue</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container d-flex justify-content-between py-16">
        <strong>&copy; {new Date().getFullYear()} Swiss Post Ltd.</strong>
        <div className="d-flex gap-16">
          <a
            href="https://www.post.ch/en/pages/footer/data-protection-and-disclaimer"
            rel="noopener"
          >
            Data protection and disclaimer
          </a>
        </div>
      </div>
    </footer>
  </>
);
