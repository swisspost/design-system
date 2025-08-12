import { Component } from '@angular/core';
import { POST_COMPONENTS } from 'components';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [...POST_COMPONENTS]
})
export class HomeComponent {
  isCollapsed = false;
}