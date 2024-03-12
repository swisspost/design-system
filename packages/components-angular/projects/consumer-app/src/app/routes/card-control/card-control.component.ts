import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostComponentsModule } from 'components';

@Component({
  standalone: true,
  selector: 'card-control-page',
  templateUrl: './card-control.component.html',
  imports: [CommonModule, ReactiveFormsModule, PostComponentsModule],
})
export class CardControlComponent {
  public radioOptions = ['option_1', 'option_2', 'option_3', 'option_4'];

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
