export function validateForm() {
  const form = document.getElementById('myForm') as HTMLFormElement;
  if (!form) return;

  //get all required fields
  const requiredFields = form.querySelectorAll<HTMLInputElement>(
    'input[required], select[required], textarea[required]',
  );

  let firstInvalidField: HTMLInputElement | null = null;

  //check all required fields
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

  //scroll to first empty required field or submit form
  if (firstInvalidField !== null) {
    (firstInvalidField as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  } else {
    submitForm();
  }
}

function submitForm() {
  const form = document.getElementById('myForm');
  if (!form) return;

  const submitButton = form.querySelector('button[type="submit"]');
  if (!submitButton) return;

  // loader
  const loader = document.createElement('div');
  loader.classList.add('loader', 'loader-16', 'd-inline-block', 'me-1');
  loader.setAttribute('role', 'status');
  loader.setAttribute('aria-live', 'polite');
  loader.setAttribute('aria-hidden', 'true');

  // Disable submit button
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.innerHTML = 'Sending…'; // Replace inner text
  submitButton.appendChild(loader); // Add loader

  // Simulate form submission
  setTimeout(function () {
    // Re-enable submit button and reset its content
    submitButton.removeAttribute('disabled');
    submitButton.innerHTML = 'Send';
  }, 2000);
}
