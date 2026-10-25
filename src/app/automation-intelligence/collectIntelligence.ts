import { SERVER_API_KEY } from '../../constants';

/** Header names whose values must be blanked before sending to Fingerprint. @see https://docs.fingerprint.com/reference/automation-intelligence-api */
const SENSITIVE_HEADER_NAMES = new Set([
  'authorization',
  'cookie',
  'proxy-authenticate',
  'proxy-authorization',
  'x-api-key',
]);

const EDGE_URL = 'https://eu.api.fpjs.io/v4/edge';

export type EdgeHeader = { name: string; value: string };

export type EdgeRequest = {
  headers: EdgeHeader[];
  method: string;
  url: string;
  ipv4_address?: string;
  ipv6_address?: string;
};

export function buildEdgeRequest(request: Request): EdgeRequest {
  const headers: EdgeHeader[] = [];
  for (const [name, value] of request.headers.entries()) {
    headers.push({
      name,
      value: SENSITIVE_HEADER_NAMES.has(name.toLowerCase()) ? '' : value,
    });
  }

  const edgeRequest: EdgeRequest = {
    headers,
    method: request.method,
    url: request.url,
  };

  const ip = clientIp(request);
  if (isIpv4(ip)) {
    edgeRequest.ipv4_address = ip;
  } else {
    edgeRequest.ipv6_address = ip;
  }

  return edgeRequest;
}

export async function collectAutomationIntelligence(
  request: Request,
): Promise<unknown> {
  const response = await fetch(EDGE_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SERVER_API_KEY}`,
    },
    body: JSON.stringify(buildEdgeRequest(request)),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

function clientIp(request: Request): string {
  return (
    request.headers.get('x-real-ip')?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    '127.0.0.1'
  );
}

function isIpv4(ip: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(ip);
}
