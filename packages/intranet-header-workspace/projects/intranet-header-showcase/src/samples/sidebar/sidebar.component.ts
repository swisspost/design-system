import { Component } from '@angular/core';

/* eslint-disable @angular-eslint/prefer-standalone */
@Component({
  selector: 'samples-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: false,
})
export class SamplesSidebarComponent {
  title = 'samples-sidebar';
  protected openedMenu: boolean = false;
}
