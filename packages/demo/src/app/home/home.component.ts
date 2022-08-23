import { Component } from '@angular/core';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-demo-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public version: string = environment.VERSION;
  public stylesVersion: string = environment.STYLES_VERSION;
  public angularVersion: string = environment.ANGULAR_VERSION;
  public ngxToasterVersion: string = environment.NGX_TOASTER;
  public ngBootstrapVersion: string = environment.NG_BOOTSTRAP_VERSION;
  public isIE11 = false;
  public isMigratingIntranet = false;
  public isMigratingAngular = true;

  constructor() {
    // Show deprecation warning if anybody still uses IE11
    this.isIE11 = window.navigator.userAgent.includes('Trident/7.0');
  }
}
