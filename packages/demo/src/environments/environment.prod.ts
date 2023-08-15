import packageJson from '../../package.json';

export const environment = {
  production: true,
  VERSION: packageJson.version,
  ANGULAR_VERSION: packageJson.dependencies["@angular/core"],
  NG_BOOTSTRAP_VERSION: packageJson.dependencies["@ng-bootstrap/ng-bootstrap"],
  NGX_TOASTR: packageJson.dependencies["ngx-toastr"],
};
