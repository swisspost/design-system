import { Component } from '@angular/core';
import {
  PostAccordion,
  PostAccordionItem,
  PostCardControl,
  PostCollapsibleTrigger,
  PostCollapsible,
  PostIcon,
  PostLogo,
  PostPopover,
  PostPopovercontainer,
  PostRating,
  PostTabs,
  PostTabHeader,
  PostTabPanel,
  PostTooltipTrigger,
  PostTooltip
} from 'components';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  standalone: true,
imports: [
  PostAccordion,
  PostAccordionItem,
  PostCardControl,
  PostCollapsibleTrigger,
  PostCollapsible,
  PostIcon,
  PostLogo,
  PostPopover,
  PostPopovercontainer,
  PostRating,
  PostTabs,
  PostTabHeader,
  PostTabPanel,
  PostTooltipTrigger,
  PostTooltip
]})

export class HomeComponent {
  isCollapsed = false;
}
