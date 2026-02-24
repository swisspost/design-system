import { Component } from '@angular/core';

@Component({
    selector: 'samples-sidebar-with-searchbar',
    templateUrl: './sidebar-with-searchbar.component.html',
    standalone: false
})
export class SamplesSidebarWithSearchbarComponent {
  title = 'samples-sidebar-with-searchbar';
  protected openedMenu: boolean = false;
}
