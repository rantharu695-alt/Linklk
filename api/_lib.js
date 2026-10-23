const crypto = require('crypto');

const SECRET = process.env.SECRET || '';

function sign(data) {
  return crypto.createHmac('sha256', SECRET).update(data).digest('base64url');
}

function makeToken(obj) {
  const p = Buffer.from(JSON.stringify(obj)).toString('base64url');
  return p + '.' + sign(p);
}

function readToken(t) {
  if (typeof t !== 'string' || !SECRET) return null;
  const parts = t.split('.');
  if (parts.length !== 2) return null;
  const [p, s] = parts;
  const expected = Buffer.from(sign(p));
  const given = Buffer.from(s);
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
  try {
    return JSON.parse(Buffer.from(p, 'base64url').toString());
  } catch {
    return null;
  }
}

function hash(s) {
  return crypto.createHash('sha256').update(String(s)).digest('base64url').slice(0, 16);
}

async function tg(method, body) {
  const r = await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return r.json();
}

const WAIT1 = Number(process.env.WAIT_STEP1 || 5);
const WAIT2 = Number(process.env.WAIT_STEP2 || 3);

module.exports = { makeToken, readToken, hash, tg, WAIT1, WAIT2 };
