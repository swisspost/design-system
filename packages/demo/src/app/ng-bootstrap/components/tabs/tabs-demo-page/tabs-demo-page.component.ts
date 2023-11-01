import { Component } from '@angular/core';
const codeTemplate = require('!!raw-loader!../tabs-demo/tabs-demo.component.html').default;
const defaultSnippet = require('!!raw-loader!../snippets/tabs-default.html').default;
const darkBgSnippet = require('!!raw-loader!../snippets/tabs-dark-background.html').default;
const lightBgSnippet = require('!!raw-loader!../snippets/tabs-light-background.html').default;
const colorBgSnippet = require('!!raw-loader!../snippets/tabs-color-on-white.html').default;
const containerSnippet = require('!!raw-loader!../snippets/tabs-inside-container.html').default;
@Component({
  selector: 'app-ngb-tabs-demo-page',
  templateUrl: './tabs-demo-page.component.html',
  styleUrls: ['./tabs-demo-page.component.scss'],
})
export class NgbTabsDemoPageComponent {
  codeTemplate = codeTemplate;
  defaultSnippet = defaultSnippet;
  darkBgSnippet = darkBgSnippet;
  lightBgSnippet = lightBgSnippet;
  colorBgSnippet = colorBgSnippet;
  containerSnippet = containerSnippet;
}
