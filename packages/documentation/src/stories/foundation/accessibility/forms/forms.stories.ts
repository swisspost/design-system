import { StoryObj } from '@storybook/web-components';
import { MetaExtended } from '@root/types';
import { html } from 'lit';

const meta: MetaExtended = {
  id: 'cb34361c-7d3f-4c21-bb9c-874c73e82578',
  title: 'Foundations/Accessibility/Forms',
  parameters: {
    badges: [],
  },
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};

export const FormGoodExample: Story = {
  render: () => html`
    <form id="myForm" onsubmit="validateForm(event)" novalidate>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="firstname">Firstname</label>
          <input type="text" id="firstname" class="form-control" required />
          <div class="invalid-feedback">Please enter your firstname.</div>
        </div>
        <div class="col">
          <label class="form-label" for="lastname">Lastname</label>
          <input type="text" id="lastname" class="form-control" required />
          <div class="invalid-feedback">Please enter your lastname.</div>
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="phonenumber">Phone Number</label>
          <input type="tel" id="phonenumber" class="form-control" />
          <div class="invalid-feedback">Please enter your phone number.</div>
        </div>
        <div class="col">
          <label class="form-label" for="email">Email</label>
          <input type="email" id="email" class="form-control" required />
          <div class="invalid-feedback">Please enter a valid email address.</div>
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="address">Address</label>
          <input type="text" id="address" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="city">City</label>
          <input type="text" id="city" class="form-control" />
          <div class="invalid-feedback">Please enter your city.</div>
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="country">Country</label>
          <input type="text" id="country" class="form-control" />
          <div class="invalid-feedback">Please enter your country.</div>
        </div>
        <div class="col">
          <label class="form-label" for="zip">Zip</label>
          <input type="number" id="zip" class="form-control" />
          <div class="invalid-feedback">Please enter your zip code.</div>
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="question1">Random Question 1</label>
          <input type="text" id="question1" class="form-control" required />
          <div class="invalid-feedback">Please answer this question.</div>
        </div>
        <div class="col">
          <label class="form-label" for="question2">Random Question 2</label>
          <input type="text" id="question2" class="form-control" />
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="question3">Random Question 3</label>
          <input type="text" id="question3" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="question4">Random Question 4</label>
          <input type="text" id="question4" class="form-control" required />
          <div class="invalid-feedback">Please answer this question.</div>
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="terms" required />
            <label class="form-check-label" for="terms">
              I agree to the terms and conditions
            </label>
            <div class="invalid-feedback">You must agree to the terms and conditions.</div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row-reverse gap-mini">
        <button class="btn btn-primary" type="submit">Send</button>
      </div>
    </form>
    <script>
      function validateForm(event) {
        event.preventDefault();

        const form = document.getElementById('myForm');
        if (!form) return;

        // Get all required fields
        const requiredFields = form.querySelectorAll(
          'input[required], select[required], textarea[required]',
        );

        let firstInvalidField = null;

        // Check all required fields
        requiredFields.forEach(field => {
          if (
            (field.type === 'checkbox' && !field.checked) ||
            !field.value.trim() ||
            !field.validity.valid
          ) {
            field.classList.add('is-invalid');
            if (firstInvalidField === null) {
              firstInvalidField = field;
            }
          } else {
            field.classList.remove('is-invalid');
          }
        });

        // Scroll to first empty required field or submit form
        if (firstInvalidField !== null) {
          firstInvalidField.scrollIntoView({ behavior: 'smooth' });
        } else {
          submitForm();
        }
      }

      function submitForm() {
        const form = document.getElementById('myForm');
        if (!form) return;

        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        // Create loader element
        const loader = document.createElement('div');
        loader.classList.add('loader', 'loader-16', 'd-inline-block', 'me-1');
        loader.setAttribute('role', 'status');
        loader.setAttribute('aria-live', 'polite');
        loader.setAttribute('aria-hidden', 'true');

        // Simulate form submission (loader and button behavior)
        submitButton.innerHTML = 'Sending…'; // Replace inner text
        submitButton.appendChild(loader);

        setTimeout(function () {
          submitButton.innerHTML = 'Send';
          submitButton.removeChild(loader); // Remove loader
        }, 2000);
      }
    </script>
  `,
};

