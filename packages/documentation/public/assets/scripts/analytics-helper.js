class GTM {
  constructor() {
    this.environments = {
      envs: null,
      fallback: '',
    };
    this.constants = {};
  }

  set(name, value) {
    if (!this.constants[name]) this.constants[name] = value;
  }

  get(name) {
    if (this.constants[name]) return this.constants[name];

    console.warn(`GTM Warning: There is no such property with the name ${name}`);
    return undefined;
  }

  setEnvironments(envs, fallback) {
    if (typeof envs !== 'object') {
      console.warn(
        'GTM Warning: Setting the environments failed. The values where not provided as an object ({ [envName]: "url1,url2", ... }).',
      );
    } else if (this.environments.envs) {
      console.warn('GTM Warning: Environments already set. You can set them only once.');
    } else {
      this.environments.envs = Object.assign({}, envs);
      this.environments.fallback = fallback ?? Object.values(envs)[0];
    }
  }

  getEnvironment() {
    return (Object.entries(this.environments.envs).find(([_env, hosts = '']) =>
      hosts.split(',').some(host => window.location.host.indexOf(host) === 0),
    ) ?? [this.environments.fallback])[0];
  }

  getPageTitle() {
    return document.head.querySelector('title')?.text ?? '';
  }
}

window.__GTM__ = new GTM();
