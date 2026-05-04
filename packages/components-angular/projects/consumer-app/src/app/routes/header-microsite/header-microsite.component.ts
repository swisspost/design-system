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
  selector: 'header-microsite-page',
  templateUrl: './header-microsite.component.html',
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
export class HeaderMicrositeComponent {}
