/* tslint:disable:max-line-length */
import { FormSwitchDemoPageComponent } from './bootstrap/components/form-switch/form-switch-demo-page/form-switch-demo-page.component';
import { TopicTeaserDemoPageComponent } from './post-sample/components/topic-teaser/topic-teaser-demo-page/topic-teaser-demo-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntranetLayoutComponent } from './intranet-layout/intranet-layout.component';
import { AccordionDemoPageComponent } from './bootstrap/components/accordion/accordion-demo-page/accordion-demo-page.component';
import { AlertDemoPageComponent } from './bootstrap/components/alert/alert-demo-page/alert-demo-page.component';
import { BadgeDemoPageComponent } from './bootstrap/components/badge/badge-demo-page/badge-demo-page.component';
import { ButtonsDemoPageComponent } from './bootstrap/components/buttons/buttons-demo-page/buttons-demo-page.component';
import { ButtonGroupDemoPageComponent } from './bootstrap/components/button-group/button-group-demo-page/button-group-demo-page.component';
import { BlockquotesDemoPageComponent } from './bootstrap/components/blockquotes/blockquotes-demo-page/blockquotes-demo-page.component';
import { TablesDemoPageComponent } from './bootstrap/components/tables/tables-demo-page/tables-demo-page.component';
import { TypographyDemoPageComponent } from './bootstrap/components/typography/typography-demo-page/typography-demo-page.component';
import { FormsDemoPageComponent as BootstrapFormDemoPageComponent } from './bootstrap/components/forms/forms-demo-page/forms-demo-page.component';
import { NgbAlertDemoPageComponent } from './ng-bootstrap/components/alert/alert-demo-page/alert-demo-page.component';
import { NgbAccordionDemoPageComponent } from './ng-bootstrap/components/accordion/accordion-demo-page/accordion-demo-page.component';
import { NgbDatepickerDemoPageComponent } from './ng-bootstrap/components/datepicker/datepicker-demo-page/datepicker-demo-page.component';
import { NgbDropdownDemoPageComponent } from './ng-bootstrap/components/dropdown/dropdown-demo-page/dropdown-demo-page.component';
import { NgbPopoverDemoPageComponent } from './ng-bootstrap/components/popover/popover-demo-page/popover-demo-page.component';
import { NgbRatingDemoPageComponent } from './ng-bootstrap/components/rating/rating-demo-page/rating-demo-page.component';
import { NgbModalDemoPageComponent } from './ng-bootstrap/components/modal/modal-demo-page/modal-demo-page.component';
import { NgbCarouselDemoPageComponent } from './ng-bootstrap/components/carousel/carousel-demo-page/carousel-demo-page.component';
import { NgbTimepickerDemoPageComponent } from './ng-bootstrap/components/timepicker/timepicker-demo-page/timepicker-demo-page.component';
import { NgbPaginationDemoPageComponent } from './ng-bootstrap/components/pagination/pagination-demo-page/pagination-demo-page.component';
import { NgbCollapseDemoPageComponent } from './ng-bootstrap/components/collapse/collapse-demo-page/collapse-demo-page.component';
import { NgbProgressbarDemoPageComponent } from './ng-bootstrap/components/progressbar/progressbar-demo-page/progressbar-demo-page.component';
import { NgbTabsDemoPageComponent } from './ng-bootstrap/components/tabs/tabs-demo-page/tabs-demo-page.component';
import { NgbTooltipDemoPageComponent } from './ng-bootstrap/components/tooltip/tooltip-demo-page/tooltip-demo-page.component';
import { NgbTypeaheadDemoPageComponent } from './ng-bootstrap/components/typeahead/typeahead-demo-page/typeahead-demo-page.component';
import { FormRangeDemoPageComponent } from './bootstrap/components/form-range/form-range-demo-page/form-range-demo-page.component';
import { FormSelectDemoPageComponent } from './bootstrap/components/form-select/form-select-demo-page/form-select-demo-page.component';
import { FormSelectMultipleDemoPageComponent } from './bootstrap/components/form-select-multiple/form-select-multiple-demo-page/form-select-multiple-demo-page.component';
import { FormTextareaDemoPageComponent } from './bootstrap/components/form-textarea/form-textarea-demo-page/form-textarea-demo-page.component';
import { FormControlDemoPageComponent } from './bootstrap/components/form-control/form-control-demo-page/form-control-demo-page.component';
import { FormRadioDemoPageComponent } from './bootstrap/components/form-radio/form-radio-demo-page/form-radio-demo-page.component';
import { FormCheckDemoPageComponent } from './bootstrap/components/form-check/form-check-demo-page/form-check-demo-page.component';
import { FeedbackDemoPageComponent } from './post-sample/components/feedback/feedback-demo-page/feedback-demo-page.component';
import { IconsDemoPageComponent } from './post-sample/components/icons/icons-demo-page/icons-demo-page.component';
import { SpinnerDemoPageComponent } from './post-sample/components/spinner/spinner-demo-page/spinner-demo-page.component';
import { BackgroundDemoPageComponent } from './bootstrap/components/background/background-demo-page/background-demo-page.component';
import { SizingDemoPageComponent } from './post-sample/components/sizing/sizing-demo-page/sizing-demo-page.component';
import { NotificationOverlayPageComponent } from './post-sample/components/notification-overlay/notification-overlay-demo-page/notification-overlay-page.component';
import { SubnavigationDemoPageComponent } from './post-sample/components/subnavigation/subnavigation-demo-page/subnavigation-demo-page.component';
import { HomeComponent } from './home/home.component';
import { FormFileDemoPageComponent } from './bootstrap/components/form-file/form-file-demo-page/form-file-demo-page.component';
import { CardDemoPageComponent } from './bootstrap/components/card/card-demo-page/card-demo-page.component';
import { CustomSelectDemoPageComponent } from './post-sample/components/custom-select/custom-select-demo-page/custom-select-demo-page.component';
import { StepperDemoPageComponent } from './post-sample/components/stepper/stepper-demo-page/stepper-demo-page.component';
import { DatatableDemoPageComponent } from './post-sample/components/datatable/datatable-demo-page/datatable-demo-page.component';
import { FormsDemoPageComponent } from './post-sample/components/forms/forms-demo-page/forms-demo-page.component';
import { PostCardsDemoPageComponent } from './post-sample/components/post-cards/post-cards-demo-page/post-cards-demo-page.component';
import { LayoutContainerComponent } from './layout-container/layout-container.component';
import { IntranetHeaderDemoRegularComponent } from './intranet-layout/components/intranet-header-demo-regular/intranet-header-demo-regular.component';
import { IntranetHeaderDemoBigSidebarComponent } from './intranet-layout/components/intranet-header-demo-big-sidebar/intranet-header-demo-big-sidebar.component';
import { IntranetHeaderDemoSmallSidebarComponent } from './intranet-layout/components/intranet-header-demo-small-sidebar/intranet-header-demo-small-sidebar.component';
import { IntranetHeaderDemoCondensedComponent } from './intranet-layout/components/intranet-header-demo-condensed/intranet-header-demo-condensed.component';
/* tslint:enable:max-line-length */

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: LayoutContainerComponent,
    data: { fullWidth: true },
    children: [{ path: '', component: HomeComponent, data: { fullWidth: true } }],
  },

  {
    path: 'bootstrap-samples',
    component: LayoutContainerComponent,
    children: [
      { path: 'accordion', component: AccordionDemoPageComponent },
      { path: 'alerts', component: AlertDemoPageComponent },
      { path: 'background', component: BackgroundDemoPageComponent },
      { path: 'badge', component: BadgeDemoPageComponent },
      { path: 'blockquotes', component: BlockquotesDemoPageComponent },
      { path: 'buttons', component: ButtonsDemoPageComponent },
      { path: 'button-group', component: ButtonGroupDemoPageComponent },
      { path: 'tables', component: TablesDemoPageComponent },
      { path: 'typography', component: TypographyDemoPageComponent },
      { path: 'forms', component: BootstrapFormDemoPageComponent },
      { path: 'form-select', component: FormSelectDemoPageComponent },
      {
        path: 'form-multiple-select',
        component: FormSelectMultipleDemoPageComponent,
      },
      { path: 'form-textarea', component: FormTextareaDemoPageComponent },
      { path: 'form-control', component: FormControlDemoPageComponent },
      { path: 'form-range', component: FormRangeDemoPageComponent },
      { path: 'form-file', component: FormFileDemoPageComponent },
      { path: 'form-radio', component: FormRadioDemoPageComponent },
      { path: 'form-check', component: FormCheckDemoPageComponent },
      { path: 'form-switch', component: FormSwitchDemoPageComponent },
      {
        path: 'card',
        component: CardDemoPageComponent,
        data: { fullWidth: true },
      },
    ],
  },
  {
    path: 'ng-bootstrap-samples',
    component: LayoutContainerComponent,
    children: [
      { path: 'accordion', component: NgbAccordionDemoPageComponent },
      { path: 'rating', component: NgbRatingDemoPageComponent },
      { path: 'modal', component: NgbModalDemoPageComponent },
      { path: 'progressbar', component: NgbProgressbarDemoPageComponent },
      { path: 'alert', component: NgbAlertDemoPageComponent },
      { path: 'carousel', component: NgbCarouselDemoPageComponent },
      { path: 'popover', component: NgbPopoverDemoPageComponent },
      { path: 'collapse', component: NgbCollapseDemoPageComponent },
      { path: 'datepicker', component: NgbDatepickerDemoPageComponent },
      { path: 'dropdown', component: NgbDropdownDemoPageComponent },
      { path: 'pagination', component: NgbPaginationDemoPageComponent },
      {
        path: 'tabs',
        component: NgbTabsDemoPageComponent,
        data: { fullWidth: true },
      },
      { path: 'timepicker', component: NgbTimepickerDemoPageComponent },
      { path: 'tooltip', component: NgbTooltipDemoPageComponent },
      { path: 'typeahead', component: NgbTypeaheadDemoPageComponent },
    ],
  },
  {
    path: 'post-samples',
    component: LayoutContainerComponent,
    children: [
      { path: 'accordion', component: AccordionDemoPageComponent },
      { path: 'datatable', component: DatatableDemoPageComponent },
      { path: 'icons', component: IconsDemoPageComponent },
      { path: 'feedback', component: FeedbackDemoPageComponent },
      { path: 'spinner', component: SpinnerDemoPageComponent },
      { path: 'sizing', component: SizingDemoPageComponent },
      { path: 'card', component: PostCardsDemoPageComponent },
      {
        path: 'notification-overlay',
        component: NotificationOverlayPageComponent,
      },
      { path: 'subnavigation', component: SubnavigationDemoPageComponent },
      {
        path: 'topic-teaser',
        component: TopicTeaserDemoPageComponent,
        data: { fullWidth: true },
      },
      { path: 'custom-select', component: CustomSelectDemoPageComponent },
      { path: 'stepper', component: StepperDemoPageComponent },
      { path: 'forms', component: FormsDemoPageComponent },
      { path: 'intranet-layout', component: IntranetLayoutComponent, data: { fullWidth: true } },
    ],
  },

  {
    path: 'samples',
    children: [
      {
        path: 'intranet-layout-regular',
        component: IntranetHeaderDemoRegularComponent,
      },
      {
        path: 'intranet-layout-sidebar-big-sidebar',
        component: IntranetHeaderDemoBigSidebarComponent,
      },
      {
        path: 'intranet-layout-sidebar-small-sidebar',
        component: IntranetHeaderDemoSmallSidebarComponent,
      },
      {
        path: 'intranet-layout-condensed',
        component: IntranetHeaderDemoCondensedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 150],
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
