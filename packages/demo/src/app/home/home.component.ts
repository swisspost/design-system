import { Component } from '@angular/core';

import { environment } from './../../environments/environment';

@Component({
  selector: 'app-demo-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public version: string = environment.VERSION;
  public stylesVersion: string = environment.STYLES_VERSION;
  public angularVersion: string = environment.ANGULAR_VERSION;
  public bootstrapVersion: string = environment.BOOTSTRAP_VERSION;
  public ngBootstrapVersion: string = environment.NG_BOOTSTRAP_VERSION;
  public ngxToasterVersion: string = environment.NGX_TOASTER;
  public isIE11 = false;
  public isMigratingIntranet = false;
  public isMigratingAngular = true;

  constructor() {
    // Show deprecation warning if anybody still uses IE11
    this.isIE11 = window.navigator.userAgent.includes('Trident/7.0');
  }


  private getCleanVersion (version: string) {
    return version
      .replace(/^[^\d]+/, '');
  }

  public getVersion (version: string, filter: string = '') {
    const cleanVersion: string = this.getCleanVersion(version);
    let matchArray: RegExpMatchArray = null;

    if (filter === 'major' || filter === 'M') {
      matchArray = cleanVersion.match(/^\d+/);
    } else if (filter === 'minor' || filter === 'm') {
      matchArray = cleanVersion.match(/(?<=\d+\.)\d+/);
    } else if (filter === 'patch' || filter === 'p') {
      matchArray = cleanVersion.match(/(?<=\d+\.\d+\.)\d+/);
    } else if (filter === 'pre') {
      matchArray = cleanVersion.match(/(?<=\d+\.\d+\.\d+)[^\d].*/);
    } else if (filter === 'majorminor' || filter === 'Mm') {
      matchArray = cleanVersion.match(/^\d+\.\d+/)
    } else if (filter === 'majorminorpatch' || filter === 'Mmp') {
      matchArray = cleanVersion.match(/^\d+\.\d+\.\d+/)
    }

    if (matchArray !== null && matchArray.length > 0) {
      return matchArray[0];
    } else if (cleanVersion.length > 0) {
      return cleanVersion;
    } else {
      return version;
    }
  }
}
