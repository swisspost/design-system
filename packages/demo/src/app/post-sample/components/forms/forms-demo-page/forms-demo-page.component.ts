import { Component } from "@angular/core";

@Component({
  selector: "app-forms-demo-page",
  templateUrl: "./forms-demo-page.component.html",
  styleUrls: ["./forms-demo-page.component.scss"],
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
  verticalSpacing = `<div class="mb-regular">
  <label for="firstname">Firstname</label>
  <input type="text" id="firstname" class="form-control" placeholder="Firstname">
</div>
<div class="mb-regular">
  <label for="lastname">Lastname</label>
  <input type="text" id="lastname" class="form-control" placeholder="Lastname">
</div>`;
  buttons = `<div class="mb-regular">
  <label for="firstname">Firstname</label>
  <input type="text" id="firstname" class="form-control" placeholder="Firstname">
</div>
<div class="d-flex flex-row-reverse gap-mini">
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
  <div class="row">
    <div class="col">
      <div class="form-floating">
        <input type="text" id="firstname" class="form-control is-invalid" placeholder=" " required>
        <label class="form-label" for="firstname">Firstname</label>
        <p class="invalid-feedback">This field is required.</p>
      </div>
    </div>
    <div class="col">
      <div class="form-floating">
        <input type="text" id="lastname" class="form-control is-valid" placeholder=" " required value="Mustermann">
        <label class="form-label" for="lastname">Lastname</label>
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

  constructor() {}
}
