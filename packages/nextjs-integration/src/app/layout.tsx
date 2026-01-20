import '@swisspost/design-system-styles/post-default.css';
import '@swisspost/design-system-components-react/post-components.css';

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html data-color-scheme="light">
      <body>{children}</body>
    </html>
  );
}
