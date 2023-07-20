import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopicTeaserDemoPageComponent } from './components/topic-teaser/topic-teaser-demo-page/topic-teaser-demo-page.component';

import { HighlightModule } from 'ngx-highlightjs';
import { HighlightProvider } from '../common/highlight.provider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerI18n, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PostCommonModule } from '../common/post-common.module';
import {
  CustomDatepickerI18n,
  I18n,
} from '../ng-bootstrap/components/datepicker/datepicker-demo-page/datepicker-localization.service';
import { NgBootstrapComponentsModule } from '../ng-bootstrap/components/ng-bootstrap-components.module';
import { CustomSelectDemoPageComponent } from './components/custom-select/custom-select-demo-page/custom-select-demo-page.component';
import { CustomSelectDemoComponent } from './components/custom-select/custom-select-demo/custom-select-demo.component';
import { CustomSelectFloatingDemoComponent } from './components/custom-select/custom-select-floating-demo/custom-select-floating-demo.component';
import { DatatableDemoPageComponent } from './components/datatable/datatable-demo-page/datatable-demo-page.component';
import { DatatableDemoComponent } from './components/datatable/datatable-demo/datatable-demo.component';
import { DatatableEditableDemoComponent } from './components/datatable/datatable-editable-demo/datatable-editable-demo.component';
import { DatatableLoadingDemoComponent } from './components/datatable/datatable-loading-demo/datatable-loading-demo.component';
import { DatatablePaginatedDemoComponent } from './components/datatable/datatable-paginated-demo/datatable-paginated-demo.component';
import { FeedbackDemoPageComponent } from './components/feedback/feedback-demo-page/feedback-demo-page.component';
import { FeedbackDemoComponent } from './components/feedback/feedback-demo/feedback-demo.component';
import { FormsDemoPageComponent } from './components/forms/forms-demo-page/forms-demo-page.component';
import { IconsDemoPageComponent } from './components/icons/icons-demo-page/icons-demo-page.component';
import { SvgIconsDemoComponent } from './components/icons/svg-icons-demo/svg-icons-demo.component';
import { NotificationOverlayContentComponent } from './components/notification-overlay/notification-overlay-content/notification-overlay-content';
import { NotificationOverlayPageComponent } from './components/notification-overlay/notification-overlay-demo-page/notification-overlay-page.component';
import { NotificationOverlayDemoComponent } from './components/notification-overlay/notification-overlay/notification-overlay-demo.component';
import { PostCardButtonComponent } from './components/post-cards/post-card-button/post-card-button.component';
import { PostCardProductNavigationComponent } from './components/post-cards/post-card-product-navigation/post-card-product-navigation.component';
import { PostCardProductTeaserComponent } from './components/post-cards/post-card-product-teaser/post-card-product-teaser.component';
import { PostCardsDemoPageComponent } from './components/post-cards/post-cards-demo-page/post-cards-demo-page.component';
import { ResponsiveSizingDemoComponent } from './components/sizing/responsive-sizing-demo/responsive-sizing-demo.component';
import {
  RemoveSpacesPipe,
  ReplaceHyphenPipe,
} from './components/sizing/sizing-demo-page/sizing-demo-page-class-display.pipe';
import { SizingDemoPageComponent } from './components/sizing/sizing-demo-page/sizing-demo-page.component';
import { SizingDemoComponent } from './components/sizing/sizing-demo/sizing-demo.component';
import { SpacingDemoComponent } from './components/sizing/spacing-demo/spacing-demo.component';
import { SpinnerDemoPageComponent } from './components/spinner/spinner-demo-page/spinner-demo-page.component';
import { SpinnerDemoComponent } from './components/spinner/spinner-demo/spinner-demo.component';
import { SpinnerMiniDemoComponent } from './components/spinner/spinner-mini-demo/spinner-mini-demo.component';
import { StepperDemoInactiveNextStepComponent } from './components/stepper/stepper-demo-inactive-next-step/stepper-demo-inactive-next-step.component';
import { StepperDemoPageComponent } from './components/stepper/stepper-demo-page/stepper-demo-page.component';
import { StepperDemoComponent } from './components/stepper/stepper-demo/stepper-demo.component';
import { SubnavigationDemoPageComponent } from './components/subnavigation/subnavigation-demo-page/subnavigation-demo-page.component';
import { SubnavigationDemoComponent } from './components/subnavigation/subnavigation-demo/subnavigation-demo.component';
import { TopicTeaserDemoComponent } from './components/topic-teaser/topic-teaser-demo/topic-teaser-demo.component';
import { TopicTeaserRightDemoComponent } from './components/topic-teaser/topic-teaser-right-demo/topic-teaser-right-demo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PostCommonModule,
    NgBootstrapComponentsModule,
    NgbDatepickerModule,
    HighlightModule,
    NgxDatatableModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    SvgIconsDemoComponent,
    IconsDemoPageComponent,
    FeedbackDemoComponent,
    FeedbackDemoPageComponent,
    SpinnerDemoComponent,
    SpinnerDemoPageComponent,
    SpinnerMiniDemoComponent,
    SizingDemoComponent,
    SpacingDemoComponent,
    ResponsiveSizingDemoComponent,
    SizingDemoPageComponent,
    ReplaceHyphenPipe,
    RemoveSpacesPipe,
    NotificationOverlayPageComponent,
    NotificationOverlayDemoComponent,
    NotificationOverlayContentComponent,
    SubnavigationDemoComponent,
    PostCardsDemoPageComponent,
    PostCardButtonComponent,
    PostCardProductNavigationComponent,
    PostCardProductTeaserComponent,
    SubnavigationDemoPageComponent,
    SubnavigationDemoPageComponent,
    DatatableDemoComponent,
    DatatablePaginatedDemoComponent,
    DatatableEditableDemoComponent,
    DatatableLoadingDemoComponent,
    DatatableDemoPageComponent,
    TopicTeaserDemoComponent,
    TopicTeaserRightDemoComponent,
    TopicTeaserDemoPageComponent,
    CustomSelectDemoComponent,
    CustomSelectFloatingDemoComponent,
    CustomSelectDemoPageComponent,
    StepperDemoComponent,
    StepperDemoInactiveNextStepComponent,
    StepperDemoPageComponent,
    FormsDemoPageComponent,
  ],
  providers: [
    I18n,
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    HighlightProvider.Config,
  ],
  exports: [
    SvgIconsDemoComponent,
    IconsDemoPageComponent,
    FeedbackDemoComponent,
    FeedbackDemoPageComponent,
    PostCardsDemoPageComponent,
    CustomSelectDemoPageComponent,
    StepperDemoPageComponent,
  ],
})
export class PostSampleComponentsModule {}
