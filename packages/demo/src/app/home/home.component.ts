import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

// Let RegEx escape your code snippets.
// SEARCH FOR
// ([^\\])\\([^\\])
// REPLACE WITH
// $1\\\\$2

const installCwf = `> # Replace node-sass with sass (dart-sass)
> npm uninstall node-sass
> npm install sass --save-dev

> # Replace CWF
> npm uninstall design-system-styles
> npm install @swisspost/design-system-styles@^4.1.0 --save

> # Replace Header
> npm uninstall intranet-header
> npm install @swisspost/design-system-styles-intranet-header`;

const updateHeaderImport = `// src/app/app.module.ts
// ...
import { SwissPostIntranetHeaderModule } from '@swisspost/design-system-styles-intranet-header';
// ...`;

const updatePackages = `> # Update both ng-bootstrap and ngx-toastr
> npm install @ng-bootstrap/ng-bootstrap@9.0.2 ngx-toastr@13.2.0 --save`;

const angularConfig = `<span class="text-white-50">// angular.json
{
  // ...
  "projects": {
    "your-smile-is-contagious": {
      "root": "",
      // ...
      "architect": {
        "build": {
          // ...
          "options": {
            // ...</span>
            "stylePreprocessorOptions": {
              "includePaths": [
                "node_modules"
              ]
            }
          <span class="text-white-50">}
        },
        "test": {
          // ...
          "options": {
            // ...</span>
            "stylePreprocessorOptions": {
              "includePaths": [
                "node_modules"
              ]
            }
          <span class="text-white-50">// and so forth</span>`;

const globalErrorHandler = `// src/app/common/error/services/global-error-handler.service.ts
import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

/**
 * Handles unhandled errors globally.
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    private toastr: ToastrService;
    private translateService: TranslateService;

    constructor(private injector: Injector) {
    }

    handleError(error: any): void {
        console.error('Unexpected error', error);
        if (!this.toastr) {
            this.toastr = this.injector.get(ToastrService);
        }
        if (!this.translateService) {
            this.translateService = this.injector.get(TranslateService);
        }
        this.toastr.error(this.translateService.instant('template.error.generic'));
    }

}`;



const stylesConfig = `<span class="text-white-50">// angular.json
{
  // ...
  "projects": {
    "all-glory-to-the-hypnotoad": {
      "root": "",
      // ...
      "architect": {
        "build": {
          // ...
          "options": {
            // ...</span>
            "styles": [
              "src/styles.scss",
              "node_modules/@swisspost/design-system-styles/post.scss" // Or post-intranet.scss or post-portal.scss
            ],
            <span class="text-white-50">// and so forth</span>`;

const replaceToastr = `// app.module.ts
// ...
ToastrModule.forRoot({
  // ... (Other settings you might have made)
  toastClass: "toast"
}),
// ...`;

const cwfUse = `// styles.scss
// Include the file you included before; either "post", "post-intranet" or "post-portal". (Only one of them.)
@use "@swisspost/design-system-styles/post-intranet";

// Optional: use functions, mixins and variables
@use '@swisspost/design-system-styles/core' as post;

.bg-yellow { // Don't copy this class. It is just an example.
  // 'core' is the filename and by convention the namespace
  // but for consistency with other prefixes, the core module should be namespaced as 'post'
  background-color: post.$yellow;
}`;

const fontCorsPolicy = `<!-- src/app/index.html -->
<!DOCTYPE html>
<html>
  <head>
      <meta charset="utf-8">
      <!-- ... -->
      <meta http-equiv="Content-Security-Policy"
            content="default-src 'none';
                script-src 'self' 'unsafe-eval';
                style-src 'self' 'unsafe-inline';
                img-src 'self' https://psc.post.ch https://web.post.ch data: 'self';
                connect-src 'self' ws://localhost:4200;
                form-action 'self' https://fonts.post.ch https://sharepoint.sp.swisspost.com;
                base-uri 'self';
                font-src 'self' https://fonts.post.ch data: 'self'">
      <!-- Leave any other policies in place, just add https://fonts.post.ch -->
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>`;

const customIconConfig = `// BEFORE
.pi-{...} {
  @extend %pi-{...};
}
// AFTER
.pi-{...} {
  @include post.pi(...); // args: $name = Icon number, $color = Icon color, default: Body-Color.
}`;

