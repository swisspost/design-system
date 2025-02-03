type MapItem = {
  minWidth: number;
  key: string;
  name: string;
};
type ListenerType = 'key' | 'name';

export class Breakpoint {
  private readonly breakpointMap: MapItem[];
  private readonly current = {
    key: '',
    name: '',
  };

  constructor() {
    if (!this.breakpointMap) {
      const styles = getComputedStyle(document.documentElement);
      const keys = styles.getPropertyValue('--post-breakpoint-keys').split(', ');
      const names = styles.getPropertyValue('--post-breakpoint-names').split(', ');

      this.breakpointMap = styles
        .getPropertyValue('--post-breakpoint-widths')
        .split(', ')
        .map((width, i) => {
          return {
            minWidth: Number(width),
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

    if (this.current.key !== calculated.key) {
      this.current.key = calculated.key;
      if (emitEvents) {
        this.dispatchEvent('key');
      }
    }

    if (this.current.name !== calculated.name) {
      this.current.name = calculated.name;
      if (emitEvents) {
        this.dispatchEvent('name');
      }
    }
  }

  private dispatchEvent(type: ListenerType) {
    window.dispatchEvent(new CustomEvent(`postBreakpoint:${type}`, { detail: this.current[type] }));
  }

  public get(type: ListenerType) {
    this.updateHandler(false);
    return this.current[type];
  }
}

export const breakpoint = new Breakpoint();
