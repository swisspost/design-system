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

  // Header megadropdown data
  public megadropdowns = [
    {
      id: 'letters',
      trigger: 'Letters',
      title: 'Letters title',
      overviewLink: '/letters',
      sections: [
        {
          title: 'Send letters',
          links: [
            { text: 'Letters Switzerland', url: '/sch' },
            { text: 'Small items abroad', url: '/kl' },
            { text: 'Goods abroad', url: '' },
            { text: 'Express and courier', url: '' },
          ]
        },
        {
          title: 'Step by step',
          titleLink: '/step-by-step',
          links: [
            { text: 'Packages Switzerland', url: '/sch' },
            { text: 'Small items abroad', url: '/kl' },
            { text: 'Goods abroad', url: '' },
            { text: 'Express and courier', url: '' },
          ]
        }
      ]
    },
    {
      id: 'packages',
      trigger: 'Packages',
      title: 'Packages title',
      overviewLink: '/packages',
      sections: [
        {
          title: 'Send packages',
          links: [
            { text: 'Packages Switzerland', url: '/sch' },
            { text: 'Small items abroad', url: '/kl' },
            { text: 'Goods abroad', url: '' },
            { text: 'Express and courier', url: '' },
          ]
        },
        {
          title: 'Step by step',
          titleLink: '/step-by-step',
          links: [
            { text: 'Packages Switzerland', url: '/sch' },
            { text: 'Small items abroad', url: '/kl' },
            { text: 'Goods abroad', url: '' },
            { text: 'Express and courier', url: '' },
          ]
        }
      ]
    }
  ];

  // Reusable links array for footer grids
  public footerLinks = [
    { text: 'Link 1', url: '#test' },
    { text: 'Link 2', url: '#test' },
    { text: 'Link 3', url: '#test' },
    { text: 'Link 4', url: '#test' },
    { text: 'Link 5', url: '#test' },
    { text: 'Link 6', url: '#test' },
    { text: 'Link 7', url: '#test' },
    { text: 'Link 8', url: '#test' },
  ];

  // Footer grid sections metadata
  public footerGrids = [
    { slot: 'grid-1', title: 'Title 1', linkCount: 6 },
    { slot: 'grid-2', title: 'Title 2', linkCount: 8 },
    { slot: 'grid-3', title: 'Title 3', linkCount: 8 },
    { slot: 'grid-4', title: 'Title 4', linkCount: 5 },
  ];

  // Social media links (Footer)
  public socialMediaLinks = [
    { name: 'Facebook', url: '#facebook', icon: '8004' },
    { name: 'Instagram', url: '#instagram', icon: '8007' },
    { name: 'Youtube', url: '#youtube', icon: '8002' },
    { name: 'Snapchat', url: '#snapchat', icon: '8017' },
    { name: 'Titter X', url: '#twitter-x', icon: '8000' },
    { name: 'Linkedin', url: '#linkedin', icon: '8005' },
    { name: 'Xing', url: '#xing', icon: '8001' },
    { name: 'E-Mail', url: 'mailto:noreply@post.ch', icon: 'letter' },
  ];

  // Meta links (Footer)
  public metaLinks = [
    { text: 'Accessibility', url: 'https://www.post.ch/en/pages/footer/accessibility-at-swiss-post' },
    { text: 'General Terms and Conditions', url: 'https://www.post.ch/en/pages/footer/general-terms-and-conditions-gtc' },
    { text: 'Data protection and disclaimer', url: 'https://www.post.ch/en/pages/footer/data-protection-and-disclaimer' },
    { text: 'Publication details', url: 'https://www.post.ch/en/pages/footer/publication-details' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigationRoutes = this.router.config.filter(r => r.title);
  }
}
