import { Component } from '@angular/core';
import {
  PostBackToTop,
  PostBreadcrumbItem,
  PostBreadcrumbs,
  PostFooter,
  PostHeader,
  PostIcon,
  PostLanguageMenu,
  PostLanguageMenuItem,
  PostLogo,
  PostMainnavigation,
  PostMegadropdown,
  PostMegadropdownTrigger,
  PostMenuItem,
} from 'components';

@Component({
  selector: 'header-portal-page',
  templateUrl: './header-portal.component.html',
  standalone: true,
  imports: [
    PostBackToTop,
    PostBreadcrumbItem,
    PostBreadcrumbs,
    PostFooter,
    PostHeader,
    PostIcon,
    PostLanguageMenu,
    PostLanguageMenuItem,
    PostLogo,
    PostMainnavigation,
    PostMegadropdown,
    PostMegadropdownTrigger,
    PostMenuItem,
  ],
})
export class HeaderPortalComponent {}
