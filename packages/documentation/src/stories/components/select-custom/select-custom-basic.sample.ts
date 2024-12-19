import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

interface IOption {
  label: string;
  value: string;
  icon: number;
}

@Component({
  selector: 'app-custom-select-demo',
  templateUrl: './custom-select-demo.component.html',
})
export class CustomSelectDemoComponent {
  @ViewChildren('option', { read: ElementRef }) private optionList: QueryList<ElementRef>;

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
