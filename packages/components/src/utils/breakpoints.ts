// do not import this file in the ./index.ts file

type MapItem = {
  minWidth: number;
  key: string;
  name: string;
};
type ListenerType = 'key' | 'name';

export class Breakpoint {
  private breakpointMap: MapItem[];
  private current_key: string;
  private current_name: string;

  constructor() {
    if (!this.breakpointMap) {
      const styles = getComputedStyle(document.documentElement);
      const keys = styles.getPropertyValue('--post-breakpoint-names').split(', ');
      const names = styles.getPropertyValue('--post-viewport-names').split(', ');

      this.breakpointMap = styles
        .getPropertyValue('--post-breakpoint-keys')
        .split(' ')
        .map((key, i) => {
          return {
            minWidth: Number(key),
            key: keys[i],
            name: names[i],
          };
        })
        .reverse();

      window.addEventListener('resize', () => this.updateHandler(), { passive: true });
    }
  }

  private updateHandler(emitEvents = true) {
    const calculated = this.breakpointMap.find(({ minWidth }) => innerWidth >= minWidth);

    if (this.current_key !== calculated.key) {
      this.current_key = calculated.key;
      if (emitEvents) this.dispatchEvent('key');
    }

    if (this.current_name !== calculated.name) {
      this.current_name = calculated.name;
      if (emitEvents) this.dispatchEvent('name');
    }
  }

  private dispatchEvent(type: ListenerType) {
    window.dispatchEvent(
      new CustomEvent(`postBreakpoint:${type}`, { detail: this[`current_${type}`] }),
    );
  }

  public get(type: ListenerType) {
    this.updateHandler(false);
    return this[`current_${type}`];
  }
}

export const breakpoint = new Breakpoint();
