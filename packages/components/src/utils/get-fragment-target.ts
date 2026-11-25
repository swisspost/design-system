/**
 * Returns the element referenced by the current URL fragment, if any.
 */
export function getFragmentTarget(doc: Document = document): HTMLElement | null {
  const hash = globalThis.location?.hash;
  if (!hash) return null;

  try {
    return doc.getElementById(decodeURIComponent(hash.slice(1)));
  } catch (error) {
    if (!(error instanceof URIError)) throw error;
    console.warn('Unable to decode the URL fragment target.', error);
    return null;
  }
}
