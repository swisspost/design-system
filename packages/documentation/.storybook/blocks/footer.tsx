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
    title: 'UI Developer',
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
    name: 'Léa Gardavaud',
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
    name: 'Rouven Steiger',
    title: 'Art Guy EDK',
    githubImageId: '104423005',
    githubUsername: 'rouvenpost',
  },
  {
    name: 'Sandra Hohl',
    title: 'UX Architect',
    githubImageId: '175929675',
    githubUsername: 'sandra-post',
  },
  {
    name: 'Alessio Travaglini',
    title: 'Token Orchestrator',
    githubImageId: '158268546',
    githubUsername: 'Vandapanda',
  },
  {
    name: 'Hugo Machado da Silva',
    title: 'UI Developer',
    githubImageId: '170833805',
    githubUsername: 'hugomslv',
  },
];

const BASEURL = 'https://github.com/swisspost/design-system/tree/main/packages/documentation';

function getGitHubUrl(path: string) {
  return `${BASEURL}${path.replace(/^\./, '').replace(/\.stories\.ts$/, '.docs.mdx')}`;
}

export default (params: { pathToStoryFile?: string }) => (
  <>
    <div className="container mt-56 fs-5 text-end">
      {params.pathToStoryFile && (
        <a href={getGitHubUrl(params.pathToStoryFile)} rel="noopener">
          Edit this page on GitHub
        </a>
      )}
    </div>
    <footer className="docs-footer mt-56">
      <div>
        <div className="container">
          <div className="py-32">
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
            <div className="row mt-24">
              <div className="col-12 col-sm-auto mt-24">
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
