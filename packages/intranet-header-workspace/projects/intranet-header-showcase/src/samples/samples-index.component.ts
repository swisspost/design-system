import { Component } from '@angular/core';

@Component({
  selector: 'samples-index',
  template: `
    <ul>
      <li><a href="samples-navigation">Samples navigation</a></li>
      <li><a href="samples-navigation-with-condensed-header">Samples navigation with condensed header</a></li>
      <li><a href="samples-sidebar">Samples sidebar</a></li>
      <li><a href="samples-sidebar-with-searchbar">Samples sidebar with searchbar</a></li>
    </ul>
  `,
})
export class SamplesIndexComponent {}
