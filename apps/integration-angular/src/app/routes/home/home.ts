import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PostAccordion,
  PostAccordionItem,
  PostAutocomplete,
  PostAvatar,
  PostBanner,
  PostClosebutton,
  PostCollapsible,
  PostCollapsibleTrigger,
  PostDatePicker,
  PostIcon,
  PostLinkarea,
  PostListbox,
  PostListboxOption,
  PostMenu,
  PostMenuItem,
  PostMenuTrigger,
  PostNumberInput,
  PostPagination,
  PostPopover,
  PostPopovercontainer,
  PostPopoverTrigger,
  PostProgressbar,
  PostRating,
  PostSideNavigation,
  PostSideNavigationTrigger,
  PostStepper,
  PostStepperItem,
  PostTabItem,
  PostTabPanel,
  PostTabs,
  PostTogglebutton,
  PostTooltip,
  PostTooltipTrigger,
} from '@swisspost/design-system-components-angular';

@Component({
  selector: 'home-page',
  templateUrl: './home.html',
  imports: [
    PostAccordion,
    PostAccordionItem,
    PostAutocomplete,
    PostAvatar,
    PostBanner,
    PostClosebutton,
    PostCollapsible,
    PostCollapsibleTrigger,
    PostDatePicker,
    PostIcon,
    PostLinkarea,
    PostListbox,
    PostListboxOption,
    PostMenu,
    PostMenuItem,
    PostMenuTrigger,
    PostNumberInput,
    PostPagination,
    PostPopover,
    PostPopovercontainer,
    PostPopoverTrigger,
    PostProgressbar,
    PostRating,
    PostSideNavigation,
    PostSideNavigationTrigger,
    PostStepper,
    PostStepperItem,
    PostTabItem,
    PostTabPanel,
    PostTabs,
    PostTogglebutton,
    PostTooltip,
    PostTooltipTrigger,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class Home {
  isCollapsed = false;

  formControl = new FormControl('France');

  log(something: unknown) {
    console.log(something);
  }
}
