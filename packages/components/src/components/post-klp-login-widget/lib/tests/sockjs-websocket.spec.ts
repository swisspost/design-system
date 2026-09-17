import { createSockJsSocket } from '../sockjs-websocket';

type Handler = ((event: unknown) => void) | null;

class FakeWebSocket {
  static OPEN = 1;
  static last: FakeWebSocket;

  readyState = 0;
  sent: string[] = [];
  closed = false;
  onopen: Handler = null;
  onmessage: Handler = null;
  onclose: Handler = null;
  onerror: Handler = null;

  constructor(public url: string) {
    FakeWebSocket.last = this;
  }

  send(data: string) {
    this.sent.push(data);
  }

  close() {
    this.closed = true;
  }

  receive(frame: string) {
    this.onmessage?.({ data: frame });
  }
}

function setup() {
  (globalThis as unknown as { WebSocket: unknown }).WebSocket = FakeWebSocket;
  const socket = createSockJsSocket('https://n.accountint1.post.ch/eventbus');
  const ws = FakeWebSocket.last;
  const messages: string[] = [];
  socket.onmessage = event => messages.push(event.data);

  return { socket, ws, messages };
}

describe('sockjs-websocket', () => {
  it('opens the websocket on the session url the server expects', () => {
    const { ws } = setup();

    expect(ws.url).toMatch(
      /^wss:\/\/n\.accountint1\.post\.ch\/eventbus\/\d{3}\/[a-z0-9]{8}\/websocket$/,
    );
  });

  it('gives every connection its own session, so two tabs never collide', () => {
    const first = setup().ws.url;
    const second = setup().ws.url;

    expect(first).not.toEqual(second);
  });

  it('reports open only once the server sends the open frame', () => {
    const { socket, ws } = setup();
    const onopen = jest.fn();
    socket.onopen = onopen;

    expect(onopen).not.toHaveBeenCalled();
    ws.receive('o');
    expect(onopen).toHaveBeenCalledTimes(1);
  });

  it('unwraps an array frame into one message per element', () => {
    const { ws, messages } = setup();

    ws.receive(`a${JSON.stringify(['first', 'second'])}`);

    expect(messages).toEqual(['first', 'second']);
  });

  it('delivers a single message frame', () => {
    const { ws, messages } = setup();

    ws.receive(`m${JSON.stringify('only')}`);

    expect(messages).toEqual(['only']);
  });

  it('swallows the heartbeat, which nobody listens for', () => {
    const { ws, messages } = setup();

    ws.receive('h');

    expect(messages).toEqual([]);
  });

  it('ignores a frame it cannot parse instead of throwing at the server', () => {
    const { ws, messages } = setup();

    expect(() => ws.receive('a{not json')).not.toThrow();
    expect(messages).toEqual([]);
  });

  it('closes on the server close frame, reporting the reason', () => {
    const { socket, ws } = setup();
    const onclose = jest.fn();
    socket.onclose = onclose;

    ws.receive(`c${JSON.stringify([1001, 'Session closed'])}`);

    expect(ws.closed).toBe(true);
    expect(onclose).toHaveBeenCalledWith({ code: 1001, reason: 'Session closed' });
  });

  it('reports a broken connection as a close, so the widget can retry', () => {
    const { socket, ws } = setup();
    const onclose = jest.fn();
    socket.onclose = onclose;

    ws.onerror?.({});

    expect(onclose).toHaveBeenCalledWith({ code: 1006, reason: 'WebSocket connection broken' });
  });

  it('reports a close exactly once', () => {
    const { socket, ws } = setup();
    const onclose = jest.fn();
    socket.onclose = onclose;

    ws.onerror?.({});
    ws.onclose?.({ code: 1006, reason: '' });

    expect(onclose).toHaveBeenCalledTimes(1);
  });

  it('wraps what it sends the way the websocket transport does', () => {
    const { socket, ws } = setup();
    ws.readyState = FakeWebSocket.OPEN;

    socket.send('{"type":"ping"}');

    expect(ws.sent).toEqual([String.raw`["{\"type\":\"ping\"}"]`]);
  });

  it('drops a send on a socket that is not open yet', () => {
    const { socket, ws } = setup();

    socket.send('{"type":"ping"}');

    expect(ws.sent).toEqual([]);
  });
});
