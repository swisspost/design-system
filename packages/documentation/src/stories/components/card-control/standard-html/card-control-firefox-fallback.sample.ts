document.addEventListener('input', e => {
  if (!(e.target instanceof Element) || e.target.nodeName !== 'input') return;

  const parent = e.target.parentElement;

  if (
    parent?.classList.contains('checkbox-button-card') ||
    parent?.classList.contains('radio-button-card')
  ) {
    parent.classList.toggle('checked', (e.target as HTMLInputElement).checked);
  }
});
