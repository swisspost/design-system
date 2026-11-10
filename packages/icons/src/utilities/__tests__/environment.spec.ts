import { execFile } from 'node:child_process';
import { createServer } from 'node:http';
import path from 'node:path';
import { promisify } from 'node:util';

describe('environment proxy configuration', () => {
  let proxyServer: ReturnType<typeof createServer>;
  let proxiedRequests = 0;
  let proxyResponse = '';
  const execFileAsync = promisify(execFile);

  beforeAll(async () => {
    proxyServer = createServer();
    proxyServer.on('connect', (_request, socket) => {
      proxiedRequests += 1;
      socket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
      socket.once('data', () => {
        const body = 'proxied';
        socket.end(`HTTP/1.1 200 OK\r\nContent-Length: ${body.length}\r\n\r\n${body}`);
      });
    });

    await new Promise<void>(resolve => proxyServer.listen(0, '127.0.0.1', resolve));

    const address = proxyServer.address();
    if (!address || typeof address === 'string') {
      throw new Error('Failed to start local proxy test server');
    }

    const env: NodeJS.ProcessEnv = {
      ...process.env,
      HTTP_PROXY: `http://127.0.0.1:${address.port}`,
      HTTPS_PROXY: '',
      NO_PROXY: '',
    };
    delete env.http_proxy;
    delete env.https_proxy;
    delete env.no_proxy;

    const script = [
      "require('./src/utilities/environment').setupProxy();",
      "fetch('http://proxy-target.test/icons/example.svg')",
      '  .then(response => response.text())',
      '  .then(console.log)',
      '  .catch(error => { console.error(error); process.exitCode = 1; });',
    ].join('\n');

    const { stdout } = await execFileAsync(
      process.execPath,
      ['-r', 'ts-node/register', '-e', script],
      { cwd: path.resolve(__dirname, '../../..'), env, timeout: 10_000 },
    );
    proxyResponse = stdout.trim().split(/\r?\n/).pop() ?? '';
  });

  afterAll(async () => {
    if (proxyServer?.listening) {
      await new Promise<void>((resolve, reject) =>
        proxyServer.close(error => (error ? reject(error) : resolve())),
      );
    }
  });

  it('routes native fetch through the configured environment proxy', () => {
    expect(proxiedRequests).toBe(1);
    expect(proxyResponse).toBe('proxied');
  });
});
