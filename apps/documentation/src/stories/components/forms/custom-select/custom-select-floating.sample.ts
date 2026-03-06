import { Component, ElementRef, QueryList, ViewChildren, OnInit, Input } from '@angular/core';

interface IOption {
  label: string;
  value: string;
  icon: number;
}

@Component({
  selector: 'app-custom-select-floating-demo',
  templateUrl: './custom-select-floating-demo.component.html',
})
export class CustomSelectFloatingDemoComponent implements OnInit {
  @ViewChildren('option', { read: ElementRef }) private optionList: QueryList<ElementRef>;

  @Input() public noSelected: boolean = false;

  public infoText: string = '';

  ngOnInit() {
    if (!this.noSelected) this.selectedOption = this.options[0];

    this.infoText = this.noSelected ? `(no selected)` : '';
  }

  public options: IOption[];
  public selectedOption: IOption;

  constructor() {
    this.options = [
      {
        label: 'One',
        value: '1',
        icon: 3126,
      },
      {
        label: 'Two',
        value: '2',
        icon: 3116,
      },
      {
        label: 'Three',
        value: '3',
        icon: 3107,
      },
    ];
  }

  public setFocus(event: KeyboardEvent) {
    const activeOptionIndex = Array.from(this.optionList).findIndex(option => {
      return option.nativeElement.classList.contains('active');
    });

    switch (event.code) {
      case 'Space':
      case 'Enter':
        const currentOption = this.optionList.get(activeOptionIndex) || this.optionList.get(0);
        setTimeout(() => currentOption.nativeElement.focus(), 100);
        break;
      case 'ArrowUp':
        const previousOption = this.optionList.get(activeOptionIndex + 1) || this.optionList.get(0);
        setTimeout(() => previousOption.nativeElement.focus());
        break;
      case 'ArrowDown':
        const nextOption = this.optionList.get(activeOptionIndex + 1) || this.optionList.get(0);
        setTimeout(() => nextOption.nativeElement.focus());
        break;
    }
  }
}
