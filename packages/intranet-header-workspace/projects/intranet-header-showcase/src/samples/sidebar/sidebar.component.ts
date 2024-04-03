import { Component } from '@angular/core';

@Component({
  selector: 'samples-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SamplesSidebarComponent {
  title = 'samples-sidebar';
  protected openedMenu: boolean = false;
}
