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
  selector: 'header-jobs-page',
  templateUrl: './header-jobs.component.html',
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
export class HeaderJobsComponent {}
