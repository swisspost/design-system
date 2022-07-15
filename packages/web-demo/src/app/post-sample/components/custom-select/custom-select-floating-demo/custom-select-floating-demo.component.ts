import {Component, OnInit, Input} from '@angular/core';
import {CustomSelectDemoComponent} from '../custom-select-demo/custom-select-demo.component';

@Component({
  selector: 'app-custom-select-floating-demo',
  templateUrl: './custom-select-floating-demo.component.html'
})
export class CustomSelectFloatingDemoComponent extends CustomSelectDemoComponent implements OnInit {
  @Input() public noOptions: boolean = false;
  @Input() public noSelected: boolean = false;

  public infoText: string = '';

  ngOnInit() {
    if (this.noOptions) this.options = [];
    if (!this.noSelected) this.selectedOption = this.options[0];

    const info = [].concat(this.noOptions ? 'no options' : null, this.noSelected ? 'no selected' : null).filter(i => i !== null);
    this.infoText = info.length > 0 ? `(${info})` : '';
  }
}
