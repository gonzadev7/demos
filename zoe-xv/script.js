const whatsappNumber = '+541154777803';
const whatsappMessage = 'Confirmo asistencia - Zoe XV';
function buildWhatsAppLink() {
  const text = encodeURIComponent(whatsappMessage);
  return `https://wa.me/${whatsappNumber.replace(/[+ ]/g, '')}?text=${text}`;
}
function setWhatsAppLinks() {
  const a1 = document.getElementById('cta-whatsapp-final');
  const aOldHero = document.getElementById('cta-whatsapp-hero');
  const aOldDet = document.getElementById('cta-whatsapp-detalles');
  const link = buildWhatsAppLink();
  const apply = (a) => { if (!a) return; a.setAttribute('href', link); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); };
  apply(a1);
  apply(aOldHero);
  apply(aOldDet);
}
function setupCopyAlias() {
  const btn = document.getElementById('copy-alias');
  const aliasEl = document.getElementById('alias');
  if (!btn || !aliasEl) return;
  btn.addEventListener('click', async () => {
    const alias = aliasEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(alias);
      const old = btn.textContent;
      btn.textContent = 'Copiado';
      setTimeout(() => { btn.textContent = old; }, 1600);
    } catch (e) {
      const old = btn.textContent;
      btn.textContent = 'Error';
      setTimeout(() => { btn.textContent = old; }, 1600);
    }
  });
}
function setupAudioControls() {
  const audio = document.getElementById('bg-audio');
  const btn = document.getElementById('audio-toggle');
  if (!audio || !btn) return;
  const START_AT = 23;
  let audible = false; // estado audible del usuario (no el estado de reproducción)
  let hasStarted = false; // solo saltar a START_AT la primera vez
  const meta = document.querySelector('meta[name="youtube-id"]');
  const raw = meta && meta.content ? meta.content.trim() : '';
  const parseYouTubeId = (v) => {
    if (!v) return '';
    const m1 = v.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:[&?]|$)/);
    if (m1) return m1[1];
    if (/^[0-9A-Za-z_-]{11}$/.test(v)) return v;
    return '';
  };
  const YT_ID = parseYouTubeId(raw);
  let usingYT = !!YT_ID;
  let ytPlayer = null;
  let ytReady = false;
  let pref = 'off';
  let playingState = false;
  const isAudioPlaying = () => !audio.paused && !audio.ended && audio.currentTime > 0;
  const updateUI = () => {
    if (audible) {
      btn.classList.add('on');
      btn.textContent = '🔊';
      btn.setAttribute('aria-label', 'Pausar música');
      btn.title = 'Pausar música';
    } else {
      btn.classList.remove('on');
      btn.textContent = '🔇';
      btn.setAttribute('aria-label', 'Activar música');
      btn.title = 'Música';
    }
  };
  const ensureYT = () => new Promise((resolve) => {
    if (!usingYT) return resolve(false);
    if (ytReady && ytPlayer) return resolve(true);
    const create = () => {
      let host = document.getElementById('yt-player');
      if (!host) {
        host = document.createElement('div');
        host.id = 'yt-player';
        host.style.position = 'fixed';
        host.style.left = '0';
        host.style.bottom = '0';
        host.style.width = '1px';
        host.style.height = '1px';
        host.style.opacity = '0.01';
        host.style.pointerEvents = 'none';
        document.body.appendChild(host);
      }
      const player = new YT.Player('yt-player', {
        height: '1',
        width: '1',
        videoId: YT_ID,
        playerVars: { autoplay: 0, controls: 0, modestbranding: 1, loop: 1, playlist: YT_ID, playsinline: 1 },
        events: {
          onReady: () => {
            ytReady = true;
            ytPlayer = player;
            try {
              const iframe = ytPlayer.getIframe();
              if (iframe && iframe.setAttribute) {
                iframe.setAttribute('allow', 'autoplay; encrypted-media');
                iframe.setAttribute('tabindex', '-1');
                iframe.setAttribute('title', 'YouTube audio');
              }
            } catch (_) {}
            resolve(true);
          },
          onStateChange: (e) => {
            playingState = e.data === 1;
            if (e.data === 0 && usingYT) ytPlayer.playVideo();
            updateUI();
          }
        }
      });
      ytPlayer = player;
    };
    if (window.YT && window.YT.Player) return create();
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === 'function') try { prev(); } catch (_) {}
      create();
    };
    document.head.appendChild(tag);
  });
  const safePlayYT = async () => {
    await ensureYT();
    const tryPlay = (retries = 10) => {
      if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
        ytPlayer.playVideo();
        return true;
      }
      if (retries > 0) return setTimeout(() => tryPlay(retries - 1), 100);
      return false;
    };
    tryPlay();
  };
  const safePauseYT = () => {
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') ytPlayer.pauseVideo();
  };
  const playAudio = async () => {
    if (usingYT) {
      await safePlayYT();
      playingState = true;
      audible = true;
      if (ytPlayer && typeof ytPlayer.unMute === 'function') {
        try { ytPlayer.unMute(); } catch (_) {}
      }
      if (!hasStarted && ytPlayer && typeof ytPlayer.seekTo === 'function') {
        try {
          ytPlayer.seekTo(START_AT, true);
          setTimeout(() => {
            try { ytPlayer.seekTo(START_AT, true); } catch (_) {}
          }, 300);
        } catch (_) {}
      }
      hasStarted = true;
      updateUI();
      setTimeout(updateUI, 300);
    } else {
      try {
        if (!hasStarted) {
          if (!Number.isNaN(audio.duration) && audio.duration && audio.duration > START_AT + 0.1) {
            try { audio.currentTime = START_AT; } catch (_) {}
          } else {
            const onMeta = () => {
              try { audio.currentTime = Math.min(START_AT, Math.max(0, (audio.duration || START_AT))); } catch (_) {}
              audio.removeEventListener('loadedmetadata', onMeta);
            };
            audio.addEventListener('loadedmetadata', onMeta, { once: true });
          }
        }
        audio.muted = false;
        await audio.play();
        audible = true;
        hasStarted = true;
        updateUI();
        setTimeout(updateUI, 150);
      } catch (e) {
        audio.muted = true;
        updateUI();
      }
    }
  };
  const pauseAudio = () => {
    if (usingYT) {
      safePauseYT();
      // No pausamos: silenciamos para mantener el tiempo avanzando
      if (ytPlayer && typeof ytPlayer.mute === 'function') {
        try { ytPlayer.mute(); } catch (_) {}
      }
      playingState = true; // sigue “reproduciendo” pero silenciado
      audible = false;
      updateUI();
    } else {
      // No pausamos: activamos reproducción si fuera necesario y silenciamos
      try { if (audio.paused) audio.play(); } catch (_) {}
      audio.muted = true;
      audible = false;
      updateUI();
    }
  };
  btn.addEventListener('click', () => {
    if (!audible) playAudio(); else pauseAudio();
  });
  if (!usingYT) {
    audio.addEventListener('play', updateUI);
    audio.addEventListener('pause', updateUI);
  }
  if (usingYT) {
    ensureYT();
  }
  window.bgAudio = {
    play: () => playAudio(),
    pause: () => pauseAudio(),
    mute: () => pauseAudio(),
    unmute: () => playAudio()
  };
  updateUI();
}
setWhatsAppLinks();
setupCopyAlias();
setupAudioControls();
function setupMusicModal() {
  const modal = document.getElementById('music-modal');
  const yes = document.getElementById('music-yes');
  const no = document.getElementById('music-no');
  if (!modal || !yes || !no) return;
  modal.hidden = false;
  const close = () => { modal.hidden = true; };
  yes.addEventListener('click', () => {
    if (window.bgAudio && typeof window.bgAudio.unmute === 'function') window.bgAudio.unmute();
    close();
  });
  no.addEventListener('click', () => {
    if (window.bgAudio && typeof window.bgAudio.mute === 'function') window.bgAudio.mute();
    close();
  });
}
setupMusicModal();
function setupReveal() {
  const nodes = Array.from(document.querySelectorAll('section h2, section p, .detail-list li, .actions, .alias-box, #cta-whatsapp-final'));
  const sections = Array.from(document.querySelectorAll('main section'));
  nodes.forEach((el, i) => {
    const sec = el.closest('section');
    const idx = sec ? sections.indexOf(sec) : -1;
    const dir = idx >= 0 ? (idx % 2 === 0 ? 'left' : 'right') : (i % 2 === 0 ? 'left' : 'right');
    el.classList.remove('left', 'right');
    el.classList.add('reveal', dir);
    el.style.setProperty('--delay', `${(i % 3) * 0.08}s`);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-visible');
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  nodes.forEach(el => io.observe(el));
  let atTop = true;
  const onScroll = () => {
    const nowTop = window.scrollY <= 20;
    if (nowTop && !atTop) {
      nodes.forEach(el => el.classList.remove('is-visible'));
      atTop = true;
    } else if (!nowTop && atTop) {
      atTop = false;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}
setupReveal();
function setupSnapScroll() {
  const panels = [];
  const hero = document.querySelector('header.hero');
  if (hero) panels.push(hero);
  document.querySelectorAll('main section').forEach(s => panels.push(s));
  if (!panels.length) return;
  let locked = false;
  let lastDir = 0;
  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const smoothScrollTo = (targetY, duration = 1100) => new Promise((resolve) => {
    const startY = window.scrollY;
    const delta = targetY - startY;
    const start = performance.now();
    const prevInline = document.body.style.scrollSnapType;
    document.body.style.scrollSnapType = 'none';
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, Math.round(startY + delta * eased));
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        document.body.style.scrollSnapType = prevInline;
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
  const nearestIndex = () => {
    let idx = 0, best = Infinity;
    const vc = window.innerHeight / 2;
    for (let i = 0; i < panels.length; i++) {
      const r = panels[i].getBoundingClientRect();
      const c = r.top + r.height / 2;
      const d = Math.abs(c - vc);
      if (d < best) { best = d; idx = i; }
    }
    return idx;
  };
  const goTo = async (i) => {
    if (i < 0 || i >= panels.length) return;
    locked = true;
    const el = panels[i];
    const r = el.getBoundingClientRect();
    const centerY = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const targetY = Math.min(maxY, Math.max(0, centerY));
    await smoothScrollTo(targetY, 1200);
    setTimeout(() => { locked = false; }, 100);
  };
  const onWheel = (e) => {
    if (locked) { e.preventDefault(); return; }
    const dy = e.deltaY;
    if (Math.abs(dy) < 5) return;
    e.preventDefault();
    const dir = dy > 0 ? 1 : -1;
    if (dir !== 0) lastDir = dir;
    const cur = nearestIndex();
    const next = cur + dir;
    goTo(next);
  };
  const onKey = (e) => {
    if (locked) return;
    let dir = 0;
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') dir = 1;
    if (e.key === 'ArrowUp' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey)) dir = -1;
    if (e.key === 'Home') { e.preventDefault(); goTo(0); return; }
    if (e.key === 'End') { e.preventDefault(); goTo(panels.length - 1); return; }
    if (dir !== 0) { e.preventDefault(); goTo(nearestIndex() + dir); }
  };
  let touchY = 0;
  const onTouchStart = (e) => { if (e.touches && e.touches.length) touchY = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (locked) return;
    const y2 = e.changedTouches && e.changedTouches.length ? e.changedTouches[0].clientY : touchY;
    const dy = touchY - y2;
    if (Math.abs(dy) < 30) return;
    const dir = dy > 0 ? 1 : -1;
    goTo(nearestIndex() + dir);
  };
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('keydown', onKey);
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
}
setupSnapScroll();
