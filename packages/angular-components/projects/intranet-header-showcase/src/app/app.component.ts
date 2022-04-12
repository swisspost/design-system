import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'intranet-header-showcase';
  public loginOptions = null;
  public headerOptions = null;
  public count = 0;
}
