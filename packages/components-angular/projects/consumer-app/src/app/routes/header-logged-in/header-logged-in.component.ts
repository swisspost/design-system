import { Component } from '@angular/core';
import {
  PostAvatar,
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
  PostMenu,
  PostMenuItem,
  PostMenuTrigger,
} from 'components';

@Component({
  selector: 'header-logged-in-page',
  templateUrl: './header-logged-in.component.html',
  standalone: true,
  imports: [
    PostAvatar,
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
    PostMenu,
    PostMenuItem,
    PostMenuTrigger,
  ],
})
export class HeaderLoggedInComponent {}
