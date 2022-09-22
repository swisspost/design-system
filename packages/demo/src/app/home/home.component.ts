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
        variables_isolatecomponents: false,
        variables_fontsizemap: false,
        variables_lineheightrg: false,
        variables_floatinglabel: false,
        variables_socialmediacolors: false,
        variables_options: false,
        variables_colors: false,
        variables_lineheigts: false,
        variables_lineheightlighter: false,
        variables_headingfontsizes: false,
        mixins_fontsizelineheight: false,
        classes_bgopacity: false,
        classes_secondary: false,
        classes_textauto: false,
        properites_rtlmode: false
      },
      bootstrap: {
        alerts_fixedbottom: false,
        alerts_closebuttoncontent: false,
        alerts_close: false,
        badges_classes: false,
        backgrounds_textcolor: false,
        blockquotes_footerstructure: false,
        blockquotes_qclass: false,
        buttons_outline: false,
        buttons_borderradius: false,
        buttons_borderradius2: false,
        buttons_invertedclass: false,
        buttons_iconclass: false,
        cards_classes: false,
        forms_formgroup: false,
        forms_formtext: false,
        formcontrols_formlabelclass: false,
        formcontrols_formfloatingwrapper: false,
        formcontrols_formfloatingcontrollgclass: false,
        formselects_formfloatingwrapper: false,
        formselects_classes: false,
        formselects_formfloatingselectlgclass: false,
        formselectmultiples_classes: false,
        formtextareas_formfloatingwrapper: false,
        formtextareas_formfloatingcontrollgclass: false,
        formranges_formlabelclass: false,
        formfiles_formlabelclass: false,
        formfiles_formfloatingwrapper: false,
        formfiles_formfloatingcontrollgclass: false,
        formcheckboxes_classes: false,
        formcheckboxes_validationclasses: false,
        formcheckboxes_validationfeedbackclasses: false,
        formradios_classes: false,
        formradios_validationclasses: false,
        formradios_validationfeedbackclasses: false
      },
      ngbootstrap: {
        buttons_labelclass: false,
        buttons_inputclass: false,
        buttons_grouptoggleclass: false,
        datepickers_variables: false,
        modals_closebuttoncontent: false,
        modals_close: false
      },
      post: {
        accordions_wrapper: false,
        accordions_summaryclasses: false,
        accordions_classes: false,
        customselects_classes: false,
        customselects_menuclass: false,
        sizings_paddingsleftright: false,
        subnavigations_invertedclass: false,
        formswitches_classes: false,
        formswitches_labelclasses: false,
        formswitches_validationclasses: false,
        formswitches_validationfeedbackclasses: false,
        formswitches_switchtoggleclass: false,
        topicteasers_imageattributes: false,
        topicteasers_imagecontainergridclasses: false,
        topicteasers_contentcontainergridclasses: false,
        topicteasers_linklistfontcurve: false
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
      matchArray = cleanVersion.match(/^(?:(\d+)\.\d+\.\d+)/);
    } else if (filter === 'minor' || filter === 'm') {
      matchArray = cleanVersion.match(/^(?:\d+\.(\d+)\.\d+)/);
    } else if (filter === 'patch' || filter === 'p') {
      matchArray = cleanVersion.match(/^(?:\d+\.\d+\.(\d+))/);
    } else if (filter === 'pre') {
      matchArray = cleanVersion.match(/^(?:\d+\.\d+\.\d+[\W]?(.*))$/);
    } else if (filter === 'majorminor' || filter === 'Mm') {
      matchArray = cleanVersion.match(/^(?:(\d+\.\d+)\.\d+)/)
    } else if (filter === 'majorminorpatch' || filter === 'Mmp') {
      matchArray = cleanVersion.match(/^(\d+\.\d+\.\d+)/)
    }

    if (filter) {
      return matchArray !== null && matchArray[1] ? matchArray[1] : null;
    } else {
      return cleanVersion.length > 0 ? cleanVersion : version;
    }
  }

  // test

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
