// Appends/overwrites a `changeCompanyTargetURL` param on the given URL
// The given parameter is for exclusive usage on the Account/Company switch links,
// so that the platform can redirect back to the current page after the user has switched context.
export const changeContextTargetURL = (url: string): string => {
  const target = new URL(url, window.location.href);
  target.searchParams.set('changeCompanyTargetURL', window.location.href);
  return target.toString();
};
