import { IS_BROWSER } from '@/utils/environment';

type MapItem = {
  minWidth: number;
  key: string;
  device: string;
};
type ListenerType = 'key' | 'device';

export class Breakpoint {
  private readonly breakpointMap: MapItem[];
  private readonly current = {
    key: '',
    device: '',
  };

  constructor() {
    if (IS_BROWSER && !this.breakpointMap) {
      const keys = this.getStyles('--post-grid-breakpoint-keys');
      const devices = this.getStyles('--post-grid-breakpoint-names');
      const widths = this.getStyles('--post-grid-breakpoint-widths');

      this.breakpointMap = widths
        .map((width, i) => ({
          minWidth: Number(width),
          key: keys[i],
          device: devices[i],
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

    if (this.current.device !== calculated.device) {
      this.current.device = calculated.device;
      if (emitEvents) this.dispatchEvent('device');
    }
  }

  private dispatchEvent(type: ListenerType) {
    if (IS_BROWSER) {
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
