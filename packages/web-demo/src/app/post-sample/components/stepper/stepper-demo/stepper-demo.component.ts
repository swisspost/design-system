import {Component} from '@angular/core';

@Component({
  selector: 'app-stepper-demo',
  templateUrl: 'stepper-demo.component.html'
})
export class StepperDemoComponent {
  steps = ['Sender', 'Product', 'Other details', 'Order summary'];
  currentIndex = 2;

  getPathTo(step: string) {
    return step.toLowerCase().split(' ').join('-');
  }

}
