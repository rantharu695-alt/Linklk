// ======================================================
//  SITE SETTINGS — මෙහි ඇති ඕනෑම දෙයක් වෙනස් කළ හැක
//  (නම, logo, වර්ණ, අකුරු, ad links, තත්පර ගණන්...)
// ======================================================
window.SITE_CONFIG = {
  siteName: "JilZone",
  logo: "logo.svg",              // public/ ෆෝල්ඩරයට ඔබේ logo.png දාලා මෙතන නම වෙනස් කරන්න
  statusDot: true,               // ඉහළ දකුණේ කොළ පාට තිත

  badge: "SECURE LINK UNLOCK",
  title1: "UNLOCK",
  title2: "YOUR LINK",
  subtitle: "Complete the verification steps below to access your content securely.",
  securityBadge: "2-Layer Verified Security",

  // ---- පියවර (Steps) ----
  // url = ad page / ඔබේ වෙබ් අඩවිය.  waitSeconds = එහි රැඳී සිටිය යුතු තත්පර ගණන
  // වැදගත්: waitSeconds අගයන් Vercel env (WAIT_STEP1 / WAIT_STEP2) සමඟ සමාන විය යුතුයි
  step1: { label: "Step 1", button: "Click Here", url: "https://example.com/ad-page", waitSeconds: 5 },
  step2: { label: "Step 2", button: "Click Here", url: "https://example.com", waitSeconds: 3 },

  lockedText: "Locked",
  doneText: "VERIFIED",
  doneSub: "Verified successfully",
  waitingSub: "Waiting on the other tab…",
  progressText: "Steps Complete",

  finalLocked: "COMPLETE ALL STEPS TO UNLOCK",
  finalReady: "GET LINK NOW",
  finalSending: "SENDING…",
  finalDone: "Sent! Opening Telegram…",

  // ---- පණිවිඩ ----
  toastTooShort: "ad page එකේ තත්පර {s}ක් රැඳී සිටින්න. නැවත උත්සාහ කරන්න.",
  toastPopup: "Pop-up block වී ඇත. Browser එකේ pop-ups allow කර නැවත ක්ලික් කරන්න.",
  toastError: "දෝෂයක් සිදුවිය. Telegram bot එකෙන් අලුත් link එකක් ගන්න.",
  invalidTitle: "Link එක වලංගු නැත",
  invalidText: "මෙම link එක කල් ඉකුත් වී හෝ වැරදිය. Telegram bot එක ඇරලා අලුත් link එකක් ලබා ගන්න.",

  importantTitle: "වැදගත් (IMPORTANT)",
  important: [
    "ඔබ දැන්වීම් පිටුවේ (Ad Page) අනිවාර්යයෙන්ම <b>තත්පර 5ක් රැඳී සිටිය යුතුය</b>. එසේ නොමැති වුවහොත් කාලය ගණනය නොවේ (Pause වේ).",
    "ඔබ දැන්වීම් පිටුව (Ad Tab) වසා දැමුවහොත්, මෙම පිටුව Refresh කර මුල සිට ආරම්භ කිරීමට සිදුවේ."
  ],

  howToTitle: "අනුගමනය කළ යුතු පියවර:",
  howTo: [
    "<b>පියවර 01:</b> ඉහත දැක්වෙන පළමු බොත්තම (Step 1) මත ක්ලික් කර විවෘත වන දැන්වීම් පිටුවේ තත්පර 5ක් රැඳී සිටින්න.",
    "<b>පියවර 02:</b> තත්පර 5කට පසු නැවතත් අපගේ වෙබ් අඩවියට පැමිණ දෙවන බොත්තම (Step 2) මත ක්ලික් කරන්න.",
    "<b>පියවර 03:</b> ඉහත බොත්තම් දෙකම සම්පූර්ණ කළ පසු දිස්වන <i>“Get Link”</i> බොත්තම ක්ලික් කර ඔබගේ ලින්ක් එක ලබා ගන්න."
  ],

  // ඉහළ දකුණේ menu (☰) එකේ දිස්වන links
  menuLinks: [
    { text: "Telegram Channel", url: "https://t.me/your_channel" },
    { text: "Contact", url: "https://t.me/your_username" }
  ],

  // ---- වර්ණ (CSS variables) ----
  colors: {
    bg: "#0b0714",
    card: "#10101c",
    accent: "#a78bfa",
    accent2: "#818cf8",
    text: "#f3f0ff",
    muted: "#9a93b5",
    ok: "#2dd4a0",
    warn: "#f87171"
  }
};
