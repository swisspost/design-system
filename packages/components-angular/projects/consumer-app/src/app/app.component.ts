import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet, RouterLink } from '@angular/router';
import {
  PostBackToTop,
  PostBreadcrumbItem,
  PostBreadcrumbs,
  PostClosebutton,
  PostFooter,
  PostHeader,
  PostIcon,
  PostLanguageOption,
  PostLanguageSwitch,
  PostList,
  PostListItem,
  PostLogo,
  PostMainnavigation,
  PostMegadropdown,
  PostMegadropdownTrigger,
  PostTogglebutton,
} from 'components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    PostBackToTop,
    PostBreadcrumbItem,
    PostBreadcrumbs,
    PostClosebutton,
    PostFooter,
    PostHeader,
    PostIcon,
    PostLanguageOption,
    PostLanguageSwitch,
    PostList,
    PostListItem,
    PostLogo,
    PostMainnavigation,
    PostMegadropdown,
    PostMegadropdownTrigger,
    PostTogglebutton,
  ]
})
export class AppComponent implements OnInit {
  title = 'consumer-app';
  public navigationRoutes: Route[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigationRoutes = this.router.config.filter(r => r.title);
  }
}
