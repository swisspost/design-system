import { Component } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  standalone: false,
})
export class HomeComponent {
  firstname: boolean = true;
  lastname: object = { id: '1', name: 'test' };
  test: boolean = true;

  ngOnInit() {
    console.log('Firstname', typeof this.firstname);
    console.log('Lastname', typeof this.lastname);
    console.log('Test', typeof this.test);
  }
}
