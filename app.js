(function () {
  const C = window.SITE_CONFIG;
  const $ = (s) => document.querySelector(s);
  const params = new URLSearchParams(location.search);
  const token = params.get('t');
  const demo = params.get('demo') === '1';

  const I = {
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l3 3 5-6"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.500-7-10V6z"/></svg>',
    warn: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.500v.01"/></svg>'
  };

  // theme + static text
  Object.entries(C.colors || {}).forEach(([k, v]) => document.documentElement.style.setProperty('--' + k, v));
  document.title = C.siteName + ' – ' + C.title1 + ' ' + C.title2;
  $('#logo').src = C.logo;
  $('#siteName').textContent = C.siteName;
  $('#dot').style.display = C.statusDot ? '' : 'none';
  $('#badge').innerHTML = I.bolt + C.badge;
  $('#t1').textContent = C.title1;
  $('#t2').textContent = C.title2;
  $('#subtitle').textContent = C.subtitle;
  $('#secure').innerHTML = I.shield + C.securityBadge;
  $('#important').innerHTML = '<h3>' + I.warn + C.importantTitle + '</h3>' + C.important.map((t) => '<p>• ' + t + '</p>').join('');
  $('#howto').innerHTML = '<h3>' + C.howToTitle + '</h3><ol>' + C.howTo.map((t, i) => '<li><i class="n">' + (i + 1) + '</i><span>' + t + '</span></li>').join('') + '</ol>';
  $('#invalidTitle').textContent = C.invalidTitle;
  $('#invalidText').textContent = C.invalidText;

  // menu
  const menu = $('#menu'), menuBtn = $('#menuBtn');
  menu.innerHTML = (C.menuLinks || []).map((l) => '<a target="_blank" rel="noopener" href="' + l.url + '">' + l.text + '</a>').join('');
  menuBtn.onclick = () => { menu.hidden = !menu.hidden; menuBtn.setAttribute('aria-expanded', String(!menu.hidden)); };
  document.addEventListener('click', (e) => { if (!menu.hidden && !e.target.closest('.right')) { menu.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); } });

  // invalid link
  if (!token && !demo) { $('#app').hidden = true; $('#invalid').hidden = false; return; }

  // state
  const steps = [Object.assign({ state: 'ready' }, C.step1), Object.assign({ state: 'locked' }, C.step2)];
  let active = null, hiddenAt = null, pending = null, s1 = null, s2 = null, sending = false;

  const post = (url, body) =>
    fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then((r) => r.json()).then((d) => { if (!d.ok) throw new Error(d.error); return d; });

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 4500);
  }

  function render() {
    const done = steps.filter((s) => s.state === 'done').length;
    $('#fill').style.width = (done / steps.length) * 100 + '%';
    $('#count').textContent = done + '/' + steps.length + ' ' + C.progressText;
    const box = $('#steps'); box.innerHTML = '';
    steps.forEach((s, i) => {
      const el = document.createElement('div');
      el.className = 'step ' + s.state;
      const sub = s.state === 'done' ? '<small>' + I.check.replace('<svg', '<svg width="16" height="16"') + C.doneSub + '</small>'
                : s.state === 'waiting' ? '<small class="wait">' + C.waitingSub + '</small>' : '';
      el.innerHTML = '<div class="num">' + (s.state === 'done' ? I.check : i + 1) + '</div><div class="meta"><b>' + s.label + '</b>' + sub + '</div>';
      const b = document.createElement('button');
      if (s.state === 'done') { b.className = 'btn verified'; b.innerHTML = I.check + C.doneText; b.disabled = true; }
      else if (s.state === 'locked') { b.className = 'btn locked'; b.innerHTML = I.lock + C.lockedText; b.disabled = true; }
      else { b.className = 'btn'; b.innerHTML = I.bolt + s.button; b.disabled = s.state === 'waiting'; b.onclick = () => openStep(i); }
      el.appendChild(b); box.appendChild(el);
    });
    const ready = done === steps.length;
    const f = $('#final');
    f.disabled = !ready || sending;
    f.innerHTML = ready ? I.ext + (sending ? C.finalSending : C.finalReady) : I.lock + C.finalLocked;
  }

  function openStep(i) {
    if (active !== null) return;
    const s = steps[i];
    const w = window.open(s.url, '_blank');
    if (!w) { toast(C.toastPopup); return; }
    try { w.opener = null; } catch (e) {}
    active = i; s.state = 'waiting'; hiddenAt = null;
    if (!demo) {
      pending = i === 0
        ? post('/api/start', { t: token }).then((d) => { s1 = d.s1; })
        : post('/api/step', { t: token, s1 }).then((d) => { s2 = d.s2; });
      pending.catch(() => {});
    } else pending = Promise.resolve();
    render();
  }

  async function finish(sec) {
    const i = active; active = null;
    const s = steps[i];
    if (sec < s.waitSeconds) {
      s.state = 'ready'; render();
      toast(C.toastTooShort.replace('{s}', s.waitSeconds));
      return;
    }
    try {
      await pending;
      s.state = 'done';
      if (steps[i + 1]) steps[i + 1].state = 'ready';
    } catch (e) {
      s.state = 'ready'; toast(C.toastError);
    }
    render();
  }

  document.addEventListener('visibilitychange', () => {
    if (active === null) return;
    if (document.hidden) hiddenAt = Date.now();
    else if (hiddenAt) { const sec = (Date.now() - hiddenAt) / 1000; hiddenAt = null; finish(sec); }
  });

  $('#final').onclick = async () => {
    if (sending) return;
    sending = true; render();
    if (demo) { toast('Demo mode: Telegram bot එකට content යවනු ඇත.'); sending = false; render(); return; }
    try {
      const d = await post('/api/deliver', { t: token, s2 });
      $('#final').innerHTML = I.check + C.finalDone;
      setTimeout(() => { location.href = d.bot; }, 1200);
    } catch (e) {
      sending = false; render(); toast(C.toastError);
    }
  };

  render();
})();
