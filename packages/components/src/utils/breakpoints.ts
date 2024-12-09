type Callback = (value: string) => void;
type getType = 'breakpoint' | 'name';

const BREAKPOINT_MAP = {
  xs: 'mobile',
  sm: 'tablet',
  md: 'tablet',
  lg: 'desktop',
  xl: 'desktop',
} as const;
const BREAKPOINT_MAP_KEYS = Object.keys(BREAKPOINT_MAP);
const ELEMENT_ID = 'PostBreakpoints';

const keyCallbacks = [];
const nameCallbacks = [];

let breakpoint = null;
let nextBreakpoint = null;
let name = null;
let nextName = null;

(function setup() {
  let wrapper: HTMLDivElement = document.querySelector(`#${ELEMENT_ID}`);

  if (!wrapper) {
    const children = Object.entries(BREAKPOINT_MAP).map(([bp, n], i) => {
      const nextBreakpointKey = BREAKPOINT_MAP_KEYS[i + 1];
      const prev = i > 0 ? 'd-none' : '';
      const next = nextBreakpointKey ? `d-${nextBreakpointKey}-none` : '';
      const classes = [prev, `d-${bp}-block`, next].filter(c => c).join(' ');

      return `<div class="${classes}" data-breakpoint="${bp}" data-name="${n}"></div>`;
    });

    wrapper = document.createElement('div');
    wrapper.id = ELEMENT_ID;
    wrapper.innerHTML = children.join('');
    document.body.appendChild(wrapper);

    window.addEventListener('resize', () => update());
  }
})();

function get(type: getType) {
  const testElement = Array.from(document.querySelectorAll(`#${ELEMENT_ID} > div`)).find(
    (el: HTMLDivElement) => el.offsetParent !== null,
  );

  return testElement?.getAttribute(`data-${type}`);
}

function update(runCallbacks = true) {
  nextBreakpoint = get('breakpoint');
  nextName = get('name');

  if (nextBreakpoint !== breakpoint) {
    breakpoint = nextBreakpoint;
    runCallbacks && keyCallbacks.forEach(cb => cb(breakpoint));
  }

  if (nextName !== name) {
    name = nextName;
    runCallbacks && nameCallbacks.forEach(cb => cb(name));
  }
}

export function addKeyListener(callback: Callback) {
  keyCallbacks.push(callback);
  update(false);
  callback(breakpoint);
}

export function addNameListener(callback: Callback) {
  nameCallbacks.push(callback);
  update(false);
  callback(name);
}

export function removeKeyListener(callback: Callback) {
  keyCallbacks.splice(keyCallbacks.indexOf(callback), 1);
}

export function removeNameListener(callback: Callback) {
  nameCallbacks.splice(nameCallbacks.indexOf(callback), 1);
}
