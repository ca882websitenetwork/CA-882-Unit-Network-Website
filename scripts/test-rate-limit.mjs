import {
  checkRateLimit,
  resetRateLimitStore,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from '../api/rateLimit.js';

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

resetRateLimitStore();
const ip = '203.0.113.10';
const start = 1_700_000_000_000;

for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
  const result = checkRateLimit(ip, start + i * 1000);
  assert(result.allowed, `request ${i + 1} should be allowed`);
}

const blocked = checkRateLimit(ip, start + RATE_LIMIT_MAX * 1000);
assert(!blocked.allowed, 'request over limit should be blocked');
assert(blocked.retryAfterSec > 0, 'blocked response should include retryAfterSec');

resetRateLimitStore();
checkRateLimit(ip, start);
const afterWindow = checkRateLimit(ip, start + RATE_LIMIT_WINDOW_MS + 1);
assert(afterWindow.allowed, 'requests after window expires should be allowed again');

resetRateLimitStore();
for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
  checkRateLimit('203.0.113.11', start + i);
}
assert(checkRateLimit('203.0.113.99', start).allowed, 'different ip should not share limit');

console.log(`OK: ${RATE_LIMIT_MAX} requests per ${RATE_LIMIT_WINDOW_MS / 60000} min, 429 after limit`);
