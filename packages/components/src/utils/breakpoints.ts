import { throttle } from 'throttle-debounce';
import { IS_SERVER } from '@/utils/environment';

export type Device = 'desktop' | 'tablet' | 'mobile';
export type BreakpointKey = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMinWidth = 1280 | 1024 | 780 | 600 | 0;

interface BreakpointDefinition {
  device: Device;
  key: BreakpointKey;
  minWidth: BreakpointMinWidth;
}

type BreakpointProperty = keyof BreakpointDefinition;

class Breakpoint {
  private readonly breakpoints: BreakpointDefinition[] = [
    { key: 'xl', device: 'desktop', minWidth: 1280 },
    { key: 'lg', device: 'desktop', minWidth: 1024 },
    { key: 'md', device: 'tablet', minWidth: 780 },
    { key: 'sm', device: 'tablet', minWidth: 600 },
    { key: 'xs', device: 'mobile', minWidth: 0 },
  ];

  private currentBreakpoint: BreakpointDefinition;

  private resizeObserver = new ResizeObserver(() => this.updateCurrentBreakpoint());

  constructor() {
    if (IS_SERVER) return;

    this.updateCurrentBreakpoint({ emitEvents: false });
    this.resizeObserver.observe(document.body);
  }

  private updateCurrentBreakpoint = throttle(
    50,
    (options: { emitEvents: boolean } = { emitEvents: true }) => {
      const previousBreakpoint = this.currentBreakpoint;
      const newBreakpoint = this.breakpoints.find(breakpoint => {
        return breakpoint.minWidth <= innerWidth;
      });

      if (!newBreakpoint) return;

      this.currentBreakpoint = newBreakpoint;

      if (!options.emitEvents) return;

      Object.keys(this.currentBreakpoint)
        .filter(
          key => !previousBreakpoint || this.currentBreakpoint[key] !== previousBreakpoint[key],
        )
        .forEach((key: BreakpointProperty) => this.dispatchEvent(key));
    },
  );

  private dispatchEvent(property: BreakpointProperty): void {
    if (IS_SERVER) return;

    window.dispatchEvent(
      new CustomEvent(`postBreakpoint:${property}`, { detail: this.currentBreakpoint[property] }),
    );
  }

  public get key(): BreakpointDefinition['key'] {
    return this.currentBreakpoint.key;
  }

  public get device(): BreakpointDefinition['device'] {
    return this.currentBreakpoint.device;
  }

  public get minWidth(): BreakpointDefinition['minWidth'] {
    return this.currentBreakpoint.minWidth;
  }
}

export const breakpoint = new Breakpoint();
