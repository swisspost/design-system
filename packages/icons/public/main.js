import icons from './report.json' assert { type: 'json' };

document.addEventListener('alpine:init', () => {
  console.log('now');
  Alpine.data('icons', () => ({ icons }));
});
