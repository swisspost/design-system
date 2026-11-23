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
    name: 'Yanis Morgenegg',
    title: 'UI Developer',
    githubImageId: '53319436',
    githubUsername: 'yomonom',
  },
  {
    name: 'Andrin Affolter',
    title: 'UI Developer',
    githubImageId: '253728423',
    githubUsername: 'andrinaaf',
  },
];

export default () => (
  <footer className="docs-footer">
    <div className="container">
      <div className="py-40">
        <h2 className="text-center mt-0 mb-32">Design System Team Members</h2>
        <ul className="list-profile">
          {TEAM_MEMBERS.sort(() => (Math.random() > 0.5 ? 1 : -1)).map((developer, index) => (
            <li key={index}>
              <post-linkarea className="avatar">
                <img
                  src={`https://avatars.githubusercontent.com/u/${developer.githubImageId}?v=4`}
                  alt={developer.name}
                />
                <div className="avatar-description">
                  <span>{developer.title}</span>
                  <span>{developer.name}</span>
                </div>
                <a
                  href={`https://github.com/${developer.githubUsername}`}
                  className="visually-hidden"
                >
                  User profile
                  <post-icon aria-hidden="true" name="arrowright"></post-icon>
                </a>
              </post-linkarea>
            </li>
          ))}
          <li>
            <post-linkarea className="avatar">
              <span className="avatar-placeholder" aria-hidden="true">
                <post-icon name="plus"></post-icon>
              </span>
              <div className="avatar-description">
                <span>Open source</span>
                <span>
                  Contribute on GitHub <post-icon name="arrowright"></post-icon>
                </span>
              </div>
              <a
                href="https://github.com/swisspost/design-system/blob/main/CONTRIBUTING.md"
                className="visually-hidden"
                rel="noopener"
              >
                Contributing guide
                <post-icon aria-hidden="true" name="arrowright"></post-icon>
              </a>
            </post-linkarea>
          </li>
        </ul>
      </div>
    </div>

    <div className="palette palette-brand">
      <div className="container d-flex gap-16 py-16">
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
    </div>
  </footer>
);
