import '@swisspost/design-system-styles/post-default.css';
import '@swisspost/design-system-components-react/post-components.css';
import Script from 'next/script';

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" data-color-scheme="light">
      <body>
        {/* Fakes the KLP platform for the login widget; logged out unless `?session=` names a user. */}
        <Script src="/klp-platform-mock.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
