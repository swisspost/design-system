export const firstStep = `

<!-- Angular -->
<post-logo>Homepage</post-logo>

<!-- React & Next.js -->
<PostLogo>Homepage</PostLogo>
`;

export const secondStep = `
<!-- Angular -->
<a routerLink="#"><post-logo>Homepage</post-logo></a>

<!-- React -->
<Link to="#"><PostLogo>Homepage</PostLogo></Link>

<!-- Next.js -->
<Link href="#"><PostLogo>Homepage</PostLogo></Link>
`;
export const thirdStep = `
<!-- Angular -->
<a routerLink="#" slot="post-logo"><post-logo>Homepage</post-logo></a>

<!-- React -->
<Link to="#" slot="post-logo"><PostLogo>Homepage</PostLogo></Link>

<!-- Next.js -->
<Link href="#" slot="post-logo"><PostLogo>Homepage</PostLogo></Link>
`;
