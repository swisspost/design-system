import { Component } from '@angular/core';

@Component({
  selector: 'post-stepper',
  templateUrl: 'template.html',
})
export class StepperDemoComponent {
  steps = ['Sender', 'Product', 'Other details', 'Order summary'];
  currentIndex = 2;

  isCurrent(step: string): boolean {
    return step === this.steps[this.currentIndex];
  }

  getPathTo(step: string): string {
    return step.toLowerCase().split(' ').join('-');
  }
}
