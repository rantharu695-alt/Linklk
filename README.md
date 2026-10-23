# JilZone – Telegram Link Unlock Site

ගලායන ආකාරය: Admin → bot ට file යවයි → share link ලැබේ → User link එකෙන් bot ඇරේ → "Unlock" බොත්තම → website එකේ Step 1, Step 2 → Get Link → content එක user ගේ Telegram chat එකටම පැමිණේ.

## 1. Telegram සැකසුම
1. @BotFather ගෙන් bot එකක් හදා **token** ගන්න.
2. **Private channel** එකක් හදා bot එක **Admin** කරන්න (content ගබඩාව).
3. Channel ID එක ගන්න (-100... ආකාරයේ). Channel එකෙන් message එකක් @userinfobot ට forward කළ විට පෙනේ.
4. ඔබේ Telegram user ID එක @userinfobot ගෙන් ගන්න (ADMIN_IDS).

## 2. GitHub + Vercel
1. මෙම ෆෝල්ඩරය GitHub repo එකකට upload කරන්න.
2. vercel.com → Add New Project → ඒ repo එක import කරන්න (Framework: Other; settings වෙනස් නොකරන්න).
3. Settings → Environment Variables වලට `.env.example` හි සියලු අගයන් දමන්න. (SITE_URL = ඔබේ Vercel URL)
4. Redeploy කරන්න.

## 3. Webhook සම්බන්ධ කිරීම (එක් වරක්)
Browser එකේ මෙය ඇතුල් කරන්න (අගයන් ඔබේ ඒවා):
```
https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<your-site>.vercel.app/api/bot&secret_token=<WEBHOOK_SECRET>
```

## 4. භාවිතය
- Admin ලෙස bot ට file / video / photo / text යවන්න → `https://t.me/Bot?start=get_123` link එක ලැබේ. එය ඔබේ channel/ad site වල share කරන්න.
- Test කිරීමට: `https://<site>/?demo=1` (API නැතිව UI පමණක්).

## 5. වෙනස් කිරීම්
`public/config.js` වෙනස් කර GitHub එකට push කළ විට Vercel auto deploy වේ.
නම, logo (`public/logo.svg` ප්‍රතිස්ථාපනය), වර්ණ, සියලු අකුරු, ad URLs, තත්පර ගණන, menu links ඒ file එකේම ඇත.
Wait තත්පර වෙනස් කළොත් Vercel env `WAIT_STEP1` / `WAIT_STEP2` ද සමාන කරන්න.

## සටහන්
- Unlock link එක පැය 1කින් කල් ඉකුත් වේ (bot.js හි LOCK_MINUTES).
- Netlify භාවිතා කරන්නේ නම් api/*.js Netlify Functions ආකාරයට (handler(event)) ගැලපිය යුතුය; Vercel වඩාත් පහසුය.
