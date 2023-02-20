import icons from './report.json' assert { type: 'json' };

document.addEventListener('alpine:init', () => {
  Alpine.data('icons', () => ({ icons }));
});
