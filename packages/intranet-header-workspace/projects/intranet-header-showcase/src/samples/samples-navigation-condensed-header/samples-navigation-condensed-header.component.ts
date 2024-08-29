import { Component } from '@angular/core';

@Component({
  selector: 'app-samples-navigation-condensed-header',
  templateUrl: './samples-navigation-condensed-header.component.html',
  styleUrl: './samples-navigation-condensed-header.component.scss',
})
export class SamplesNavigationCondensedHeaderComponent {
  title = 'samples-navigation-condensed-header';
  public headerOptions = null;
  public count = 0;
}
