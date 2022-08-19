import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-svg-icons-demo',
  templateUrl: './svg-icons-demo.component.html',
  styleUrls: ['./svg-icons-demo.component.scss']
})
export class SvgIconsDemoComponent {
  packageName : string = "@swisspost/design-system-styles";
  cwfImport : string = `@use "${this.packageName}/cwf";`;

  colors = ["primary", "white", "success", "warning", "danger"];
  preColored = ["success", "warn", "info", "error-black", "error-red"];

  range: number[] = [];

  constructor() {
    for(var i=1000;i<1050;i++) {
      this.range.push(i);
    }
    for(var i=2000;i<2196;i++) {
      this.range.push(i);
    }
    this.range.push(3000);
    for(var i=3020;i<3051;i++) {
      this.range.push(i);
    }
    for(var i=3064;i<3177;i++) {
      this.range.push(i);
    }
    for(var i=3184;i<3261;i++) {
      this.range.push(i);
    }
    for(var i=8000;i<8020;i++) {
      this.range.push(i);
    }
    for(var i=9900;i<9912;i++) {
      this.range.push(i);
    }

    var excludes = []
    this.range = this.range.filter(nr => excludes.findIndex(x => x === nr) === -1)
  }
}
