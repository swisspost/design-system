import { Component, OnInit } from '@angular/core';
const  templateCode = require('!!raw-loader!../tables-demo/tables-demo.component.html').default
@Component({
  selector: 'app-tables-demo-page',
  templateUrl: './tables-demo-page.component.html'
})
export class TablesDemoPageComponent {
  templateCode = templateCode;
}
