/* ============================================================
   PartnerWorld — shared runtime
   Injects chrome (topbar, sidebar, particles, streaks, notifications,
   reveal modal), holds avatar data, generates gold silhouette
   placeholders, and drives cinematic animations.
   ============================================================ */

/* ---------------- Avatar data (single source of truth) ----------------
   tier: 'premium' | 'modern' | 'economy' — drives catalogue grouping
   id stays a lowercase English slug (matches avatars/<id>.jpg|png)
   name is shown in Malayalam script throughout the UI
--------------------------------------------------------------------- */
const AVATARS = [
  // Premium
  {
    id: 'riya', name: 'റിയ ഷിബു', age: 24,
    tags: ['Luxury Model'],
    price: '7,999', difficulty: null, badge: 'Elite+', model: 'Elite+',
    seed: 88, tier: 'premium'
  },
  {
    id: 'esther', name: 'എസ്തർ', age: 25,
    tags: ['Confident', 'Romantic', 'Emotional Intelligence'],
    price: '5,999', difficulty: null, badge: 'Premium', model: 'Premium',
    seed: 63, tier: 'premium'
  },
  {
    id: 'meera', name: 'മീര', age: 26,
    tags: ['Elegant', 'Mysterious', 'Sophisticated'],
    price: '6,499', difficulty: null, badge: 'Premium', model: 'Premium',
    seed: 51, tier: 'premium'
  },
  // Modern
  {
    id: 'amala', name: 'അമല', age: 27,
    tags: ['Independent', 'Modern', 'Career Focused'],
    price: '3,999', difficulty: 3, badge: null, model: 'Standard',
    seed: 7, tier: 'modern'
  },
  {
    id: 'kavya', name: 'കാവ്യ', age: 24,
    tags: ['Bold', 'Ambitious', 'Trendy'],
    price: '3,699', difficulty: 3, badge: null, model: 'Standard',
    seed: 34, tier: 'modern'
  },
  {
    id: 'anna', name: 'ആന്ന', age: 23,
    tags: ['Funny', 'Chaotic', 'Meme Lover'],
    price: '3,199', difficulty: 2, badge: null, model: 'Standard',
    seed: 29, tier: 'modern'
  },
  // Economy
  {
    id: 'priyamvada', name: 'പ്രിയംവദ', age: 24,
    tags: ['Honest', 'Emotionally Expressive', 'Traditional', 'Loyal'],
    price: '1,499', difficulty: 0, badge: 'Best Value', model: 'Economy+',
    seed: 42, tier: 'economy'
  },
  {
    id: 'laila', name: 'ലൈല', age: 22,
    tags: ['Sweet', 'Caring', 'Introvert'],
    price: '2,299', difficulty: 1, badge: null, model: 'Economy+',
    seed: 18, tier: 'economy'
  },
  {
    id: 'devika', name: 'ദേവിക', age: 23,
    tags: ['Gentle', 'Homely', 'Devoted'],
    price: '1,799', difficulty: 1, badge: null, model: 'Economy+',
    seed: 77, tier: 'economy'
  }
];

const TIERS = [
  ['premium', 'Premium'],
  ['modern', 'Modern'],
  ['economy', 'Economy']
];

