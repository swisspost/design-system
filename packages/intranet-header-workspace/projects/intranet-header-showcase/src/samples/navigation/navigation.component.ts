import { Component } from '@angular/core';

@Component({
  selector: 'samples-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class SamplesNavigationComponent {
  title = 'samples-navigation';
  public headerOptions = null;
  public count = 0;
}
