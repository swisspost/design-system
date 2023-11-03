import { Component, OnInit, Input } from '@angular/core';
import { CustomSelectDemoComponent } from '../custom-select-demo/custom-select-demo.component';

@Component({
  selector: 'app-custom-select-floating-demo',
  templateUrl: './custom-select-floating-demo.component.html',
})
export class CustomSelectFloatingDemoComponent extends CustomSelectDemoComponent implements OnInit {
  @Input() public noSelected: boolean = false;

  public infoText: string = '';

  ngOnInit() {
    if (!this.noSelected) this.selectedOption = this.options[0];

    this.infoText = this.noSelected ? `(no selected)` : '';
  }
}
