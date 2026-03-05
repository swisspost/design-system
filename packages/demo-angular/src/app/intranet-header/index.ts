import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'post-samples-index',
  imports: [
    RouterLink,
  ],
  template: `
    <div class="container my-large">
      <h1>Intranet Header Samples</h1>
      <div class="list-group">
        <a routerLink="./default-navigation" class="list-group-item list-group-item-action">Intranet header with navigation</a>
        <a routerLink="./condensed-navigation" class="list-group-item list-group-item-action">Intranet header with condensed navigation</a>
        <a routerLink="./sidebar" class="list-group-item list-group-item-action">Intranet header with  sidebar</a>
        <a routerLink="./search-and-sidebar" class="list-group-item list-group-item-action">Intranet header with search and sidebar</a>
      </div>
    </div>
  `
})
export class Index {

}
