import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import sharedStyles from './shared.component.scss?inline';
import { getLocaleStorage, MIGRATION_TYPE, setLocaleStorage } from './util/persist.util';

@customElement('migration-global-state')
export class GlobalStateComponent extends LitElement {
  @state() private state = {
    currentVersion: 7,
    environment: 'intranet',
    angular: true,
  };

  createRenderRoot() {
    /**
     * Render template without shadow DOM.
     */
    return this;
  }

  constructor() {
    super();
    this.addEventListener('migration-state-current-version-changed', this._updateVersion);
    this.addEventListener('migration-state-environment-changed', this._updateEnvironment);
    this.addEventListener('migration-state-angular-changed', this._updateAngular);
    this._restorePersistedState();
  }

  connectedCallback() {
    super.connectedCallback();
    this._updateChildren();
  }

  render() {
    return html`
      <style>
        ${unsafeCSS(sharedStyles)}
      </style>
    `;
  }

  private _restorePersistedState() {
    const stateTypeFromLocalStorage = getLocaleStorage(MIGRATION_TYPE);
    if (stateTypeFromLocalStorage) {
      this.state = stateTypeFromLocalStorage;
    }
  }

  private _updateVersion(e: Event) {
    this.state.currentVersion = (e as CustomEvent).detail.currentVersion;

    this._update();
  }

  private _updateEnvironment(e: Event) {
    this.state.environment = (e as CustomEvent).detail.environment;

    this._update();
  }

  private _updateAngular(e: Event) {
    this.state.angular = (e as CustomEvent).detail.angular;

    this._update();
  }

  private _update() {
    this._updateChildren();
    this._updatePersistedState();
  }

  private _updatePersistedState() {
    setLocaleStorage(MIGRATION_TYPE, this.state);
  }

  private _updateChildren() {
    const setupElement = this.querySelector('migration-setup');
    const migrationVersionElements =
      Array.from(this.children).filter(child => child.tagName.startsWith('MIGRATION-VERSION')) ??
      [];

    this._updateAttribute(setupElement, 'currentVersion', this.state.currentVersion);
    this._updateAttribute(setupElement, 'environment', this.state.environment);
    this._updateAttribute(setupElement, 'angular', this.state.angular);

    migrationVersionElements.forEach(versionElement => {
      this._updateAttribute(versionElement, 'currentVersion', this.state.currentVersion);
      this._updateAttribute(versionElement, 'environment', this.state.environment);
      this._updateAttribute(versionElement, 'angular', this.state.angular);
    });
  }

  private _updateAttribute(
    element: Element | null,
    attributeName: string,
    value: string | number | boolean,
  ) {
    if (typeof value === 'boolean') {
      if (value) {
        element?.setAttribute(attributeName, '');
      } else {
        element?.removeAttribute(attributeName);
      }

      return;
    }

    element?.setAttribute(attributeName, String(value));
  }
}
