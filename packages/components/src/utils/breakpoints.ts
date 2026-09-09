export type Device = 'desktop' | 'tablet' | 'mobile';
export type BreakpointKey = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMinWidth = 1280 | 1024 | 780 | 600 | 0;

interface BreakpointDefinition {
  device: Device;
  key: BreakpointKey;
  minWidth: BreakpointMinWidth;
  mediaQuery: string;
}

type BreakpointProperty = keyof BreakpointDefinition;

class Breakpoint {
  private readonly breakpoints: BreakpointDefinition[] = [
    { key: 'xl', device: 'desktop', minWidth: 1280, mediaQuery: '(min-width: 1280px)' },
    { key: 'lg', device: 'desktop', minWidth: 1024, mediaQuery: '(min-width: 1024px)' },
    { key: 'md', device: 'tablet', minWidth: 780, mediaQuery: '(min-width: 780px)' },
    { key: 'sm', device: 'tablet', minWidth: 600, mediaQuery: '(min-width: 600px)' },
    { key: 'xs', device: 'mobile', minWidth: 0, mediaQuery: '(min-width: 0px)' },
  ];

  private currentBreakpoint: BreakpointDefinition;

  private resizeObserver: ResizeObserver | null = globalThis.ResizeObserver
    ? new ResizeObserver(() => this.updateCurrentBreakpoint())
    : null;

  constructor() {
    if (this.resizeObserver) {
      this.updateCurrentBreakpoint({ emitEvents: false });
      this.resizeObserver.observe(document.body);
    }
  }

  private updateCurrentBreakpoint = (options: { emitEvents: boolean } = { emitEvents: true }) => {
    const previousBreakpoint = this.currentBreakpoint;
    const newBreakpoint = this.breakpoints.find(breakpoint => {
      return globalThis.matchMedia
        ? globalThis.matchMedia(breakpoint.mediaQuery).matches
        : breakpoint.minWidth <= document.documentElement.clientWidth;
    });

    if (!newBreakpoint) return;

    this.currentBreakpoint = newBreakpoint;

    if (!options.emitEvents) return;

    Object.keys(this.currentBreakpoint)
      .filter(key => key !== 'mediaQuery')
      .filter(
        key => !previousBreakpoint || this.currentBreakpoint[key] !== previousBreakpoint[key],
      )
      .forEach((key: BreakpointProperty) => this.dispatchEvent(key));
  };

  private dispatchEvent(property: BreakpointProperty): void {
    globalThis.dispatchEvent(
      new CustomEvent(`postBreakpoint:${property}`, { detail: this.currentBreakpoint[property] }),
    );
  }

  public get<T extends BreakpointProperty>(property: T): BreakpointDefinition[T] {
    this.updateCurrentBreakpoint({ emitEvents: false });
    return this.currentBreakpoint[property];
  }
}

export const breakpoint = new Breakpoint();
