import { createServer } from 'node:https';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import cookieParser from 'cookie-parser';
import express from 'express';
import sockjs from 'sockjs';

import { createCertificate } from './certs.js';
import {
  B2B_SESSION,
  B2C_SESSION,
  buildSubscribeBody,
  getJournal,
  getState,
  patchState,
  record,
  reset,
} from './scenario.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const WWW = join(__dirname, '../../www');
const PORT = Number(process.env.KLP_PORT ?? 8443);

const app = express();
app.use(cookieParser());
app.use(express.json({ type: () => true }));

/* ------------------------------------------------------------------ CORS -- */

/**
 * Mirrors the documented Widget API: credentialed CORS against an origin whitelist,
 * 403 on mismatch. Tests flip `allowedOrigins` to exercise the rejection path.
 */
const cors = (req, res, next) => {
  const origin = req.get('origin');
  if (!origin) return next();

  if (!getState().allowedOrigins.includes(origin)) {
    return res.sendStatus(403);
  }

  res.set({
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Expose-Headers': '*',
    'Access-Control-Max-Age': '60',
    'Vary': 'Origin',
  });

  if (req.method === 'OPTIONS') return res.sendStatus(204);
  return next();
};

app.use(cors);

/* --------------------------------------------------------- control plane -- */

app.post('/__control/reset', (_req, res) => {
  reset();
  res.sendStatus(204);
});

app.post('/__control/scenario', (req, res) => {
  const { session, ...rest } = req.body ?? {};
  const resolved =
    session === 'b2c' ? B2C_SESSION : session === 'b2b' ? B2B_SESSION : (session ?? null);
  res.json(patchState({ ...rest, ...(session !== undefined ? { session: resolved } : {}) }));
});

/** Simulates the IdP handing out an NSESSIONID on a post.ch parent domain. */
app.post('/__control/login', (req, res) => {
  const { session = 'b2c', adt = null } = req.body ?? {};
  const resolved = session === 'b2b' ? B2B_SESSION : session === 'b2c' ? B2C_SESSION : session;
  patchState({ subscribeMode: 'ok', session: resolved, adt });
  res.cookie('NSESSIONID', 'test-session-id', {
    domain: 'post.ch',
    path: '/',
    secure: true,
    sameSite: 'none',
  });
  res.sendStatus(204);
});

app.post('/__control/push', (req, res) => {
  const { message, address = getState().address } = req.body ?? {};
  const delivered = pushToEventBus(address, message);
  res.json({ delivered });
});

app.get('/__control/journal', (_req, res) => res.json(getJournal()));

/** Drops the EventBus sockets so tests can exercise the onclose / resubscribe path. */
app.post('/__control/disconnect', (_req, res) => {
  const targets = connections.get(getState().address);
  const closed = targets?.size ?? 0;
  targets?.forEach(conn => conn.close());
  res.json({ closed });
});

/* ------------------------------------------------------------ widget api -- */

app.get('/v1/session/subscribe', (req, res) => {
  record('subscribe', { cookies: req.cookies, origin: req.get('origin') });

  const { subscribeMode } = getState();
  if (subscribeMode === 'forbidden') return res.sendStatus(403);
  if (subscribeMode === 'error') return res.sendStatus(500);
  if (subscribeMode === 'hang') return; // never responds, for the abort-during-navigation case

  const body = buildSubscribeBody();
  if (body.typ === 'ukn') {
    res.clearCookie('NSESSIONID', { domain: 'post.ch', path: '/' });
    res.clearCookie('NCTRL', { domain: 'post.ch', path: '/' });
  }
  res.json(body);
});

app.get('/v1/session/status', (req, res) => {
  res.json({ isUserAuthenticated: req.cookies.NSESSIONID ? 'true' : 'false' });
});

app.get('/v1/session/keepalive', (req, res) => {
  record('keepalive', { url: req.originalUrl, cookies: req.cookies });
  res.sendStatus(204);
});

// platform.keepAliveURL points at https://int.post.ch/keepalive
app.get('/keepalive', (req, res) => {
  record('keepalive', { url: req.originalUrl, cookies: req.cookies });
  res.sendStatus(204);
});

app.post('/v1/audit', (req, res) => {
  record('audit', { body: req.body, cookies: req.cookies });
  res.sendStatus(204);
});

/* ------------------------------------------------- landing pages for nav -- */

const landing = title => (req, res) =>
  res.type('html').send(`<!doctype html><title>${title}</title><h1>${title}</h1>
<pre id="query">${req.originalUrl.replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c])}</pre>`);

app.get('/logout/', landing('logout'));
app.get('/idp/', landing('idp'));
app.get('/selfadmin/', landing('selfadmin'));
app.get('/selfadmin/messages/', landing('messages'));
app.get(/^\/kvm\/app\/ui\//, landing('settings'));

/* ------------------------------------------------------------ host page -- */

app.use(express.static(WWW));

/* -------------------------------------------------------------- eventbus -- */

const connections = new Map(); // address -> Set<conn>

const pushToEventBus = (address, body) => {
  const targets = connections.get(address);
  if (!targets?.size) return 0;
  const frame = JSON.stringify({ address, body });
  targets.forEach(conn => conn.write(frame));
  return targets.size;
};

const eventbus = sockjs.createServer({ log: () => {}, prefix: '/eventbus' });

eventbus.on('connection', conn => {
  record('eventbus', { event: 'open' });
  const registered = new Set();

  conn.on('data', raw => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    record('eventbus', { event: msg.type, address: msg.address });

    // Vert.x 2 bridge protocol, which is what the legacy client speaks.
    if (msg.type === 'register') {
      if (msg.address !== getState().address) return; // bridge validates address ownership
      registered.add(msg.address);
      if (!connections.has(msg.address)) connections.set(msg.address, new Set());
      connections.get(msg.address).add(conn);
    } else if (msg.type === 'unregister') {
      registered.delete(msg.address);
      connections.get(msg.address)?.delete(conn);
    }
  });

  conn.on('close', () => {
    record('eventbus', { event: 'close' });
    registered.forEach(address => connections.get(address)?.delete(conn));
  });
});

/* ---------------------------------------------------------------- listen -- */

const server = createServer(createCertificate(), app);
eventbus.installHandlers(server, { prefix: '/eventbus' });

server.listen(PORT, '127.0.0.1', () => {
  console.log(`KLP fake API listening on https://127.0.0.1:${PORT}`);
  console.log(`  host page  https://int.post.ch:${PORT}/`);
  console.log(`  widget api https://int-n.post.ch:${PORT}/v1/session/subscribe`);
});
