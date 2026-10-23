// "Get Link" ක්ලික් කළ විට: සියල්ල නිවැරදි නම් content එක user ගේ Telegram chat එකට යවයි
const { readToken, hash, tg, WAIT2 } = require('./_lib');

module.exports = async (req, res) => {
  const { t, s2 } = req.body || {};
  const lock = readToken(t);
  const st = readToken(s2);
  if (!lock || lock.e < Date.now() || !st || st.k !== 2 || st.h !== hash(t)) {
    return res.status(400).json({ ok: false, error: 'invalid' });
  }
  if (Date.now() - st.n < WAIT2 * 1000 - 800) {
    return res.status(400).json({ ok: false, error: 'too_fast' });
  }

  const r = await tg('copyMessage', {
    chat_id: lock.c,
    from_chat_id: process.env.STORAGE_CHANNEL_ID,
    message_id: lock.m,
    protect_content: process.env.PROTECT_CONTENT === '1',
  });
  if (!r.ok) return res.status(500).json({ ok: false, error: 'send_failed' });

  res.json({ ok: true, bot: `https://t.me/${process.env.BOT_USERNAME}` });
};
