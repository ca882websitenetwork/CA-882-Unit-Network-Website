// Vercel serverless function — api/subscribe.js
// Reads BREVO_API_KEY from Vercel environment variables (Settings → Environment Variables)

import {
  checkRateLimit,
  getClientIp,
  maybePrune,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
} from './rateLimit.js';

const ALLOWED_LIST_IDS = new Set([6, 7, 8]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  maybePrune();

  const clientIp = getClientIp(req);
  const rate = checkRateLimit(clientIp);
  if (!rate.allowed) {
    res.setHeader('Retry-After', String(rate.retryAfterSec));
    return res.status(429).json({
      message:
        'Too many registration attempts from this connection. Please wait a few minutes and try again.',
    });
  }

  const { email, listId, attributes } = req.body;

  if (!email || listId == null) {
    return res.status(400).json({ message: 'Missing email or listId' });
  }

  const numericListId = Number(listId);
  if (!ALLOWED_LIST_IDS.has(numericListId)) {
    return res.status(400).json({ message: 'Invalid listId' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: 'Server misconfiguration: BREVO_API_KEY not set' });
  }

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [numericListId],
        updateEnabled: true,
        attributes: attributes || {},
      }),
    });

    const data = await brevoRes.json().catch(() => ({}));

    if (brevoRes.ok || brevoRes.status === 204) {
      return res.status(200).json({ success: true });
    }
    return res.status(brevoRes.status).json({ message: data.message || 'Brevo error' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal error: ' + err.message });
  }
}

export { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS };
