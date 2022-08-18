
import {Component} from '@angular/core';
const codeTemplate = require('!!raw-loader!../notification-overlay-content/notification-overlay.content.html').default;


@Component({
  selector: 'app-nofitication-overlay-demo-page',
  templateUrl: './notification-overlay-page.component.html'
})
export class NotificationOverlayPageComponent  {
  codeTemplate = codeTemplate;
}
