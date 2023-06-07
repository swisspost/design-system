
import {Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ngb-alert-demo',
  templateUrl: './alert-demo.component.html'
})
export class NgbAlertDemoComponent {
  @Input()
  public alerts: Array<IAlert> = [];

  public visibleFixedAlert: boolean = true;

  public backup: Array<IAlert>;

  @Output() setArray: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.alerts.push({
      type: 'success',
      title: 'Success',
      message: 'This is an success alert'
    }, {
      type: 'info',
      title: 'This is an info alert'
    }, {
      type: 'warning',
      title: 'This is a warning alert'
    }, {
      type: 'danger',
      title: 'Danger (same as error)',
      message: 'This is a danger alert'
    }, {
      type: 'error',
      title: 'This is an error alert (same as danger)'
    },{
      type: 'primary',
      title: 'Primary (same as notification)',
      message: 'This is a primary alert'
    }, {
      type: 'notification',
      title: 'Notification (same as primary)',
      message: 'This is a notification alert'
    }, {
      type: 'primary',
      title: 'Alert without icon (added class "no-icon")',
      class: 'no-icon'
    }, {
      type: 'primary',
      title: 'With special icon (White)',
      message: 'The corresponding post-icon must be added to the alert with the <code>.alert-icon</code> class.',
      icon: 2063
    }, {
      type: 'info',
      title: 'With special icon (Black)',
      message: 'The corresponding post-icon must be added to the alert with the <code>.alert-icon</code> class.',
      icon: 1001
    }, {
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
  type: string;
  title: string;
  message?: string;
  class?: string;
  icon?: number;
}
