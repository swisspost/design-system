import { IS_SERVER } from '@/utils/environment';

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
    if (!IS_SERVER && !this.breakpointMap) {
      const keys = this.getStyles('--post-breakpoint-keys');
      const names = this.getStyles('--post-breakpoint-names');
      const widths = this.getStyles('--post-breakpoint-widths');

      this.breakpointMap = widths
        .map((width, i) => ({
          minWidth: Number(width),
          key: keys[i],
          name: names[i],
        }))
        .reverse();

      window.addEventListener('resize', () => this.updateHandler(), { passive: true });
    }
  }

  private getStyles(propertyName: string) {
    const styles = getComputedStyle(document.documentElement);
    return (
      styles
        .getPropertyValue(propertyName)
        ?.split(',')
        .map(w => w.trim()) ?? []
    );
  }

  private updateHandler(emitEvents: boolean = true) {
    const calculated = this.breakpointMap.find(({ minWidth }) => innerWidth >= minWidth);

    if (this.current.key !== calculated.key) {
      this.current.key = calculated.key;
      if (emitEvents) this.dispatchEvent('key');
    }

    if (this.current.name !== calculated.name) {
      this.current.name = calculated.name;
      if (emitEvents) this.dispatchEvent('name');
    }
  }

  private dispatchEvent(type: ListenerType) {
    if (!IS_SERVER) {
      window.dispatchEvent(
        new CustomEvent(`postBreakpoint:${type}`, { detail: this.current[type] }),
      );
    }
  }

  public get(type: ListenerType) {
    this.updateHandler(false);
    return this.current[type];
  }
}

export const breakpoint = new Breakpoint();
