// Change tokens
document.getElementById('channel-select').addEventListener('change', e => {
  document.getElementById('channel').setAttribute('href', `src/tokens/_${e.target.value}.scss`);
});

document.getElementById('theme-select').addEventListener('change', e => {
  document.getElementById('theme').setAttribute('href', `src/tokens/_${e.target.value}-theme.scss`);
  document
    .getElementById('palettes')
    .setAttribute('href', `src/palettes/${e.target.value}-palettes.scss`);
});

document.getElementById('scheme-select').addEventListener('change', e => {
  document.body.setAttribute('data-color-scheme', e.target.value);
});
