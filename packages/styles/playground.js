const handleThemeAppearanceChange = () => {
  const theme = getTheme();
  const appearance = getAppearance();
  document.getElementById('styles').setAttribute('href', `src/${theme}-${appearance}.scss`);
};

const getAppearance = () => {
  return document.querySelector('#appearance-select').value;
};

const getTheme = () => {
  return document.querySelector('#theme-select').value;
};

// Change tokens
document
  .getElementById('appearance-select')
  .addEventListener('change', handleThemeAppearanceChange);
document.getElementById('theme-select').addEventListener('change', handleThemeAppearanceChange);

document.getElementById('scheme-select').addEventListener('change', e => {
  document.body.setAttribute('data-color-scheme', e.target.value);
});

