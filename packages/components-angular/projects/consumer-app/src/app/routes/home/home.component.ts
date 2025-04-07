import { Component } from '@angular/core';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    standalone: false
})
export class HomeComponent {
  isCollapsed = false;
}
