import { Component } from '@angular/core';

@Component({
  selector: 'app-forms-demo-page',
  templateUrl: './forms-demo-page.component.html',
})
export class FormsDemoPageComponent {
  container = '<div class="container">...</div>';
  basicInput = `<label class="form-label" for="firstname">Firstname</label>
<input type="text" id="firstname" class="form-control">`;
  rowSimple = `<div class="row row-cols-1 row-cols-md-2">
  <div class="col">
    <label class="form-label" for="firstname">Firstname</label>
    <input type="text" id="firstname" class="form-control">
  </div>
  <div class="col">
    <label class="form-label" for="lastname">Lastname</label>
    <input type="text" id="lastname" class="form-control">
  </div>
</div>`;
  colSimple = `<div class="row">
  <div class="col-8">
    <label class="form-label" for="city">City</label>
    <input type="text" id="city" class="form-control">
  </div>
  <div class="col-4">
    <label class="form-label" for="state">State</label>
    <input type="text" id="state" class="form-control">
  </div>
</div>`;
  customWidth = `<div class="row">
  <div class="col-auto">
    <label class="form-label" for="zip">Zip</label>
    <input type="number" id="zip" class="form-control" placeholder="Zip" style="max-width: 11ch">
  </div>
  <div class="form-label" class="col">
    <label for="city">City</label>
    <input type="text" id="city" class="form-control" placeholder="City">
  </div>
</div>`;
  verticalSpacing = `<div class="mb-16">
  <label for="firstname">Firstname</label>
  <input type="text" id="firstname" class="form-control" placeholder="Firstname">
</div>
<div class="mb-16">
  <label for="lastname">Lastname</label>
  <input type="text" id="lastname" class="form-control" placeholder="Lastname">
</div>`;
  buttons = `<div class="mb-16">
  <label for="firstname">Firstname</label>
  <input type="text" id="firstname" class="form-control" placeholder="Firstname">
</div>
<div class="d-flex flex-row-reverse gap-8">
  <button class="btn btn-primary">Send</button>
  <button class="btn btn-secondary">Cancel</button>
</div>`;
  floatingLabels = `<div class="row">
  <div class="col">
    <div class="form-floating">
      <input type="text" id="firstname" class="form-control" placeholder=" ">
      <label class="form-label" for="firstname">Firstname</label>
    </div>
  </div>
  <div class="col">
    <div class="form-floating">
      <input type="text" id="lastname" class="form-control" placeholder=" ">
      <label class="form-label" for="lastname">Lastname</label>
    </div>
  </div>
</div>`;
  validation = `<form action="/" class="was-validated">
  <!-- Form Control -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input
          id="FormControlInvalid"
          type="text"
          class="form-control is-invalid"
          placeholder=" "
          required
        />
        <label class="form-label" for="FormControlInvalid">Invalid Input</label>
        <p class="invalid-feedback">Error message</p>
      </div>
    </div>
    <div class="col">
      <div class="form-floating">
        <input
          id="FormControlValid"
          type="text"
          class="form-control is-valid"
          placeholder=" "
          value="Value"
        />
        <label class="form-label" for="FormControlValid">Valid Input</label>
        <p class="valid-feedback">Success message (optional)</p>
      </div>
    </div>
  </div>

  <!-- Form Select -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <select id="FormSelectInvalid" class="form-select is-invalid" required></select>
        <label class="form-label" for="FormSelectInvalid">Invalid Select</label>
        <p class="invalid-feedback">Error message</p>
      </div>
    </div>
    <div class="col">
      <div class="form-floating">
        <select id="FormSelectValid" class="form-select is-valid">
          <option disabled>Select one..</option>
          <option value="1">Value 1</option>
          <option value="2">Value 2</option>
        </select>
        <label class="form-label" for="FormSelectValid">Valid Select</label>
        <p class="valid-feedback">Success message (optional)</p>
      </div>
    </div>
  </div>

  <!-- Form Select Multiple-->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <select
          id="FormSelectMultipleInvalid"
          class="form-select is-invalid"
          multiple
          required
        ></select>
        <label class="form-label" for="FormSelectMultipleInvalid">
          Invalid Select Multiple
        </label>
        <p class="invalid-feedback">Error message</p>
      </div>
    </div>
    <div class="col">
      <div class="form-floating">
        <select id="FormSelectMultipleValid" class="form-select is-valid" multiple>
          <option value="1">Value 1</option>
          <option value="2">Value 2</option>
        </select>
        <label class="form-label" for="FormSelectMultipleValid">Valid Select Multiple</label>
        <p class="valid-feedback">Success message (optional)</p>
      </div>
    </div>
  </div>

  <!-- Form File -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input id="FormFileInvalid" type="file" class="form-control is-invalid" required />
        <label class="form-label" for="FormFileInvalid">Invalid File</label>
        <p class="invalid-feedback">Error message</p>
      </div>
    </div>
    <div class="col">
      <div class="form-floating">
        <input id="FormFileValid" type="file" class="form-control is-valid" />
        <label class="form-label" for="FormFileValid">Valid File</label>
        <p class="valid-feedback">Success message (optional)</p>
      </div>
    </div>
  </div>

  <!-- Form Textarea -->
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <textarea
          id="FormTextareaInvalid"
          type="text"
          class="form-control is-invalid"
          placeholder=" "
          required
        ></textarea>
        <label class="form-label" for="FormTextareaInvalid">Invalid Textarea</label>
        <p class="invalid-feedback">Error message</p>
      </div>
    </div>
    <div class="col">
      <div class="form-floating">
        <textarea
          id="FormTextareaValid"
          type="text"
          class="form-control is-valid"
          placeholder=" "
        >
Value</textarea
        >
        <label class="form-label" for="FormTextareaValid">Valid Textarea</label>
        <p class="valid-feedback">Success message (optional)</p>
      </div>
    </div>
  </div>

  <!-- Form Checkbox -->
  <div class="row">
    <div class="col">
      <div class="form-check">
        <input class="form-check-input is-invalid" id="FormCheckboxInvalid" type="checkbox" />
        <label class="form-check-label" for="FormCheckboxInvalid">Invalid Checkbox</label>
        <p class="invalid-feedback">Error message</p>
      </div>
    </div>
    <div class="col">
      <div class="form-check">
        <input
          class="form-check-input is-valid"
          id="FormCheckboxValid"
          type="checkbox"
          checked
        />
        <label class="form-check-label" for="FormCheckboxValid">Valid Checkbox</label>
        <p class="valid-feedback">Success message (optional)</p>
      </div>
    </div>
  </div>

  <!-- Form Radio -->
  <div class="row">
    <div class="col">
      <div class="form-check">
        <input class="form-check-input is-invalid" id="FormRadioInvalid" type="radio" />
        <label class="form-check-label" for="FormRadioInvalid">Invalid Radio</label>
        <p class="invalid-feedback">Error message</p>
      </div>
    </div>
    <div class="col">
      <div class="form-check">
        <input class="form-check-input is-valid" id="FormRadioValid" type="radio" checked />
        <label class="form-check-label" for="FormRadioValid">Valid Radio</label>
        <p class="valid-feedback">Success message (optional)</p>
      </div>
    </div>
  </div>

  <!-- Form Range -->
  <div class="row">
    <div class="col">
      <label class="form-label" for="FormRangeInvalid">Invalid Range</label>
      <input class="form-range is-invalid" id="FormRangeInvalid" type="range" />
      <p class="invalid-feedback">Error message</p>
    </div>
    <div class="col">
      <label class="form-label" for="FormRangeValid">Valid Range</label>
      <input class="form-range is-valid" id="FormRangeValid" type="range" />
      <p class="valid-feedback">Success message (optional)</p>
    </div>
  </div>

  <!-- Form Switch -->
  <div class="row">
    <div class="col">
      <div class="form-check form-switch">
        <input
          id="FormSwitchInvalid"
          class="form-check-input is-invalid"
          type="checkbox"
          role="switch"
        />
        <label class="form-check-label" for="FormSwitchInvalid">Invalid Switch</label>
        <p class="invalid-feedback">Error message</p>
      </div>
    </div>
    <div class="col">
      <div class="form-check form-switch">
        <input
          id="FormSwitchValid"
          class="form-check-input is-valid"
          type="checkbox"
          role="switch"
          checked
        />
        <label class="form-check-label" for="FormSwitchValid">Valid Switch</label>
        <p class="valid-feedback">Success message (optional)</p>
      </div>
    </div>
  </div>
</form>`;
  hints = `<div class="form-floating">
  <input type="text" id="firstname" aria-labelledby="firstname-hint" class="form-control" placeholder=" ">
  <label class="form-label" for="firstname">Firstname</label>
  <div id="firstname-hint" class="form-text">
    <i class="pi pi-info" aria-hidden="true"></i>
    <span>Also provide any middle names in this field</span>
  </div>
</div>`;
}
