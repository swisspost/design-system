import { throttle } from 'throttle-debounce';
import { IS_SERVER } from '@/utils/environment';

export type Device = 'desktop' | 'tablet' | 'mobile';
export type Key = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface BreakpointDefinition {
  device: Device;
  key: Key;
  minWidth: number;
}

type BreakpointProperty = keyof BreakpointDefinition;

class Breakpoint {
  private readonly breakpoints: BreakpointDefinition[] = [
    {key: 'xl', device: 'desktop', minWidth: 1280},
    {key: 'lg', device: 'desktop', minWidth: 1024},
    {key: 'md', device: 'tablet', minWidth: 780},
    {key: 'sm', device: 'tablet', minWidth: 600},
    {key: 'xs', device: 'mobile', minWidth: 0},
  ];
  private currentBreakpoint: BreakpointDefinition = this.breakpoints[0];

  constructor() {
    if (IS_SERVER) return;

    this.updateCurrentBreakpoint({ emitEvents: false });
    window.addEventListener('resize', () => this.updateCurrentBreakpoint(), { passive: true });
  }

  private updateCurrentBreakpoint = throttle(50,
    (options: { emitEvents: boolean } = { emitEvents: true }) => {
      const previousBreakpoint = this.currentBreakpoint;
      const newBreakpoint = this.breakpoints.find(breakpoint => {
        return breakpoint.minWidth <= innerWidth;
      });

      if (!newBreakpoint) return;

      this.currentBreakpoint = newBreakpoint;

      if (!options.emitEvents) return;

      Object.keys(this.currentBreakpoint)
        .filter(key => !previousBreakpoint || this.currentBreakpoint[key] !== previousBreakpoint[key])
        .forEach((key: BreakpointProperty) => this.dispatchEvent(key));
    }
  );

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
