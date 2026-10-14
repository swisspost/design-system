expect.extend({
  toHaveBeenLastCalledOn(this: jest.MatcherContext, received: jest.Mock, context: unknown) {
    const lastContext = received.mock.contexts.at(-1);
    const pass = received.mock.calls.length > 0 && Object.is(lastContext, context);

    return {
      pass,
      message: () =>
        `expected the mock ${pass ? 'not ' : ''}to have been last called on ${this.utils.printExpected(context)}, ` +
        `but it was last called on ${this.utils.printReceived(lastContext)}`,
    };
  },
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveBeenLastCalledOn(context: unknown): R;
    }
  }
}

export {};
