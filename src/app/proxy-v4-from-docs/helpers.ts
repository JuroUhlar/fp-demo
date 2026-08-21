const RANDOM_CHARS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function parseCookies(
  cookieHeader: string | null,
): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  const cookieMap: Record<string, string> = {};
  for (const part of cookieHeader.split(';')) {
    const trimmed = part.trim();
    if (!trimmed) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const name = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    cookieMap[name] = value;
  }

  return cookieMap;
}

export function parseIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const [firstIp] = forwardedFor.split(',');
    const trimmed = firstIp?.trim();
    if (trimmed) {
      return trimmed;
    }
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) {
    return realIp;
  }

  return '';
}

export function parseHost(request: Request): string {
  return request.headers.get('host') ?? new URL(request.url).host;
}

export function randomShortString({ length }: { length: number }): string {
  return Array.from({ length }, () => {
    const index = Math.floor(Math.random() * RANDOM_CHARS.length);
    return RANDOM_CHARS[index] ?? '';
  }).join('');
}

export function isNativeError(error: unknown): error is Error {
  return error instanceof Error;
}
