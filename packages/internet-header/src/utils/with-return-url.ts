/** Appends/overwrites a returnURL param on the given URL */
export const withReturnUrl = (url: string): string => {
  const target = new URL(url, window.location.href);
  target.searchParams.set('returnURL', window.location.href);
  return target.toString();
};
