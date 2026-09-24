// In-memory sliding-window rate limiter (per serverless instance on Vercel).

export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX = 8;

const hits = new Map();
let checksSincePrune = 0;

export function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (realIp) {
    return String(realIp).trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

export function checkRateLimit(ip, now = Date.now()) {
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  let timestamps = hits.get(ip) || [];
  timestamps = timestamps.filter((t) => t > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    const oldest = timestamps[0];
    const retryAfterSec = Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    hits.set(ip, timestamps);
    return {
      allowed: false,
      retryAfterSec: Math.max(1, retryAfterSec),
      remaining: 0,
    };
  }

  timestamps.push(now);
  hits.set(ip, timestamps);
  return {
    allowed: true,
    retryAfterSec: 0,
    remaining: RATE_LIMIT_MAX - timestamps.length,
  };
}

export function maybePrune(now = Date.now()) {
  checksSincePrune += 1;
  if (checksSincePrune < 100) return;
  checksSincePrune = 0;

  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  for (const [ip, timestamps] of hits.entries()) {
    const fresh = timestamps.filter((t) => t > windowStart);
    if (fresh.length === 0) hits.delete(ip);
    else hits.set(ip, fresh);
  }
}

/** Test helper: clear the in-memory store between runs. */
export function resetRateLimitStore() {
  hits.clear();
  checksSincePrune = 0;
}