/* ---------------- Gold silhouette placeholder (AI-style) ---------------- */
function silhouette(name, seed = 0) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  // deterministic sparkle field from seed
  let s = seed * 9301 + 49297;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  let sparks = '';
  for (let i = 0; i < 26; i++) {
    const x = 40 + rnd() * 720, y = 40 + rnd() * 920, r = 0.6 + rnd() * 2.2, o = 0.15 + rnd() * 0.5;
    sparks += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#F5C542" opacity="${o.toFixed(2)}"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
    <defs>
      <radialGradient id="bg" cx="50%" cy="34%" r="80%">
        <stop offset="0%" stop-color="#2a230f"/>
        <stop offset="45%" stop-color="#14110a"/>
        <stop offset="100%" stop-color="#070706"/>
      </radialGradient>
      <linearGradient id="sil" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FBE9A7"/>
        <stop offset="45%" stop-color="#F5C542"/>
        <stop offset="100%" stop-color="#C9A227"/>
      </linearGradient>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#F5C542" stop-opacity="0.9"/>
        <stop offset="70%" stop-color="#C9A227" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#C9A227" stop-opacity="0.05"/>
      </linearGradient>
      <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
    </defs>
    <rect width="800" height="1000" fill="url(#bg)"/>
    ${sparks}
    <g opacity="0.20" filter="url(#soft)">
      <circle cx="400" cy="360" r="150" fill="url(#sil)"/>
      <path d="M180 1000 C180 720 260 610 400 610 C540 610 620 720 620 1000 Z" fill="url(#sil)"/>
    </g>
    <g fill="url(#fade)">
      <circle cx="400" cy="360" r="132"/>
      <path d="M205 1000 C205 735 285 640 400 640 C515 640 595 735 595 1000 Z"/>
    </g>
    <circle cx="400" cy="360" r="132" fill="none" stroke="#FBE9A7" stroke-opacity="0.5" stroke-width="1.5"/>
    <text x="400" y="392" font-family="Playfair Display, Georgia, serif" font-size="150" font-weight="600"
      text-anchor="middle" fill="#0B0A08" opacity="0.85">${initial}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/* image element that tries a real photo, falls back to silhouette */
function avatarImg(a, cls = '') {
  const ph = silhouette(a.name, a.seed).replace(/"/g, '&quot;');
  return `<img class="${cls}" alt="${a.name}" src="avatars/${a.id}.jpg"
    onerror="if(!this.dataset.step){this.dataset.step='1';this.src='avatars/${a.id}.png';}else{this.onerror=null;this.src='${ph}';}">`;
}

function starRow(n) {
  if (n === null) return '';
  let out = '';
  for (let i = 0; i < 5; i++) out += i < n ? '★' : '<span class="off">★</span>';
  return `<span class="stars">${out}</span>`;
}

/* ---------------- Logo mark (golden heart of two connected dots) ---------------- */
const LOGO_MARK = `<svg class="mark" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#FBE9A7"/><stop offset="55%" stop-color="#F5C542"/><stop offset="100%" stop-color="#C9A227"/>
  </linearGradient></defs>
  <path d="M20 33 C 8 24, 6 15, 12 11 C 16 8, 20 11, 20 15 C 20 11, 24 8, 28 11 C 34 15, 32 24, 20 33 Z"
    fill="none" stroke="url(#lg)" stroke-width="2.2" stroke-linejoin="round"/>
  <circle cx="12.5" cy="13" r="3.4" fill="url(#lg)"/>
  <circle cx="27.5" cy="13" r="3.4" fill="url(#lg)"/>
</svg>`;

/* ---------------- Notifications data ---------------- */
const NOTIFS = [
  { t: 'പ്രിയംവദ sent you a message.', time: 'Just now' },
  { t: 'പ്രിയംവദ misses you. 💛', time: '3 min ago' },
  { t: 'Relationship level increased to 96%.', time: '20 min ago' },
  { t: 'Video Call Requested.', time: '1 hr ago' },
  { t: 'Good Morning received.', time: 'Today, 7:02 AM' },
  { t: 'Emotional sync completed for the week.', time: 'Yesterday' }
];

/* ---------------- Sidebar nav ---------------- */
const NAV = [
  ['Dashboard', 'dashboard.html'],
  ['Partners', 'catalogue.html'],
  ['Analytics', 'analytics.html'],
  ['Billing', 'billing.html'],
  ['Support', 'support.html']
];

const NAV_ICONS = {
  'Dashboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="8" height="8" rx="2"/><rect x="13" y="3" width="8" height="5" rx="2"/><rect x="13" y="12" width="8" height="9" rx="2"/><rect x="3" y="14" width="8" height="7" rx="2"/></svg>',
  'Partners': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.1-4.4-9.6-8.6C.6 8.6 2.9 5 6.6 5c2.1 0 3.6 1.4 5.4 3.4C13.8 6.4 15.3 5 17.4 5c3.7 0 6 3.6 4.2 7.4C19.1 16.6 12 21 12 21z"/></svg>',
  'Analytics': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="4" y1="20" x2="4" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="20" y1="20" x2="20" y2="14"/></svg>',
  'Billing': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2.5"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
  'Support': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>'
};

/* ---------------- Build chrome ---------------- */
function buildChrome() {
  const here = (location.pathname.split('/').pop() || 'index.html');

  // particle canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'pw-particles';
  document.body.prepend(canvas);

  // light streaks
  const streaks = document.createElement('div');
  streaks.className = 'pw-streaks';
  for (let i = 0; i < 7; i++) {
    const st = document.createElement('div');
    st.className = 'pw-streak';
    st.style.left = (8 + Math.random() * 88) + '%';
    st.style.animationDuration = (7 + Math.random() * 8) + 's';
    st.style.animationDelay = (-Math.random() * 12) + 's';
    st.style.height = (28 + Math.random() * 30) + 'vh';
    streaks.appendChild(st);
  }
  document.body.prepend(streaks);

  // fixed top bar — logo + notifications + profile (always visible)
  const topbar = document.createElement('nav');
  topbar.className = 'pw-nav';
  topbar.innerHTML = `
    <a class="pw-logo" href="index.html">
      ${LOGO_MARK}
      <span class="word">Partner<b>World</b></span>
    </a>
    <div class="pw-nav-right">
      <div class="pw-bell" id="pw-bell" title="Notifications">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>
        <span class="dot"></span>
      </div>
      <div class="pw-avatar-btn" title="User Profile">V</div>
    </div>`;
  document.body.prepend(topbar);

  // fixed left sidebar — stays in place while page content scrolls
  const sidebar = document.createElement('aside');
  sidebar.className = 'pw-sidebar';
  sidebar.innerHTML = `
    <div class="pw-sidebar-links">
      ${NAV.map(([label, href]) => `
        <a href="${href}" class="pw-side-link ${here === href ? 'active' : ''}">
          ${NAV_ICONS[label]}
          <span>${label}</span>
        </a>`).join('')}
    </div>
    <div class="pw-sidebar-foot">
      <div class="ai-mini">✦ AI Prediction Engine<br><span>Live · Model 3.4</span></div>
    </div>`;
  document.body.prepend(sidebar);

  // notifications panel + backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'pw-backdrop';
  backdrop.id = 'pw-backdrop';
  const panel = document.createElement('aside');
  panel.className = 'pw-notif-panel';
  panel.id = 'pw-notif';
  panel.innerHTML = `
    <div class="pw-notif-head">
      <h3>Notifications</h3>
      <button class="close" id="pw-notif-close">✕</button>
    </div>
    <div class="pw-notif-list">
      ${NOTIFS.map(n => `
        <div class="notif">
          <div class="tick">✓</div>
          <div class="body"><p>${n.t}</p><time>${n.time}</time></div>
        </div>`).join('')}
    </div>`;
  document.body.appendChild(backdrop);
  document.body.appendChild(panel);

  const open = () => { panel.classList.add('open'); backdrop.classList.add('open'); };
  const close = () => { panel.classList.remove('open'); backdrop.classList.remove('open'); };
  document.getElementById('pw-bell').addEventListener('click', open);
  document.getElementById('pw-notif-close').addEventListener('click', close);
  backdrop.addEventListener('click', close);

  buildRevealModal();
}

/* ---------------- Reveal modal: horizontally-spinning portrait popup ---------------- */
let _revealTimer = null;

function buildRevealModal() {
  const wrap = document.createElement('div');
  wrap.className = 'pw-reveal-backdrop';
  wrap.id = 'pw-reveal-backdrop';
  wrap.innerHTML = `
    <div class="pw-reveal-modal">
      <button class="pw-reveal-close" id="pw-reveal-close" aria-label="Close">✕</button>
      <div class="pw-reveal-stage">
        <div class="pw-reveal-ring"></div>
        <div class="pw-reveal-portrait" id="pw-reveal-portrait"></div>
      </div>
      <div class="pw-reveal-name" id="pw-reveal-name"></div>
      <div class="pw-reveal-status" id="pw-reveal-status">Establishing emotional link…</div>
    </div>`;
  document.body.appendChild(wrap);
  document.getElementById('pw-reveal-close').addEventListener('click', closeRevealModal);
  wrap.addEventListener('click', (e) => { if (e.target === wrap) closeRevealModal(); });
}

function openRevealModal(id, dest) {
  const a = AVATARS.find(x => x.id === id);
  if (!a) { window.location.href = dest; return; }
  const portrait = document.getElementById('pw-reveal-portrait');
  portrait.innerHTML = '';
  portrait.classList.remove('spin');
  void portrait.offsetWidth; // restart animation
  portrait.innerHTML = avatarImg(a);
  portrait.classList.add('spin');
  document.getElementById('pw-reveal-name').textContent = a.name;
  document.getElementById('pw-reveal-status').textContent = 'Establishing emotional link…';
  document.getElementById('pw-reveal-backdrop').classList.add('open');
  clearTimeout(_revealTimer);
  _revealTimer = setTimeout(() => { window.location.href = dest; }, 2000);
}

function closeRevealModal() {
  document.getElementById('pw-reveal-backdrop').classList.remove('open');
  clearTimeout(_revealTimer);
}

/* ---------------- Collapsible sections (Users panel, etc.) ---------------- */
function initCollapsibles() {
  document.querySelectorAll('.collapsible-head').forEach(head => {
    const body = head.nextElementSibling;
    if (!body) return;
    head.addEventListener('click', () => {
      const isOpen = head.classList.toggle('open');
      body.classList.toggle('open', isOpen);
      // measure actual content height so any amount of content expands cleanly
      body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0px';
    });
  });
}

/* ---------------- Particle field ---------------- */
function startParticles() {
  const canvas = document.getElementById('pw-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const COUNT = Math.min(120, Math.floor(window.innerWidth / 12));

  function resize() {
    w = canvas.width = window.innerWidth * devicePixelRatio;
    h = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
  }
  function make() {
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        r: (Math.random() * 1.8 + 0.4) * devicePixelRatio,
        vy: (-Math.random() * 0.35 - 0.06) * devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.25 * devicePixelRatio,
        a: Math.random() * 0.6 + 0.15,
        tw: Math.random() * Math.PI * 2,
        tws: Math.random() * 0.04 + 0.008
      });
    }
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.y += p.vy; p.x += p.vx; p.tw += p.tws;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
      const glow = p.a * (0.55 + 0.45 * Math.sin(p.tw));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245,197,66,${glow})`;
      ctx.shadowBlur = 8 * devicePixelRatio;
      ctx.shadowColor = 'rgba(245,197,66,0.8)';
      ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  resize(); make(); frame();
  window.addEventListener('resize', () => { resize(); make(); });
}

/* ---------------- Animations: reveal, counters, trait bars, rings ---------------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const dec = parseInt(el.dataset.decimals || '0');
  const dur = 1400, start = performance.now();
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  function step(now) {
    const t = Math.min(1, (now - start) / dur);
    const e = 1 - Math.pow(1 - t, 3);
    const v = target * e;
    el.textContent = prefix + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')) + suffix;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = prefix + (dec ? target.toFixed(dec) : Math.round(target).toLocaleString('en-IN')) + suffix;
  }
  requestAnimationFrame(step);
}

function runObservers() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in');
      if (el.dataset.count !== undefined) animateCount(el);
      if (el.classList.contains('trait-fill')) el.style.width = el.dataset.fill + '%';
      if (el.dataset.ring !== undefined) {
        const circ = parseFloat(el.dataset.circ);
        el.style.strokeDashoffset = circ * (1 - parseFloat(el.dataset.ring));
      }
      io.unobserve(el);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.reveal, [data-count], .trait-fill, [data-ring]').forEach(el => io.observe(el));
}

/* ---------------- Boot ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  buildChrome();
  startParticles();
  initCollapsibles();
  // let injected DOM settle, then observe
  requestAnimationFrame(runObservers);
});
