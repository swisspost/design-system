import { Component } from '@angular/core';
const codeTemplateBasic =
  require('!!raw-loader!../blockquotes-demo/blockquotes-demo.component.html').default;
const codeTemplateNested =
  require('!!raw-loader!../nested-blockquotes-demo/nested-blockquotes-demo.component.html').default;
const codeTemplateQuotes =
  require('!!raw-loader!../quotes-demo/quotes-demo.component.html').default;

@Component({
  selector: 'app-blockquotes-demo-page',
  templateUrl: './blockquotes-demo-page.component.html',
})
export class BlockquotesDemoPageComponent {
  codeTemplateBasic = codeTemplateBasic;
  codeTemplateNested = codeTemplateNested;
  codeTemplateQuotes = codeTemplateQuotes;
}
