export async function getAppEnv() {
  global.IS_HYDRATEAPP_TEST = true;

  // keep this, to have runtime-only import (otherwise the build fails)
  const HYDRATE_ID = '@swisspost/design-system-components/hydrate';

  const hydrateApp = await import(HYDRATE_ID);
  const results = await hydrateApp.renderToString('<post-env-test></post-env-test>');

  const IS_BROWSER = /data-browser="(true|false)"/.exec(results.html)?.[1] === 'true';
  const IS_SERVER = /data-server="(true|false)"/.exec(results.html)?.[1] === 'true';

  return {
    IS_BROWSER,
    IS_SERVER,
  };
}

export function afterTestCleanup() {
  delete global.IS_HYDRATEAPP_TEST;
}
