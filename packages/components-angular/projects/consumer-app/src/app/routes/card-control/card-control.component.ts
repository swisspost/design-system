import { Component } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  PostCardControl,
  PostCardControlCheckboxValueAccessorDirective,
  PostCardControlRadioValueAccessorDirective,
} from 'components';

@Component({
  selector: 'card-control-page',
  templateUrl: './card-control.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PostCardControl,
    PostCardControlCheckboxValueAccessorDirective,
    PostCardControlRadioValueAccessorDirective,
  ],
})
export class CardControlComponent {
  public radioOptions = ['option_1', 'option_2', 'option_3', 'option_4', 'option_5'];

  formBuilderForm = this.formBuilder.group({
    checkbox: [null, Validators.requiredTrue],
    nativeCheckbox: [null, Validators.requiredTrue],
    radio: [null, Validators.required],
    nativeRadio: [null, Validators.required],
  });

  constructor(private formBuilder: FormBuilder) {}

  get formBuilderFormValue() {
    return JSON.stringify(this.formBuilderForm.value, null, 2);
  }

  formBuilderFormOnSubmit(e: any) {
    console.log(Array.from((new FormData(e.target) as any).entries()));
  }
}
