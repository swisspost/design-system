import { Component } from '@angular/core';
import {
  PostAccordion,
  PostAccordionItem,
  PostAvatar,
  PostBanner,
  PostCardControl,
  PostCollapsibleTrigger,
  PostCollapsible,
  PostIcon,
  PostLogo,
  PostPopover,
  PostPopovercontainer,
  PostRating,
  PostTabs,
  PostTabItem,
  PostTabPanel,
  PostTooltipTrigger,
} from 'components';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    PostAccordion,
    PostAccordionItem,
    PostAvatar,
    PostBanner,
    PostCardControl,
    PostCollapsibleTrigger,
    PostCollapsible,
    PostIcon,
    PostLogo,
    PostPopover,
    PostPopovercontainer,
    PostRating,
    PostTabs,
    PostTabItem,
    PostTabPanel,
    PostTooltipTrigger,
  ]
})

export class HomeComponent {
  isCollapsed = false;
}
