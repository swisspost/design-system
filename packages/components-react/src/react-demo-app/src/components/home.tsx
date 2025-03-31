import React from 'react';

const Home: React.FC = () => {
  const linkCode = `
<Link to="/other" slot="post-logo">
  <PostLogo>Homepage</PostLogo>
</Link>`;
  const css = `a:has(post-logo) -> height: 100%;`;
  const css2 = `post-logo -> min-height:24px`;

  return (
    <>
      <h4>HTML</h4>
      <p>{linkCode}</p>
      <h4>SCSS</h4>
      <p>{css}</p>
      <p>{css2}</p>
      <p id="content"></p>
    </>
  );
};

export default Home;
