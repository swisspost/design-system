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

const BASEURL =
  'https://github.com/swisspost/design-system/tree/main/packages/documentation/src/stories/';
const TWOPIECEFOLDERNAMES = ['getting-started', 'internet-header', 'intranet-header'];
const SUBFOLDERS = ['foundations-layout'];
const DOCSFILEENDING = '.docs.mdx';
const ICONS: Record<string, string> = {
  'getting-started': 'getting-started.docs.mdx',
  'search-for-icons': 'search-icons/search-icons.docs.mdx',
  'icon-component': 'components/icon.docs.mdx',
};
const INTERNETHEADER: Record<string, string> = {
  'getting-started': 'getting-started.docs.mdx',
  'migration-guide': 'migration-guide.docs.mdx',
  'header': 'components/header/header.docs.mdx',
  'header-custom-config': 'components/header/overrides-stories/header-custom-config.docs.mdx',
  'header-language-switch-overrides':
    'components/header/overrides-stories/header-language-switch-overrides.docs.mdx',
  'header-os-flyout-overrides':
    'components/header/overrides-stories/header-os-flyout-overrides.docs.mdx',
  'breadcrumbs': 'components/breadcrumbs/breadcrumbs.docs.mdx',
  'breadcrumbs-custom-items': 'components/breadcrumbs/overrides/breadcrumbs-config.docs.mdx',
  'footer': 'components/footer/footer.docs.mdx',
  'footer-custom-config': 'components/footer/custom-config/footer-config.docs.mdx',
};

function getGitHubUrl(subpage: Location) {
  //console.log(subpage.href.split('/')[3].split('id=')[1].split('--')[0].split('-'));
  const id = subpage.href.split('/')[3].split('id=')[1].split('--')[0].split('-');
  var UrlBuild = [];
  console.log(subpage);
  if (TWOPIECEFOLDERNAMES.includes(id[0] + '-' + id[1])) {
    UrlBuild.push(id.shift() + '-' + id.shift());
  } else {
    UrlBuild.push(id.shift() + '');
  }
  if (SUBFOLDERS.includes(UrlBuild + '-' + id[0])) {
    UrlBuild.push(id.shift() + '');
    UrlBuild.push(id.join('-'));
  } else if (id.length === 0) {
    //console.log(BASEURL + UrlBuild.join('/') + DOCSFILEENDING);
    return BASEURL + UrlBuild.join('/') + DOCSFILEENDING; //edge case for the home page
  } else if (UrlBuild.includes('icons')) {
    UrlBuild.push(id.join('-'));
    return BASEURL + UrlBuild.map(key => ICONS[key] || key).join('/'); //edge case for the icons folder
  } else if (UrlBuild.includes('internet-header') || UrlBuild.includes('intranet-header')) {
    UrlBuild.push(id.join('-'));
    return BASEURL + UrlBuild.map(key => INTERNETHEADER[key] || key).join('/'); //edge cases for the internet-header pages
  } else {
    UrlBuild.push(id.join('-'));
  }
  console.log(id);
  //console.log(BASEURL + UrlBuild.join('/') + '/' + UrlBuild.pop() + DOCSFILEENDING);
  UrlBuild = UrlBuild.map(key => (key === 'foundations' ? 'foundation' : key)); // foundation folder is named differently on github
  var test = BASEURL + UrlBuild.join('/') + '/' + UrlBuild.pop() + DOCSFILEENDING;
  console.log(test);
  return test;
}

export default () => (
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
              rel="noopener"
            >
              <span>Submit an issue</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="container d-flex justify-content-between py-regular">
      <strong>&copy; 2022 Swiss Post Ltd.</strong>
      <div className="d-flex gap-3">
        <a
          href="https://www.post.ch/en/pages/footer/data-protection-and-disclaimer"
          target="_blank"
          rel="noopener"
        >
          Data protection and disclaimer
        </a>
        <a href={getGitHubUrl(window.location)} target="_blank" rel="noopener">
          Improve this page
        </a>
      </div>
    </div>
  </footer>
);
