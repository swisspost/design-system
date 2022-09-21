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
  public static MIGRATION_ACCORDION_KEY: string = 'post:migration_accordion'
  public static MIGRATION_ACCORDION_GROUPED_CHECKBOXES_KEY: string = 'post:migration_accordion_grouped_checkboxes'
  public version: string = environment.VERSION;
  public stylesVersion: string = environment.STYLES_VERSION;
  public angularVersion: string = environment.ANGULAR_VERSION;
  public bootstrapVersion: string = environment.BOOTSTRAP_VERSION;
  public ngBootstrapVersion: string = environment.NG_BOOTSTRAP_VERSION;
  public ngxToasterVersion: string = environment.NGX_TOASTER;
  public isIE11 = false;
  public isMigratingIntranet = this.getLocaleStorage(this.migrationTypeIntranetKey) ?? false;
  public isMigratingAngular = this.getLocaleStorage(this.migrationTypeAngularKey) ?? true;
  public migrationAccordionActiveIds: Array<string> = this.getLocaleStorage(this.migrationAccordionKey) ?? [];
  public migrationAccordionGroupedCheckboxes: Object = Object.assign(
    {
      general: {
      },
      bootstrap: {
      },
      ngbootstrap: {
      },
      post: {
      }
    },
    this.getLocaleStorage(this.migrationAccordionGroupedCheckboxesKey) ?? {}
  );

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

  get migrationAccordionKey () {
    return HomeComponent.MIGRATION_ACCORDION_KEY;
  }

  get migrationAccordionGroupedCheckboxesKey () {
    return HomeComponent.MIGRATION_ACCORDION_GROUPED_CHECKBOXES_KEY;
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
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public getMigrationAccordionGroupedCheckboxesChecked (group = '') {
    const checkboxValues = Object.values(this.migrationAccordionGroupedCheckboxes[group] ?? {});
    const checkedValues = checkboxValues.filter(v => v === true);

    return `${checkedValues.length} of ${checkboxValues.length} done`;
  } 

  public migrationAccordionChange ($event: NgbPanelChangeEvent) {
    if ($event.nextState) {
      this.migrationAccordionActiveIds = Array.from(new Set(this.migrationAccordionActiveIds.concat($event.panelId)));
    } else {
      this.migrationAccordionActiveIds = this.migrationAccordionActiveIds.filter(id => id !== $event.panelId);
    }

    this.setLocaleStorage(this.migrationAccordionKey, this.migrationAccordionActiveIds);
  }

  public migrationAccordionGroupedCheckboxesChange () {
    this.setLocaleStorage(this.migrationAccordionGroupedCheckboxesKey, this.migrationAccordionGroupedCheckboxes);
  }
}
