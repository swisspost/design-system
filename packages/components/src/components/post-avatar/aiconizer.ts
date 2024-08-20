const ACTIVATOR = 'avatar';
const ICONIZER = {
  gallileo: '2136',
  home: '3136',
  love: '2586',
  postman: '1007',
  potter: '2493',
  ra: '2199',
  rocket: '2383',
  sido: '2397',
  smart: '2165',
  stamp: '1022',
  ux: '2198',
  workout: '2555',
};
let input1 = '';
let input2 = '';

function aiconizer(e) {
  if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

  if (input1 !== ACTIVATOR) {
    input1 = (input1 + e.key).substring(Math.max(0, (input1 + e.key).length - ACTIVATOR.length));
  } else {
    input2 = (input2 + e.key).substring(Math.max(0, (input2 + e.key).length - 10));
    const match = Object.entries(ICONIZER).find(([k]) => input2.includes(k));

    if (input2.includes('help')) {
      const keys = Object.keys(ICONIZER)
        .map(k => `"${k}"`)
        .join(', ');

      console.log(
        `%cCongrats, you have found an easter egg!%c\nClick in an empty area of the page and type:\n%c"${ACTIVATOR}"%c\nAnd then one of the following phrases:\n%c${keys}%c\nThis will let the post-avatar component display different icons.\nHave fun!`,
        'font-size: 20px; font-weight: bold;',
        'font-size: unset; font-weight: normal;',
        'font-weight: bold; color: red;',
        'font-weight: normal; color: unset;',
        'font-weight: bold; color: red;',
        'font-weight: normal; color: unset;',
      );

      input1 = '';
      input2 = '';
    }

    if (match) {
      Array.from(document.querySelectorAll('post-avatar')).forEach(el => {
        const postIcon = document.createElement('post-icon');
        postIcon.setAttribute('name', match[1]);

        el.shadowRoot.querySelector('img')?.remove();
        el.shadowRoot.querySelector('div')?.remove();
        el.shadowRoot.querySelector('post-icon')?.remove();
        el.shadowRoot.append(postIcon);

        setTimeout(() => {
          input1 = '';
          input2 = '';
        });
      });
    }
  }
}

function register() {
  window.removeEventListener('keydown', aiconizer);
  window.addEventListener('keydown', aiconizer);
}

function destroy() {
  window.removeEventListener('keydown', aiconizer);
}

export default {
  register,
  destroy,
};
