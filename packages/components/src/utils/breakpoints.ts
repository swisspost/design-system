import { IS_SERVER } from '@/utils/environment';

interface BreakpointDefinition {
  key: string;
  device: string;
  minWidth: number;
}

type BreakpointProperty = keyof BreakpointDefinition;

class Breakpoint {
  private readonly breakpoints: BreakpointDefinition[];
  private currentBreakpoint: BreakpointDefinition;

  constructor() {
    if (IS_SERVER || !!this.breakpoints) return;

    const keys = this.getValues('--post-grid-breakpoint-keys');
    const devices = this.getValues('--post-grid-breakpoint-devices');
    const widths = this.getValues('--post-grid-breakpoint-widths');

    this.breakpoints = widths
      .map((width, i) => ({
        key: keys[i],
        device: devices[i],
        minWidth: Number(width),
      }))
      .reverse();

    this.updateCurrentBreakpoint({ emitEvents: false });
    window.addEventListener('resize', () => this.updateCurrentBreakpoint(), { passive: true });
  }

  private getValues(cssCustomProperty: string): string[] {
    const values = getComputedStyle(document.documentElement).getPropertyValue(cssCustomProperty);
    return values ? values.split(',').map(v => v.trim()) : [];
  }

  private updateCurrentBreakpoint(options: { emitEvents: boolean } = { emitEvents: true }): void {
    const newBreakpoint = this.breakpoints.find(breakpoint => {
      return breakpoint.minWidth <= innerWidth;
    });

    if (options.emitEvents) {
      Object.keys(newBreakpoint)
        .filter(key => this.currentBreakpoint[key] !== newBreakpoint[key])
        .forEach((key: BreakpointProperty) => this.dispatchEvent(key));
    }

    this.currentBreakpoint = newBreakpoint;
  }

  private dispatchEvent(property: BreakpointProperty): void {
    if (IS_SERVER) return;

    window.dispatchEvent(
      new CustomEvent(`postBreakpoint:${property}`, { detail: this.currentBreakpoint[property] }),
    );
  }

  public get<T extends BreakpointProperty>(property: T): BreakpointDefinition[T] {
    this.updateCurrentBreakpoint({ emitEvents: false });
    return this.currentBreakpoint[property];
  }
}

export const breakpoint = new Breakpoint();
