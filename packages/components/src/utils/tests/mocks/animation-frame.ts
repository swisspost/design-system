export const FRAME_TIMEOUT = 16;

export function mockAnimationFrame() {
  jest
    .spyOn(globalThis, 'requestAnimationFrame')
    .mockImplementation(callback =>
      Number(globalThis.setTimeout(() => callback(Date.now()), FRAME_TIMEOUT)),
    );

  jest
    .spyOn(globalThis, 'cancelAnimationFrame')
    .mockImplementation(id => globalThis.clearTimeout(id));
}
