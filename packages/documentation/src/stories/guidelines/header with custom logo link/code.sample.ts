export const firstStep = `<post-logo>Homepage</post-logo>`;

export const secondStep = `
<!-- Angular -->
<a routerLink="card-control"><post-logo>Homepage</post-logo></a>

<!-- React -->
<Link to="/path"><post-logo>Homepage</post-logo></Link>

<!-- Next.js -->
<Link href="/path"><post-logo>Homepage</post-logo></Link>
`;
export const thirdStep = `
<!-- Angular -->
<a routerLink="card-control" slot="post-logo"><post-logo>Homepage</post-logo></a>

<!-- React -->
<Link to="/path" slot="post-logo"><post-logo>Homepage</post-logo></Link>

<!-- Next.js -->
<Link href="/path" slot="post-logo"><post-logo>Homepage</post-logo></Link>
`;
