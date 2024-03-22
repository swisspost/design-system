['focusin', 'focusout', 'input'].forEach(t =>
  document.addEventListener(t, e => {
    if (!(e.target instanceof Element) || e.target.nodeName !== 'input') return;

    const parent = e.target.parentElement;

    if (!parent?.classList.contains('radio-button-card')) return;

    switch (e.type) {
      case 'focusin':
        parent.classList.add('focused');
        break;
      case 'focusout':
        parent.classList.remove('focused');
        break;
      case 'input':
        parent.classList.toggle('checked', (e.target as HTMLInputElement).checked);
        break;
    }
  }),
);
