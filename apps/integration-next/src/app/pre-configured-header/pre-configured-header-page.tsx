import Link from 'next/link';
import { InternetHeader } from './internet-header';

export function PreConfiguredHeaderPage({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <>
      <InternetHeader />
      <main className="container py-36">
        <h1>{title}</h1>
        {children}
        <p>
          Add <code>?klpmock</code> to the URL to see the user menu of a signed-in user.
        </p>
        <nav aria-labelledby="pre-configured-header-nav">
          <h2 id="pre-configured-header-nav">Pre-configured header examples</h2>
          <ul>
            <li>
              <Link href="/pre-configured-header/script-config">Config from a script tag</Link>
            </li>
            <li>
              <Link href="/pre-configured-header/api-config">Config from the header API</Link>
            </li>
            <li>
              <Link href="/ssr">Self-managed header</Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
