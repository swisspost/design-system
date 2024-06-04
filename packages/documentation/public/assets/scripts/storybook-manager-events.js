class StorybookEventManager {
  #EVENTS = {
    ready: 'storybook:ready',
    change: 'storybook:routeChange',
  };

  #root;
  #preview;
  #storyAnchor;

  constructor() {
    window.onload = this.#init.bind(this);
  }

  #setElements() {
    this.#root = document.querySelector('#root');
    this.#preview = document.querySelector('#storybook-preview-wrapper');
    this.#storyAnchor = document.querySelector('#storybook-preview-wrapper > a');
  }

  #init() {
    this.#setElements();

    if (this.#storyAnchor) {
      // if the anchor element is present already, document has been fully loaded, emit ready event
      this.#emit(this.#EVENTS.ready);
      // observe anchor element attributes for change to detect a route change, then emit the change event
      this.#observe(this.#storyAnchor, { attributes: true }, () => {
        this.#emit(this.#EVENTS.change);
      });
    } else if (this.#preview) {
      // if the preview element is present, observe it until it has child elements, then init again
      this.#observe(this.#preview, { childList: true }, this.#init.bind(this), true);
    } else {
      // if the root element is present, observe it until it has child elements, then init again
      this.#observe(this.#root, { childList: true }, this.#init.bind(this), true);
    }
  }

  #observe(element, options = {}, callback = null, disconnectOnChange = false) {
    new MutationObserver(function () {
      if (disconnectOnChange) this.disconnect();
      if (callback) callback();
    }).observe(element, options);
  }

  #emit(type = null) {
    if (Object.values(this.#EVENTS).includes(type)) {
      setTimeout(() => {
        window.dispatchEvent(new Event(type));
      });
    }
  }
}

new StorybookEventManager();