export const FormBadExample: Story = {
  render: () => html` <form id="myBadForm" onsubmit="submitBadForm(event)" novalidate>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="firstname">Firstname</label>
          <input type="text" id="firstname" class="form-control" required />
        </div>
        <div class="col">
          <label class="form-label" for="lastname">Lastname</label>
          <input type="text" id="lastname" class="form-control" required />
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="phonenumber">Phone Number</label>
          <input type="tel" id="phonenumber" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="email">Email</label>
          <input type="email" id="email" class="form-control" required />
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="address">Address</label>
          <input type="text" id="address" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="city">City</label>
          <input type="text" id="city" class="form-control" />
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="country">Country</label>
          <input type="text" id="country" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="zip">Zip</label>
          <input type="number" id="zip" class="form-control" />
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="question1">Random Question 1</label>
          <input type="text" id="question1" class="form-control" required />
        </div>
        <div class="col">
          <label class="form-label" for="question2">Random Question 2</label>
          <input type="text" id="question2" class="form-control" />
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <label class="form-label" for="question3">Random Question 3</label>
          <input type="text" id="question3" class="form-control" />
        </div>
        <div class="col">
          <label class="form-label" for="question4">Random Question 4</label>
          <input type="text" id="question4" class="form-control" required />
        </div>
      </div>
      <div class="row mb-regular">
        <div class="col">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="termsBad" required />
            <label class="form-check-label" for="termsBad">
              I agree to the terms and conditions
            </label>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row-reverse gap-mini">
        <button class="btn btn-primary" type="submit" disabled>Send</button>
      </div>
    </form>
    <script>
      function validateBadForm() {
        const form = document.getElementById('myBadForm');
        if (!form) return;

        const requiredFields = form.querySelectorAll(
          'input[required], select[required], textarea[required]',
        );

        const submitButton = form.querySelector('button[type="submit"]');
        if (!submitButton) return;

        let allFieldsFilled = true;

        requiredFields.forEach(field => {
          if (field instanceof HTMLInputElement && field.type === 'checkbox') {
            if (!field.checked) {
              allFieldsFilled = false;
            }
          } else if (
            field instanceof HTMLInputElement &&
            (!field.value.trim() || !field.validity.valid)
          ) {
            allFieldsFilled = false;
          }
        });

        // Enable button if all required fields are filled
        if (allFieldsFilled) {
          submitButton.removeAttribute('disabled');
        } else {
          submitButton.setAttribute('disabled', 'disabled');
        }
      }

      function submitBadForm(event) {
        event.preventDefault();
      }

      function addInputChangeListener() {
        document.addEventListener('DOMContentLoaded', function () {
          // Add event listeners to call validateBadForm() on input change
          const form = document.getElementById('myBadForm');
          if (!form) return;

          const formInputs = form.querySelectorAll('input, select, textarea');
          formInputs.forEach(input => {
            input.addEventListener('input', validateBadForm);
          });
        });
      }

      addInputChangeListener();
    </script>`,
};


export const FieldsetDontExample: Story = {
  render: () => html`<fieldset>
  <div>
    <legend>Gender</legend>
     <input type="radio" name="gender" value="male"> Male
     <input type="radio" name="gender" value="female"> Female
  </div>
</fieldset>`,
};



export const FieldsetDoExample: Story = {
  render: () => html`<fieldset>
  <legend>Gender</legend>
  <input type="radio" name="gender" value="male"> Male
  <input type="radio" name="gender" value="female"> Female
</fieldset>`,
};




export const DivForGroupingExample: Story = {
  render: () => html`<div role="group" aria-labelledby="group-label">
  <span id="group-label">Gender</span>
  <input type="radio" name="gender" value="male"> Male
  <input type="radio" name="gender" value="female"> Female
</div>`,
};