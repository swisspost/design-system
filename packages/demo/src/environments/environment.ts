// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageJson from './../../package.json';

export const environment = {
  production: false,
  VERSION: packageJson.version,
  STYLES_VERSION: packageJson.dependencies['@swisspost/design-system-styles'],
  ANGULAR_VERSION: packageJson.dependencies['@angular/core'],
  BOOTSTRAP_VERSION: packageJson.dependencies.bootstrap,
  NG_BOOTSTRAP_VERSION: packageJson.dependencies['@ng-bootstrap/ng-bootstrap'],
  NGX_TOASTR: packageJson.dependencies['ngx-toastr'],
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
