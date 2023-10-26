import { Component } from '@angular/core';
import { environment } from './../../environments/environment';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';

interface MigrationAccordionGroupedCheckboxes {
  general: Object;
  bootstrap: Object;
  ngbootstrap: Object;
  jquery: Object;
  post: Object;
}

@Component({
  selector: 'app-demo-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  public static MIGRATION_TYPE_INTRANET_KEY: string = 'post:migration_type_intranet';
  public static MIGRATION_TYPE_ANGULAR_KEY: string = 'post:migration_type_angular';
  public static MIGRATION_ACCORDION_KEY: string = 'post:migration_accordion';
  public static MIGRATION_ACCORDION_GROUPED_CHECKBOXES_KEY: string =
    'post:migration_accordion_grouped_checkboxes';
  public version: string = environment.VERSION;
  public stylesVersion: string = environment.STYLES_VERSION;
  public angularVersion: string = environment.ANGULAR_VERSION;
  public bootstrapVersion: string = environment.BOOTSTRAP_VERSION;
  public ngBootstrapVersion: string = environment.NG_BOOTSTRAP_VERSION;
  public ngxToastrVersion: string = environment.NGX_TOASTR;
  public isIE11 = false;
  public isMigratingIntranet = this.getLocaleStorage(this.migrationTypeIntranetKey) ?? false;
  public isMigratingAngular = this.getLocaleStorage(this.migrationTypeAngularKey) ?? true;
  public migrationAccordionActiveIds: Array<string> =
    this.getLocaleStorage(this.migrationAccordionKey) ?? [];
  public migrationAccordionGroupedCheckboxes: MigrationAccordionGroupedCheckboxes = {
    general: {
      naming_cwfpackagename: false,
      naming_entryfiles: false,
      naming_cwflicense: false,
      naming_cwfname: false,
      naming_options: false,
      variables_isolatecomponents: false,
      variables_fontsizemap: false,
      variables_lineheightrg: false,
      variables_floatinglabel: false,
      variables_colorsremoved: false,
      variables_colorsrenamed: false,
      variables_lineheigts: false,
      variables_lineheightlighter: false,
      variables_headingfontsizes: false,
      mixins_fontsizelineheight: false,
      classes_bgopacity: false,
      classes_secondary: false,
      classes_rtlmode: false,
      classes_sronly: false,
    },
    bootstrap: {
      alerts_closebuttoncontent: false,
      alerts_closebuttonclass: false,
      badges_classes: false,
      backgrounds_textcolor: false,
      blockquotes_footerstructure: false,
      blockquotes_qclass: false,
      buttons_outline: false,
      buttons_borderradius: false,
      buttons_borderradius2: false,
      buttons_invertedclass: false,
      buttons_iconclass: false,
      buttonclose_content: false,
      buttonclose_class: false,
      buttonclose_buttonclasses: false,
      cards_classes: false,
      forms_formlabelclass: false,
      forms_formgroup: false,
      forms_formtext: false,
      formcontrols_formfloatingwrapper: false,
      formcontrols_formfloatingcontrollgclass: false,
      formselects_formfloatingwrapper: false,
      formselects_classes: false,
      formselects_formfloatingselectlgclass: false,
      formtextareas_formfloatingwrapper: false,
      formtextareas_formfloatingcontrollgclass: false,
      formfiles_formfloatingwrapper: false,
      formfiles_formfloatingcontrollgclass: false,
      formcheckboxes_classes: false,
      formcheckboxes_validationclasses: false,
      formcheckboxes_validationfeedbackclasses: false,
      formradios_classes: false,
      formradios_validationclasses: false,
      formradios_validationfeedbackclasses: false,
      formswitches_classes: false,
      formswitches_labelclasses: false,
      formswitches_validationclasses: false,
      formswitches_validationfeedbackclasses: false,
    },
    ngbootstrap: {
      buttons_labelclass: false,
      buttons_inputclass: false,
      buttons_grouptoggleclass: false,
      datepickers_variables: false,
      modals_closebuttoncontent: false,
      modals_closebuttonclass: false,
    },
    jquery: {
      accordions_removed: false,
    },
    post: {
      accordions_removed: false,
      customselects_formfloatingwrapper: false,
      customselects_classes: false,
      customselects_menuclass: false,
      subnavigations_invertedclass: false,
      topicteasers_imageattributes: false,
      topicteasers_imagecontainergridclasses: false,
      topicteasers_contentcontainergridclasses: false,
      topicteasers_linklistfontcurve: false,
    },
  };

  constructor() {
    // Show deprecation warning if anybody still uses IE11
    this.isIE11 = window.navigator.userAgent.includes('Trident/7.0');

    const localStorageCheckboxes: Object =
      this.getLocaleStorage(this.migrationAccordionGroupedCheckboxesKey) ?? {};

    for (const groupKey in this.migrationAccordionGroupedCheckboxes) {
      const checkboxGroup = this.migrationAccordionGroupedCheckboxes[groupKey];
      const storageGroup = localStorageCheckboxes[groupKey] ?? {};

      for (const checkboxKey in checkboxGroup) {
        if (storageGroup[checkboxKey] !== undefined)
          checkboxGroup[checkboxKey] = storageGroup[checkboxKey];
      }
    }
  }

  get migrationTypeIntranetKey() {
    return HomeComponent.MIGRATION_TYPE_INTRANET_KEY;
  }

  get migrationTypeAngularKey() {
    return HomeComponent.MIGRATION_TYPE_ANGULAR_KEY;
  }

  get migrationAccordionKey() {
    return HomeComponent.MIGRATION_ACCORDION_KEY;
  }

  get migrationAccordionGroupedCheckboxesKey() {
    return HomeComponent.MIGRATION_ACCORDION_GROUPED_CHECKBOXES_KEY;
  }

  private versionFilterRegexes = {
    major: /^(?:(\d+)\.\d+\.\d+)/,
    minor: /^(?:\d+\.(\d+)\.\d+)/,
    patch: /^(?:\d+\.\d+\.(\d+))/,
    pre: /^(?:\d+\.\d+\.\d+[ .:,;!?_~`'"^*+\-=<>#&$%@|\/()[\]{}]?(.*))/,
    majorminor: /^(?:(\d+\.\d+)\.\d+)/,
    majorminorpatch: /^(\d+\.\d+\.\d+)/,
  };

  private versionFilterMap = {
    major: 'major',
    M: 'major',
    minor: 'minor',
    m: 'minor',
    pre: 'pre',
    majorminor: 'majorminor',
    Mm: 'majorminor',
    majorminorpatch: 'majorminorpatch',
    Mmp: 'majorminorpatch',
  };

  private getCleanVersion(version: string) {
    return version.replace(/^[^\d]+/, '');
  }

  public getVersion(version: string, filter: string = '') {
    const cleanVersion: string = this.getCleanVersion(version);

    if (filter) {
      const filterRegex = this.versionFilterRegexes[this.versionFilterMap[filter]];
      let matchArray: RegExpMatchArray = null;

      if (filterRegex) matchArray = cleanVersion.match(filterRegex);

      return matchArray !== null && matchArray[1] ? matchArray[1] : null;
    } else {
      return cleanVersion.length > 0 ? cleanVersion : version;
    }
  }

  // test

  private getLocaleStorage(key: string) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  public setLocaleStorage(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public getMigrationAccordionGroupedCheckboxesChecked(group = '') {
    const checkboxValues = Object.values(this.migrationAccordionGroupedCheckboxes[group] ?? {});
    const checkedValues = checkboxValues.filter(v => v === true);

    return `${checkedValues.length} of ${checkboxValues.length} done`;
  }

  public migrationAccordionChange($event: NgbPanelChangeEvent) {
    if ($event.nextState) {
      this.migrationAccordionActiveIds = Array.from(
        new Set(this.migrationAccordionActiveIds.concat($event.panelId)),
      );
    } else {
      this.migrationAccordionActiveIds = this.migrationAccordionActiveIds.filter(
        id => id !== $event.panelId,
      );
    }

    this.setLocaleStorage(this.migrationAccordionKey, this.migrationAccordionActiveIds);
  }

  public migrationAccordionGroupedCheckboxesChange() {
    this.setLocaleStorage(
      this.migrationAccordionGroupedCheckboxesKey,
      this.migrationAccordionGroupedCheckboxes,
    );
  }
}
