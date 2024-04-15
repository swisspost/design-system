import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-icons-demo',
  templateUrl: './svg-icons-demo.component.html',
  styleUrls: ['./svg-icons-demo.component.scss'],
})
export class SvgIconsDemoComponent {
  packageName: string = '@swisspost/design-system-styles';
  cwfImport: string = `@use "${this.packageName}/core" as post;`;

  colors = ['primary', 'white', 'success', 'warning', 'error'];
  preColored = ['success', 'warn', 'info', 'error-black', 'error-red'];

  range: number[] = [];

  constructor() {
    for (let i = 1000; i < 1050; i++) {
      this.range.push(i);
    }
    for (let i = 2000; i < 2196; i++) {
      this.range.push(i);
    }
    this.range.push(2307);
    this.range.push(2308);
    this.range.push(3000);
    for (let i = 3020; i < 3051; i++) {
      this.range.push(i);
    }
    for (let i = 3064; i < 3177; i++) {
      this.range.push(i);
    }
    for (let i = 3184; i < 3261; i++) {
      this.range.push(i);
    }
    for (let i = 8000; i < 8020; i++) {
      this.range.push(i);
    }
    for (let i = 9900; i < 9912; i++) {
      this.range.push(i);
    }
  }
}
