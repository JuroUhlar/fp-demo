import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { GET } from '../src/app/api/automation-intelligence/route';

type EdgeBody = {
  headers: { name: string; value: string }[];
  method: string;
  url: string;
  ipv4_address?: string;
  ipv6_address?: string;
};

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test('GET returns Automation Intelligence JSON for the incoming request', async () => {
  let fingerprintUrl = '';
  let fingerprintBody: EdgeBody | undefined;
  let authHeader = '';

  globalThis.fetch = async (input, init) => {
    fingerprintUrl = String(input);
    authHeader = new Headers(init?.headers).get('Authorization') ?? '';
    fingerprintBody = JSON.parse(String(init?.body)) as EdgeBody;
    return Response.json({
      event_id: '1758130560902.8tRtrH',
      timestamp: 1758130560902,
      source: 'edge',
      ip_info: { v4: { address: '34.162.244.71' } },
    });
  };

  const request = new Request('http://localhost:3000/api/automation-intelligence', {
    method: 'GET',
    headers: {
      'User-Agent': 'openai-mcp/1.0.0',
      Authorization: 'Bearer sk-live-abc123',
      Cookie: 'session=9f8a7b6c',
      Accept: 'application/json',
      'x-forwarded-for': '34.162.244.71',
    },
  });

  const response = await GET(request);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    event_id: '1758130560902.8tRtrH',
    timestamp: 1758130560902,
    source: 'edge',
    ip_info: { v4: { address: '34.162.244.71' } },
  });

  assert.equal(fingerprintUrl, 'https://eu.api.fpjs.io/v4/edge');
  assert.match(authHeader, /^Bearer /);
  assert.ok(fingerprintBody);
  assert.equal(fingerprintBody.method, 'GET');
  assert.equal(fingerprintBody.url, 'http://localhost:3000/api/automation-intelligence');
  assert.equal(fingerprintBody.ipv4_address, '34.162.244.71');
  assert.deepEqual(
    Object.fromEntries(fingerprintBody.headers.map((h) => [h.name, h.value])),
    {
      'user-agent': 'openai-mcp/1.0.0',
      authorization: '',
      cookie: '',
      accept: 'application/json',
      'x-forwarded-for': '34.162.244.71',
    },
  );
});

test('GET returns JSON error when Fingerprint fails', async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { code: 'wrong_region', message: 'wrong region' } }), {
      status: 403,
      statusText: 'Forbidden',
      headers: { 'Content-Type': 'application/json' },
    });

  const response = await GET(
    new Request('http://localhost:3000/api/automation-intelligence', {
      headers: { 'x-forwarded-for': '34.162.244.71' },
    }),
  );

  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), {
    error: '403 Forbidden',
  });
});
