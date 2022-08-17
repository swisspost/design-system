import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HighlightModule} from 'ngx-highlightjs';
import {HighlightProvider} from '../../common/highlight.provider';

import {AccordionDemoComponent} from './accordion/accordion-demo/accordion-demo.component';
import {AccordionDetailsSummaryDemoComponent} from './accordion/accordion-details-summary-demo/accordion-details-summary-demo.component';
import {AccordionDemoPageComponent} from './accordion/accordion-demo-page/accordion-demo-page.component';
import {AlertDemoComponent} from './alert/alert-demo/alert-demo.component';
import {AlertDemoPageComponent} from './alert/alert-demo-page/alert-demo-page.component';
import {BadgeDemoPageComponent} from './badge/badge-demo-page/badge-demo-page.component';
import {BadgeDemoComponent} from './badge/badge-demo/badge-demo.component';
import {ButtonsDemoComponent} from './buttons/buttons-demo/buttons-demo.component';
import {ButtonsDemoPageComponent} from './buttons/buttons-demo-page/buttons-demo-page.component';
import {BlockquotesDemoComponent} from './blockquotes/blockquotes-demo/blockquotes-demo.component';
import {NestedBlockquotesDemoComponent} from './blockquotes/nested-blockquotes-demo/nested-blockquotes-demo.component';
import {BlockquotesDemoPageComponent} from './blockquotes/blockquotes-demo-page/blockquotes-demo-page.component';
import {FormSwitchDemoPageComponent} from "./form-switch/form-switch-demo-page/form-switch-demo-page.component";
import {FormSwitchDemoComponent} from "./form-switch/form-switch-demo/form-switch-demo.component";
import {ParagraphDemoComponent} from './paragraph/paragraph-demo/paragraph-demo.component';
import {ParagraphDemoPageComponent} from './paragraph/paragraph-demo-page/paragraph-demo-page.component';
import {TablesDemoComponent} from './tables/tables-demo/tables-demo.component';
import {TablesDemoPageComponent} from './tables/tables-demo-page/tables-demo-page.component';
import {TypographyDemoComponent} from './typography/typography-demo/typography-demo.component';
import {TypographyDemoPageComponent} from './typography/typography-demo-page/typography-demo-page.component';
import {FormsDemoComponent} from './forms/forms-demo/forms-demo.component';
import {FormsDemoPageComponent} from './forms/forms-demo-page/forms-demo-page.component';
import {FormSelectDemoComponent} from './form-select/form-select-demo/form-select-demo.component';
import {FormSelectDemoPageComponent} from './form-select/form-select-demo-page/form-select-demo-page.component';
import {FormSelectMultipleDemoComponent} from './form-select-multiple/form-select-multiple-demo/form-select-multiple-demo.component';
import {FormSelectMultipleDemoPageComponent} from './form-select-multiple/form-select-multiple-demo-page/form-select-multiple-demo-page.component';
import {FormTextareaDemoComponent} from './form-textarea/form-textarea-demo/form-textarea-demo.component';
import {FormTextareaDemoPageComponent} from './form-textarea/form-textarea-demo-page/form-textarea-demo-page.component';
import {FormControlDemoComponent} from './form-control/form-control-demo/form-control-demo.component';
import {FormControlDemoPageComponent} from './form-control/form-control-demo-page/form-control-demo-page.component';
import {FormRangeDemoComponent} from './form-range/form-range-demo/form-range-demo.component';
import {FormRangeCustomDemoModule} from './form-range/form-range-custom-demo/form-range-custom-demo.module';
import {FormRangeDemoPageComponent} from './form-range/form-range-demo-page/form-range-demo-page.component';
import {FormRadioDemoComponent} from './form-radio/form-radio-demo/form-radio-demo.component';
import {FormRadioDemoPageComponent} from './form-radio/form-radio-demo-page/form-radio-demo-page.component';
import {FormCheckDemoComponent} from './form-check/form-check-demo/form-check-demo.component';
import {FormCheckDemoPageComponent} from './form-check/form-check-demo-page/form-check-demo-page.component';
import {BackgroundDemoPageComponent} from './background/background-demo-page/background-demo-page.component';
import {BackgroundDemoComponent} from './background/background-demo/background-demo.component';
import {ToastDemoComponent} from './alert/toast-demo/toast-demo.component';
import {ActionAlertDemoComponent} from './alert/action-alert-demo/action-alert-demo.component';
import {OverlayNotificationDemoComponent} from './alert/overlay-notification-demo/overlay-notification-demo.component';
import {DotNotificationDemoComponent} from './alert/dot-notification-demo/dot-notification-demo.component';
import {ButtonNotificationDemoComponent} from './alert/button-notification-demo/button-notification-demo.component';
import {FormFileDemoComponent} from './form-file/form-file-demo/form-file-demo.component';
import {FormFileDemoPageComponent} from './form-file/form-file-demo-page/form-file-demo-page.component';
import {CardDemoComponent} from './card/card-demo/card-demo.component';
import {CardDemoPageComponent} from './card/card-demo-page/card-demo-page.component';
import {ComplexCardDemoComponent} from './card/complex-card-demo/complex-card-demo.component';
import {PostCardDemoComponent} from './card/post-card-demo/post-card-demo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CWFCommonModule} from 'src/app/common/cwf-common.module';
import {QuotesDemoComponent} from './blockquotes/quotes-demo/quotes-demo.component';
import { DefaultButtonsComponent } from './buttons/buttons-demo/default-buttons/default-buttons.component';
import { ButtonTagsComponent } from './buttons/buttons-demo/button-tags/button-tags.component';
import { ButtonSizesComponent } from './buttons/buttons-demo/button-sizes/button-sizes.component';
import { IconButtonsComponent } from './buttons/buttons-demo/icon-buttons/icon-buttons.component';
import { IconButtonsTextComponent } from './buttons/buttons-demo/icon-buttons-text/icon-buttons-text.component';
import { AnimatedButtonsComponent } from './buttons/buttons-demo/animated-buttons/animated-buttons.component';
import { AccentButtonsComponent } from './buttons/buttons-demo/accent-buttons/accent-buttons.component';
import { InvertedButtonsComponent } from './buttons/buttons-demo/inverted-buttons/inverted-buttons.component';
import { ContextualButtonsComponent } from './buttons/buttons-demo/contextual-buttons/contextual-buttons.component';
import { ButtonDisabledComponent } from './buttons/buttons-demo/button-disabled/button-disabled.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CWFCommonModule,
    HighlightModule,
    FormRangeCustomDemoModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AccordionDemoComponent,
    AccordionDetailsSummaryDemoComponent,
    AccordionDemoPageComponent,
    AlertDemoComponent,
    AlertDemoPageComponent,
    BadgeDemoPageComponent,
    BadgeDemoComponent,
    ButtonsDemoComponent,
    ButtonsDemoPageComponent,
    BlockquotesDemoComponent,
    NestedBlockquotesDemoComponent,
    BlockquotesDemoPageComponent,
    ParagraphDemoComponent,
    ParagraphDemoPageComponent,
    TablesDemoComponent,
    TablesDemoPageComponent,
    TypographyDemoComponent,
    TypographyDemoPageComponent,
    FormsDemoComponent,
    FormsDemoPageComponent,
    FormSelectDemoComponent,
    FormSelectDemoPageComponent,
    FormSelectMultipleDemoComponent,
    FormSelectMultipleDemoPageComponent,
    FormTextareaDemoComponent,
    FormTextareaDemoPageComponent,
    FormControlDemoComponent,
    FormControlDemoPageComponent,
    FormRangeDemoComponent,
    FormRangeDemoPageComponent,
    FormFileDemoComponent,
    FormFileDemoPageComponent,
    FormRadioDemoComponent,
    FormRadioDemoPageComponent,
    FormCheckDemoComponent,
    FormCheckDemoPageComponent,
    FormSwitchDemoComponent,
    FormSwitchDemoPageComponent,
    BackgroundDemoPageComponent,
    BackgroundDemoComponent,
    ToastDemoComponent,
    ActionAlertDemoComponent,
    OverlayNotificationDemoComponent,
    DotNotificationDemoComponent,
    ButtonNotificationDemoComponent,
    CardDemoComponent,
    CardDemoPageComponent,
    ComplexCardDemoComponent,
    PostCardDemoComponent,
    QuotesDemoComponent,
    DefaultButtonsComponent,
    ButtonTagsComponent,
    ButtonSizesComponent,
    IconButtonsComponent,
    IconButtonsTextComponent,
    AnimatedButtonsComponent,
    AccentButtonsComponent,
    InvertedButtonsComponent,
    ContextualButtonsComponent,
    ButtonDisabledComponent
  ],
  exports: [
    AlertDemoComponent,
    AlertDemoPageComponent,
    BadgeDemoPageComponent,
    BadgeDemoComponent,
    ButtonsDemoComponent,
    ButtonsDemoPageComponent,
    BlockquotesDemoComponent,
    BlockquotesDemoPageComponent,
    ParagraphDemoComponent,
    ParagraphDemoPageComponent,
    TablesDemoComponent,
    TablesDemoPageComponent,
    TypographyDemoComponent,
    TypographyDemoPageComponent,
    CardDemoPageComponent
  ],
  providers: [
    HighlightProvider.Config
  ]
})
export class BootstrapComponentsModule {
}

