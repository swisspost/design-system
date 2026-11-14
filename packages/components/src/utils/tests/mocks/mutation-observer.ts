if (!Object.prototype.hasOwnProperty.call(globalThis, 'MutationObserver')) {
  Object.defineProperty(globalThis, 'MutationObserver', {
    value: undefined,
    configurable: true,
    writable: true,
  });
}

export class MockMutationObserver implements MutationObserver {
  private readonly targets = new Set<Node>();

  constructor(private readonly callback: MutationCallback) {}

  observe(target: Node, _options?: MutationObserverInit) {
    this.targets.add(target);
  }

  disconnect() {
    this.targets.clear();
  }

  takeRecords(): MutationRecord[] {
    return [];
  }

  trigger(mutations: MutationRecord[]) {
    this.callback(mutations, this);
  }
}

export function mockMutationObserver() {
  jest.replaceProperty(globalThis, 'MutationObserver', MockMutationObserver);
}
