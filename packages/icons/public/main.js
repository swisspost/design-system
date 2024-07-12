import icons from './report.json' with { type: 'json' };

document.addEventListener('alpine:init', () => {
  Alpine.data('icons', () => ({ icons }));
});
