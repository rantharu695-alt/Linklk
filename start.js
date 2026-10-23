// Step 1 ක්ලික් කළ විට: lock token එක පරීක්ෂා කර stamp 1 නිකුත් කරයි
const { makeToken, readToken, hash } = require('./_lib');

module.exports = (req, res) => {
  const { t } = req.body || {};
  const lock = readToken(t);
  if (!lock || !lock.c || !lock.m || lock.e < Date.now()) {
    return res.status(400).json({ ok: false, error: 'invalid_or_expired' });
  }
  const s1 = makeToken({ k: 1, h: hash(t), n: Date.now() });
  res.json({ ok: true, s1 });
};
