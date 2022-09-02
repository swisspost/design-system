import { Component } from '@angular/core';
import { environment } from './../../environments/environment';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-demo-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {
  public static MIGRATION_TYPE_INTRANET_KEY: string = 'post:migration_type_intranet';
  public static MIGRATION_TYPE_ANGULAR_KEY: string = 'post:migration_type_angular';
  public static COMPONENT_MIGRATION_ACCORDION_KEY: string = 'post:component_migration_accordion'
  public static COMPONENT_MIGRATION_ACCORDION_CHECKBOXES_KEY: string = 'post:component_migration_accordion_checkboxes'
  public version: string = environment.VERSION;
  public stylesVersion: string = environment.STYLES_VERSION;
  public angularVersion: string = environment.ANGULAR_VERSION;
  public bootstrapVersion: string = environment.BOOTSTRAP_VERSION;
  public ngBootstrapVersion: string = environment.NG_BOOTSTRAP_VERSION;
  public ngxToasterVersion: string = environment.NGX_TOASTER;
  public isIE11 = false;
  public isMigratingIntranet = this.getLocaleStorage(this.migrationTypeIntranetKey) ?? false;
  public isMigratingAngular = this.getLocaleStorage(this.migrationTypeAngularKey) ?? true;
  public componentMigrationAccordionActiveIds: Array<string> = this.getLocaleStorage(this.componentMigrationAccordionKey) ?? [];
  public componentMigrationAccordionCheckboxes: Object = this.getLocaleStorage(this.componentMigrationAccordionCheckboxesKey) ?? {};

  constructor() {
    // Show deprecation warning if anybody still uses IE11
    this.isIE11 = window.navigator.userAgent.includes('Trident/7.0');
  }

  get migrationTypeIntranetKey () {
    return HomeComponent.MIGRATION_TYPE_INTRANET_KEY;
  }

  get migrationTypeAngularKey () {
    return HomeComponent.MIGRATION_TYPE_ANGULAR_KEY;
  }

  get componentMigrationAccordionKey () {
    return HomeComponent.COMPONENT_MIGRATION_ACCORDION_KEY;
  }

  get componentMigrationAccordionCheckboxesKey () {
    return HomeComponent.COMPONENT_MIGRATION_ACCORDION_CHECKBOXES_KEY;
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

  private getLocaleStorage (key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  public setLocaleStorage (key: string, value: any) {
    console.log(key, value);
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public componentMigrationAccordionChange ($event: NgbPanelChangeEvent) {
    if ($event.nextState) {
      this.componentMigrationAccordionActiveIds = Array.from(new Set(this.componentMigrationAccordionActiveIds.concat($event.panelId)));
    } else {
      this.componentMigrationAccordionActiveIds = this.componentMigrationAccordionActiveIds.filter(id => id !== $event.panelId);
    }

    this.setLocaleStorage(this.componentMigrationAccordionKey, this.componentMigrationAccordionActiveIds);
  }

  public componentMigrationAccordionCheckboxesChange () {
    this.setLocaleStorage(this.componentMigrationAccordionCheckboxesKey, this.componentMigrationAccordionCheckboxes);
  }
}
