const METADATA_SNIPPETS = {
  general: `<meta charset="utf-8" />
<title>Metadata example</title>
<meta name="author" content="DesignSystem" />
<meta name="keywords" content="metadata, example" />
<meta name="description" content="An Examle of how metadata of a webpage could look like." />`,
  viewport: `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
  searchEngines: `<meta name="robots" content="noarchive, nofollow" />`,
  openGraph: `<meta property="og:title" content="Metadata Example" />
<meta property="og:url" content="https://www.example.com" />
<meta property="og:image" content="https://www.ex.com/images/rock.jpg" />`,
  favicon: `<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />`,
  language: `<link rel="alternate" hreflang="en" href="https://en.example.com/page.html" />
<link rel="alternate" hreflang="de" href="https://de-ch.example.com/page.html" />
<link rel="alternate" hreflang="fr" href="https://fr.example.com/page.html" />
<link rel="alternate" hreflang="it" href="https://it.example.com/page.html" />
<link rel="alternate" hreflang="x-default" href="https://www.example.com/" />`,
  cors: `<meta http-equiv="Content-Security-Poilicy" content="default-src self;" />`,
};

export const METADATA_OPEN_GRAPH_SNIPPET = `<head prefix="og: https://ogp.me/ns#">
${METADATA_SNIPPETS.openGraph
  .split('\n')
  .map(line => `    ${line}`)
  .join('\n')}
</head>
`;

export const METADATA_COMBINED_SNIPPET = `<!DOCTYPE html>
<html lang="en">
    <head prefix="og: https://ogp.me/ns#">
${Object.values(METADATA_SNIPPETS)
  .map(example =>
    example
      .split('\n')
      .map(line => `        ${line}`)
      .join('\n'),
  )
  .join('\n')}
    </head>
</html>
`;

export default METADATA_SNIPPETS;