const iconRegexSearch = `// SEARCH FOR
@extend %pi-(\\d{4})-(\\w+)
// REPLACE WITH
@include post.pi($1, $2)

// SEARCH FOR
@extend %pi-(\\d{4})([^-])
// REPLACE WITH
@include post.pi($1)$2

// SEARCH FOR
background-image: ?url\\(get-colored-svg-url\\((["0-9]{4,6}), ?(#[ABCDEF0-9]{3,6}|map.get\\((post.)?\\$[a-zA-Z]+, "[a-zA-Z]+"\\))\\)\\);( ?\\/\\/ ?.*)?(
 *border-color: ?(#[ABCDEF0-9]{3,6}|map.get\\((post.)?\\$[a-zA-Z]+, "[a-zA-Z]+"\\));)?( ?\\/\\/ ?.*)?
// REPLACE WITH
@include post.pi($1, $2);$8
`;

const regexReplace = `// Sass Functions. Don't forget to add the corresponding @use
// to the top of each style.scss where needed. (Conveniently adds a TODO for you.)

// SEARCH FOR
([ \\(\\{])(map|color|list|math|meta|selector|string)-([a-zA-Z-]+\\((.*);)
// REPLACE WITH
$1$2.$3 // Add this import to the top of the file: @use "sass:$1";

// Variables, mixins and functions used from post. Be careful! This might replace more than you'd want it to...
/* Don't forget to add '@use "@swisspost/design-system-styles/cwf";' */
// at the top of every file where you use a function, mixin or variable from post.

// SEARCH FOR
([ \\(\\{])(\\$|[a-zA-Z-]+\\()
// REPLACE WITH
$1post.$2

// SEARCH FOR
@import (".*");
// REPLACE WITH
@use $1;

// Replace Header Imports

// SEARCH FOR
'intranet-header'
// REPLACE WITH
'@swisspost/design-system-styles-intranet-header'`;

const checknodeversion = `> node -v
> # v12.18.2 > 10.0.0`;

const updateangular = `> ng update @angular/core@12 @angular/cli@12`;
const updateangular13 = `> npx @angular/cli@13 update @angular/core@13 @angular/cli@13`;
const updateangularerror = `> Package "[package-name]" has an incompatible peer dependency to "[other-package-name]"`;
const updateangularextra = `> ng update @angular/core@12 @angular/cli@12 [package-name]`;
const updateangular13extra = `> npx @angular/cli@13 update @angular/core@13 @angular/cli@13 [package-name]`;

const checkangularversion = `> ng version

> # Angular CLI: 12.0.3 > 12.0.0
> # Angular: 12.0.4 > 12.0.0
> # typescript: 4.2.4 > 4.2.0`;

const updatepackages = `> npm update`;
const outdatedpackages = `> npm outdated`;

const updateindividualpackages = `> npm i ngx-toastr@latest`;
const updatedatatable = `> npm i @swimlane/ngx-datatable@latest`;

const startangular = `> npm start`;

const updateangularjson = `{
  "[...]": "[...]",
  "configurations": {
    "production": {
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ],
      "optimization": {
        "scripts": true,
        "fonts": {
          "inline": true
        },
        "styles": {
          "minify": true,
          "inlineCritical": false
        }
      },
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "aot": true,
      "extractLicenses": true,
      "vendorChunk": false,
      "buildOptimizer": true
    }
  },
  "[...]": "[...]",
}`;

@Component({
  selector: 'app-demo-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public installCwf = installCwf;
  public updateHeaderImport = updateHeaderImport;
  public updatePackages = updatePackages;
  public angularConfig = angularConfig;
  public replaceToastr = replaceToastr;
  public cwfUse = cwfUse;
  public styleConfig = stylesConfig;
  public fontCorsPolicy = fontCorsPolicy;
  public customIconConfig = customIconConfig;
  public iconRegexSearch = iconRegexSearch;
  public regexReplace = regexReplace;
  public checknodeversion = checknodeversion;
  public updateangular = updateangular;
  public updateangular13 = updateangular13;
  public updateangularerror = updateangularerror;
  public updateangularextra = updateangularextra;
  public updateangular13extra = updateangular13extra;
  public checkangularversion = checkangularversion;
  public updatepackages = updatepackages;
  public updateindividualpackages = updateindividualpackages;
  public startangular = startangular;
  public updateangularjson = updateangularjson;
  public outdatedpackages = outdatedpackages;
  public updatedatatable = updatedatatable;
  public globalErrorHandler = globalErrorHandler;
  public version: string = environment.VERSION;
  public angularVersion: string = environment.ANGULAR_VERSION;
  public ngxToasterVersion: string = environment.NGX_TOASTER;
  public ngBootstrapVersion: string = environment.NG_BOOTSTRAP_VERSION;

  public isIE11 = false;


  constructor() {
    this.isIE11 = window.navigator.userAgent.includes('Trident/7.0');
  }

}
