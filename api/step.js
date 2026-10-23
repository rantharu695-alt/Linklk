// Step 2 ක්ලික් කළ විට: step 1 ට අවශ්‍ය කාලය ගත වී ඇත්දැයි බලා stamp 2 නිකුත් කරයි
const { makeToken, readToken, hash, WAIT1 } = require('./_lib');

module.exports = (req, res) => {
  const { t, s1 } = req.body || {};
  const lock = readToken(t);
  const st = readToken(s1);
  if (!lock || lock.e < Date.now() || !st || st.k !== 1 || st.h !== hash(t)) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }
  if (Date.now() - st.n < WAIT1 * 1000 - 800) {
    return res.status(400).json({ ok: false, error: 'too_fast' });
  }
  const s2 = makeToken({ k: 2, h: hash(t), n: Date.now() });
  res.json({ ok: true, s2 });
};
