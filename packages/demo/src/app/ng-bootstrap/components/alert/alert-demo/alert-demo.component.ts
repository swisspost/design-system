
import {Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ngb-alert-demo',
  templateUrl: './alert-demo.component.html',
  styleUrls: ['./alert-demo.component.scss']
})
export class NgbAlertDemoComponent {
  @Input()
  public alerts: Array<IAlert> = [];

  public visibleFixedAlert: boolean = true;

  public backup: Array<IAlert>;

  @Output() setArray: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.alerts.push({
      id: 1,
      type: 'success',
      title: 'Success',
      message: 'This is an success alert',
      class: ''
    }, {
      id: 2,
      type: 'info',
      title: 'This is an info alert',
      class: ''
    }, {
      id: 3,
      type: 'warning',
      title: 'This is a warning alert',
      class: ''
    }, {
      id: 4,
      type: 'danger',
      title: 'Danger',
      message: 'This is a danger alert',
      class: ''
    },{
      id: 6,
      type: 'primary',
      title: 'Primary',
      message: 'This is a primary alert',
      class: ''
    }, {
      id: 8,
      type: 'primary',
      title: 'Alert without icon (added class "no-icon")',
      class: 'no-icon'
    }, {
      id: 9,
      type: 'primary',
      title: 'With special icon',
      message: 'Icon needs to be extended in sass.',
      class: 'pi-2063-white'
    }, {
      id: 10,
      type: 'info',
      title: 'With special icon',
      message: 'Just add the "pi"-class to the alert.',
      class: 'pi-1001'
    }, {
      id: 11,
      type: 'primary',
      title: 'Fixed alert',
      message: 'Alert that is fixed to the bottom of the page.',
      class: 'alert-fixed-bottom'
    });
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  public reset() {
    this.alerts = this.backup.map((alert: IAlert) => Object.assign({}, alert));
    this.visibleFixedAlert = true;
  }
}

export interface IAlert {
  id: number;
  title?: string;
  type: string;
  message?: string;
  class: string;
}
