import { Component } from '@angular/core';
const badgeTemplate = require('!!raw-loader!../badge-demo/badge-demo.component.html').default;
const badgeNestedTemplate =
  require('!!raw-loader!../badge-nested-demo/badge-nested-demo.component.html').default;
const badgeInteractiveTemplate =
  require('!!raw-loader!../badge-interactive-demo/badge-interactive-demo.component.html').default;

@Component({
  selector: 'app-badge-demo-page',
  templateUrl: './badge-demo-page.component.html',
})
export class BadgeDemoPageComponent {
  badgeTemplate = badgeTemplate;
  badgeNestedTemplate = badgeNestedTemplate;
  badgeInteractiveTemplate = badgeInteractiveTemplate;
}
