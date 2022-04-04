import {Component, OnInit} from '@angular/core';
import {CustomSelectDemoComponent} from '../custom-select-demo/custom-select-demo.component';

@Component({
  selector: 'app-custom-select-floating-demo',
  templateUrl: './custom-select-floating-demo.component.html'
})
export class CustomSelectFloatingDemoComponent extends CustomSelectDemoComponent implements OnInit {
  ngOnInit() {
    this.selectedOption = this.options[0];
  }
}
