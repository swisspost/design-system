import { createPlaceholderProperty } from '@/utils/tests/helpers/global-this';

createPlaceholderProperty('ResizeObserver');

export class MockResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  constructor(private readonly callback: ResizeObserverCallback) {}

  observe(target: Element, _options?: ResizeObserverOptions) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }

  trigger(entries: ResizeObserverEntry[]) {
    this.callback(entries, this);
  }
}

export function mockResizeObserver() {
  jest.replaceProperty(globalThis, 'ResizeObserver', MockResizeObserver);
}
