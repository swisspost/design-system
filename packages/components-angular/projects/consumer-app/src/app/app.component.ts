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
  PostLanguageMenuItem,
  PostLanguageMenu,
  PostLogo,
  PostMainnavigation,
  PostMegadropdown,
  PostMegadropdownTrigger,
} from 'components';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    PostBackToTop,
    PostBreadcrumbItem,
    PostBreadcrumbs,
    PostClosebutton,
    PostFooter,
    PostHeader,
    PostIcon,
    PostLanguageMenuItem,
    PostLanguageMenu,
    PostLogo,
    PostMainnavigation,
    PostMegadropdown,
    PostMegadropdownTrigger
],
})
export class AppComponent implements OnInit {
  title = 'consumer-app';
  public navigationRoutes: Route[] = [];

  // Shared links for megadropdown sections (Header)
  private megadropdownLinks = {
    standard: [
      { text: 'Letters Switzerland', url: '/sch' },
      { text: 'Small items abroad', url: '/kl' },
      { text: 'Goods abroad', url: '' },
      { text: 'Express and courier', url: '' },
    ],
    packages: [
      { text: 'Packages Switzerland', url: '/sch' },
      { text: 'Small items abroad', url: '/kl' },
      { text: 'Goods abroad', url: '' },
      { text: 'Express and courier', url: '' },
    ],
  };

  // Header megadropdown data
  public megadropdowns = [
    {
      id: 'letters',
      trigger: 'Letters',
      title: 'Letters title',
      overviewLink: '/letters',
      sections: [
        {
          id: 'send-letters',
          title: 'Send letters',
          links: this.megadropdownLinks.standard,
        },
        {
          id: 'step-by-step-letters',
          title: 'Step by step',
          titleLink: '/step-by-step',
          links: this.megadropdownLinks.packages,
        },
      ],
    },
    {
      id: 'packages',
      trigger: 'Packages',
      title: 'Packages title',
      overviewLink: '/packages',
      sections: [
        {
          id: 'send-packages',
          title: 'Send packages',
          links: this.megadropdownLinks.packages,
        },
        {
          id: 'step-by-step-packages',
          title: 'Step by step',
          titleLink: '/step-by-step',
          links: this.megadropdownLinks.packages,
        },
      ],
    },
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
    { name: 'Facebook', url: '#facebook', icon: 'facebook' },
    { name: 'Instagram', url: '#instagram', icon: 'instagram' },
    { name: 'Youtube', url: '#youtube', icon: 'youtube' },
    { name: 'Snapchat', url: '#snapchat', icon: 'snapchat' },
    { name: 'Twitter X', url: '#twitter-x', icon: 'twitterx' },
    { name: 'Linkedin', url: '#linkedin', icon: 'linkedin' },
    { name: 'Xing', url: '#xing', icon: 'xing' },
    { name: 'E-Mail', url: 'mailto:noreply@post.ch', icon: 'letter' },
  ];

  // Meta links (Footer)
  public metaLinks = [
    {
      text: 'Accessibility',
      url: 'https://www.post.ch/en/pages/footer/accessibility-at-swiss-post',
    },
    {
      text: 'General Terms and Conditions',
      url: 'https://www.post.ch/en/pages/footer/general-terms-and-conditions-gtc',
    },
    {
      text: 'Data protection and disclaimer',
      url: 'https://www.post.ch/en/pages/footer/data-protection-and-disclaimer',
    },
    { text: 'Publication details', url: 'https://www.post.ch/en/pages/footer/publication-details' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigationRoutes = this.router.config.filter(r => r.title);
  }
}
