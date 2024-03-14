export function validateBadForm() {
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

  //enable button if all required fields are filled
  if (allFieldsFilled) {
    submitButton.removeAttribute('disabled');
  } else {
    submitButton.setAttribute('disabled', 'disabled');
  }
}

export function addInputChangeListener() {
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
