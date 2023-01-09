import icons from './svg/icons.json' assert { type: 'json' };

document.addEventListener('alpine:init', () => {
  Alpine.data('icons', () => ({ icons }));
});
