import icons from './icons.json' assert { type: 'json' };
import noIcons from './no-svgs.json' assert { type: 'json' };

document.addEventListener('alpine:init', () => {
  Alpine.data('icons', () => ({ icons }));
  Alpine.data('noIcons', () => ({ noIcons }));
});
