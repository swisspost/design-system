import { Component } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  standalone: false,
})
export class HomeComponent {
  String2String: string = 'whatever';
  Boolean2String: boolean = true;
  Object2String = { id: '1', name: 'test' };
  Array2String: string[] = ['item1', 'item2', 'item3'];
  String2Boolean: string = 'whatever';
  Number2Boolean: number = 123;
  Object2Boolean: object = { id: '1', name: 'test' };
  Array2Boolean: string[] = ['item1', 'item2', 'item3'];

  ngOnInit() {
    console.log(Array.isArray(this.Array2String));
    console.log('String2String', typeof this.String2String);
    console.log('Boolean2String', typeof this.Boolean2String);
    console.log('Object2String', typeof this.Object2String);
    console.log('Array2String', typeof this.Array2String);
    console.log('String2Boolean', typeof this.String2Boolean);
    console.log('Number2Boolean', typeof this.Number2Boolean);
    console.log('Object2Boolean', typeof this.Object2Boolean);
    console.log('Array2Boolean', typeof this.Array2Boolean);
  }
}
