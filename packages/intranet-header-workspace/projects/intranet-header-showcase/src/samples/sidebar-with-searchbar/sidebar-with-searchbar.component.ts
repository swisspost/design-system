import { Component } from '@angular/core';

/* eslint-disable @angular-eslint/prefer-standalone */
@Component({
  selector: 'samples-sidebar-with-searchbar',
  templateUrl: './sidebar-with-searchbar.component.html',
  standalone: false,
})
export class SamplesSidebarWithSearchbarComponent {
  title = 'samples-sidebar-with-searchbar';
  protected openedMenu: boolean = false;
}
