import { Component } from '@angular/core';

/* eslint-disable @angular-eslint/prefer-standalone */
@Component({
  selector: 'samples-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: false,
})
export class SamplesNavigationComponent {
  title = 'samples-navigation';
  public headerOptions = null;
  public count = 0;
}
