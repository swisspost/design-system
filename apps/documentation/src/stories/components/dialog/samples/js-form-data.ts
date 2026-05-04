document.querySelector('#example-dialog-form')?.addEventListener('submit', event => {
  if (!event.target) return;
  const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement)); // Object containing your form data
  console.log(formData);
});
