// Telegram webhook
// Admin: file / text / photo / video එකක් bot ට යවන්න -> share link එකක් ලැබේ
// User: ඒ link එකෙන් bot ඇරිය විට -> unlock website link එකක් ලැබේ
const { makeToken, tg } = require('./_lib');

const admins = () => (process.env.ADMIN_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
const LOCK_MINUTES = 60;

module.exports = async (req, res) => {
  try {
    const want = process.env.WEBHOOK_SECRET;
    if (want && req.headers['x-telegram-bot-api-secret-token'] !== want) {
      return res.status(401).end();
    }
    const msg = (req.body || {}).message;
    if (!msg) return res.status(200).end();

    const chatId = msg.chat.id;
    const text = msg.text || '';
    const isAdmin = admins().includes(String(msg.from && msg.from.id));

    // User: /start get_<id>
    const m = text.match(/^\/start\s+get_(\d+)$/);
    if (m) {
      const token = makeToken({ c: chatId, m: Number(m[1]), e: Date.now() + LOCK_MINUTES * 60000 });
      await tg('sendMessage', {
        chat_id: chatId,
        text: '🔒 ඔබගේ content එක unlock කරන්න පහත බොත්තම ඔබා පියවර සම්පූර්ණ කරන්න.',
        reply_markup: { inline_keyboard: [[{ text: '🔓 Unlock Link', url: `${process.env.SITE_URL}/?t=${token}` }]] },
      });
      return res.status(200).end();
    }

    // Plain /start
    if (text.startsWith('/start')) {
      await tg('sendMessage', {
        chat_id: chatId,
        text: isAdmin
          ? '👑 Admin mode: මට file / video / photo / text එකක් යවන්න. මම share link එකක් හදා දෙන්නම්.'
          : '👋 Welcome! ඔබට ලැබුණු link එක හරහා මෙහි පැමිණෙන්න.',
      });
      return res.status(200).end();
    }

    // Admin: content upload
    if (isAdmin) {
      const r = await tg('copyMessage', {
        chat_id: process.env.STORAGE_CHANNEL_ID,
        from_chat_id: chatId,
        message_id: msg.message_id,
      });
      if (r.ok) {
        const id = r.result.message_id;
        await tg('sendMessage', {
          chat_id: chatId,
          text: `✅ Saved!\n\nShare link:\nhttps://t.me/${process.env.BOT_USERNAME}?start=get_${id}`,
          disable_web_page_preview: true,
        });
      } else {
        await tg('sendMessage', {
          chat_id: chatId,
          text: '❌ Storage channel එකට save කළ නොහැක. Bot එක channel එකේ admin ද සහ STORAGE_CHANNEL_ID නිවැරදිද බලන්න.',
        });
      }
    }
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(200).end();
  }
};
