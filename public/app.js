// CA-882 Family Network: Application Scripts


var hasInteractedWithRoles = false;

// ── UNIT WEBSITE POPUP ──
function openUnitWebsitePopup() {
  var popup = document.getElementById('unit-website-popup');
  var card  = document.getElementById('unit-website-popup-card');
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      card.style.transform = 'scale(1) translateY(0)';
      card.style.opacity = '1';
    });
  });
}
function closeUnitWebsitePopup() {
  var popup = document.getElementById('unit-website-popup');
  var card  = document.getElementById('unit-website-popup-card');
  card.style.transform = 'scale(0.88) translateY(20px)';
  card.style.opacity = '0';
  setTimeout(function() {
    popup.style.display = 'none';
    document.body.style.overflow = '';
  }, 380);
}
document.addEventListener('keydown', function(e) { if(e.key==='Escape') closeUnitWebsitePopup(); });

// ── SKIP NAV + SIGNUP FLASH ──
function spawnParty(container, fromBottom) {
  // CA-882 palette: gold-heavy left burst, blue-heavy right burst, mixed center rise
  const GOLD   = ['#FFC72C','#FFD966','#fff3b0','#e6a800'];
  const BLUE   = ['#003087','#1c4197','#4a6fbd','#001d59'];
  const MIXED  = ['#FFC72C','#003087','#ffffff','#FFD966','#4a6fbd','#fff3b0'];
  const EMOJIS = ['🎉','🎊','⭐','🌟','🏆','✨','🎖️','🥇','💫'];

  const wrap = document.createElement('div');
  if (fromBottom) {
    // Fixed to viewport so layout changes (form expanding) don't shift animations.
    // Appended to body so it's fully outside the container's stacking/reflow context.
    const rect = container.getBoundingClientRect();
    wrap.style.cssText = `position:fixed;pointer-events:none;z-index:9997;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;`;
    document.body.appendChild(wrap);
  } else {
    wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:3;overflow:hidden;';
    container.prepend(wrap);
  }

  function piece(color, x, y, anim, dur, del, w, h, rot, round) {
    const el = document.createElement('div');
    el.style.cssText = [
      `position:absolute`,
      `left:${x}%`, `top:${y}%`,
      `width:${w}px`, `height:${h}px`,
      `background:${color}`,
      `border-radius:${round ? '50%' : '2px'}`,
      `transform:rotate(${rot}deg)`,
      `animation:${anim} ${dur}s cubic-bezier(0.22,1,0.36,1) ${del}s forwards`
    ].join(';');
    wrap.appendChild(el);
  }

  if (fromBottom) {
    // ── Zone 1: LEFT BURST: gold palette, left 0-20% of section ──
    for (let i = 0; i < 18; i++) {
      const x   = Math.random() * 18;
      const y   = 55 + Math.random() * 40;   // bottom half
      const col = GOLD[Math.floor(Math.random() * GOLD.length)];
      const w   = 4 + Math.random() * 6, h = w * (0.4 + Math.random() * 0.7);
      piece(col, x, y, 'confettiBurstLeft', 1.8 + Math.random() * 0.8, i * 0.04, w, h, Math.random()*360, Math.random()>0.6);
    }

    // ── Zone 2: CENTER RISE: mixed palette, 25-75% horizontal ──
    for (let i = 0; i < 18; i++) {
      const x   = 25 + Math.random() * 50;
      const y   = 60 + Math.random() * 35;
      const col = MIXED[Math.floor(Math.random() * MIXED.length)];
      const w   = 4 + Math.random() * 5, h = w * (0.35 + Math.random() * 0.6);
      piece(col, x, y, 'confettiRise', 1.6 + Math.random() * 1.0, i * 0.045, w, h, Math.random()*360, Math.random()>0.5);
    }

    // ── Zone 3: RIGHT BURST: blue palette, right 80-100% of section ──
    for (let i = 0; i < 18; i++) {
      const x   = 80 + Math.random() * 18;
      const y   = 55 + Math.random() * 40;
      const col = BLUE[Math.floor(Math.random() * BLUE.length)];
      const w   = 4 + Math.random() * 6, h = w * (0.4 + Math.random() * 0.7);
      piece(col, x, y, 'confettiBurstRight', 1.8 + Math.random() * 0.8, i * 0.04, w, h, Math.random()*360, Math.random()>0.6);
    }

    // ── Emojis: scattered mid-section, staggered rise ──
    for (let i = 0; i < 12; i++) {
      const el  = document.createElement('span');
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      const x   = 5 + Math.random() * 88;
      const y   = 30 + Math.random() * 55;
      const sz  = 15 + Math.random() * 16;
      const dur = 1.8 + Math.random() * 1.0;
      el.style.cssText = `position:absolute;left:${x}%;top:${y}%;font-size:${sz}px;line-height:1;animation:emojiFloat ${dur}s ease-out ${i*0.09}s forwards;opacity:0;`;
      wrap.appendChild(el);
    }
  } else {
    // Modal (compact): balanced gold + blue, center-heavy
    for (let i = 0; i < 12; i++) {
      const x   = 5 + Math.random() * 40;
      const y   = 20 + Math.random() * 60;
      const col = GOLD[Math.floor(Math.random() * GOLD.length)];
      const w   = 4 + Math.random() * 5, h = w * (0.4 + Math.random() * 0.6);
      piece(col, x, y, 'confettiBurstLeft', 1.6 + Math.random() * 0.8, i * 0.05, w, h, Math.random()*360, Math.random()>0.5);
    }
    for (let i = 0; i < 12; i++) {
      const x   = 55 + Math.random() * 40;
      const y   = 20 + Math.random() * 60;
      const col = BLUE[Math.floor(Math.random() * BLUE.length)];
      const w   = 4 + Math.random() * 5, h = w * (0.4 + Math.random() * 0.6);
      piece(col, x, y, 'confettiBurstRight', 1.6 + Math.random() * 0.8, i * 0.05, w, h, Math.random()*360, Math.random()>0.5);
    }
  }

  setTimeout(() => wrap.remove(), 4500);
}

function flashSignup() {
  const signup = document.getElementById('signup');
  if (!signup) return;
  signup.querySelectorAll('.signup-spotlight,.signup-gold-sweep').forEach(el => el.remove());
  const spot = document.createElement('div');
  spot.className = 'signup-spotlight';
  signup.prepend(spot);
  spot.addEventListener('animationend', () => spot.remove(), { once: true });
  const gold = document.createElement('div');
  gold.className = 'signup-gold-sweep';
  signup.prepend(gold);
  setTimeout(() => gold.remove(), 1700);
  setTimeout(() => { spawnParty(signup, true); }, 650);
  // Glow now runs by default via CSS ::after animation; no JS needed
}

function hideSkip() {
  var signup = document.getElementById('signup');
  if (!signup) return;
  var y = signup.getBoundingClientRect().top + window.pageYOffset;
  // Route through the inertia system so the scroll feels smooth, not a native snap
  if (window._inertiaScrollTo) {
    window._inertiaScrollTo(y);
  } else {
    signup.scrollIntoView({ behavior: 'smooth' });
  }
  setTimeout(flashSignup, 500);
}

// ── LIGHTBOX ──
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  img.src = src;
  lb.style.display = 'flex';
  requestAnimationFrame(() => {
    lb.style.opacity = '1';
    img.style.transform = 'scale(1)';
  });
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  lb.style.opacity = '0';
  img.style.transform = 'scale(0.85)';
  setTimeout(() => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }, 400);
}

(function() {
  const signup = document.getElementById('signup');
  if (!signup || !window.IntersectionObserver) return;
  let fired = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) { fired=true; flashSignup(); obs.disconnect(); }
  }, { threshold: 0.2 });
  obs.observe(signup);
})();

// Skip-nav visibility: IntersectionObserver avoids getBoundingClientRect reflow on every scroll tick
(function() {
  const signup = document.getElementById('signup');
  const nav    = document.getElementById('skip-nav');
  if (!signup || !nav || !window.IntersectionObserver) return;

  function setNav(hide) {
    nav.style.opacity       = hide ? '0' : '1';
    nav.style.transform     = hide ? 'translateY(20px)' : 'translateY(0)';
    nav.style.pointerEvents = hide ? 'none' : 'auto';
    nav.querySelectorAll('a').forEach(el => { el.style.pointerEvents = hide ? 'none' : 'auto'; });
  }

  const obs = new IntersectionObserver(entries => {
    setNav(entries[0].isIntersecting);
  }, { threshold: 0.15 });

  obs.observe(signup);
})();

// ── ROLE SELECTION ──
function selectType(type) {
  const active = document.getElementById('btn-' + type);
  const panel  = document.getElementById('form-' + type);
  const isOpen = active && active.classList.contains('selected');
  hasInteractedWithRoles = true;
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.remove('selected');
    btn.classList.remove('glow-active');
  });
  document.querySelectorAll('.form-panel').forEach(p => {
    if (p.style.display === 'block') {
      p.classList.remove('panel-enter');
      p.classList.add('panel-exit');
      const t = p;
      setTimeout(() => { if (t.classList.contains('panel-exit')) { t.classList.remove('panel-exit'); t.style.display='none'; } }, 370);
    }
  });
  if (!isOpen && panel) {
    active.classList.add('selected');
    panel.classList.remove('panel-exit');
    panel.style.display = 'block';
    requestAnimationFrame(() => { panel.classList.add('panel-enter'); });
  }
}

// ── CAROUSEL: infinite scroll + drag (both directions, loops forever) ──
(function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const container = document.querySelector('.carousel-container');
  if (!track || !container) return;

  // Kill the CSS animation; JS drives everything
  track.style.animation = 'none';

  // Clone all original slides and append so track = 2× width
  // (seamless: when posX hits -origWidth we reset to 0; visually identical)
  const origSlides = Array.from(track.children);
  origSlides.forEach(s => track.appendChild(s.cloneNode(true)));

  // Inject hint + scrubber below the container
  const hint = document.createElement('div');
  hint.className = 'carousel-hint';
  hint.innerHTML = '<svg width="14" height="9" viewBox="0 0 12 8" fill="none" style="display:block;margin:0 auto 3px;"><path d="M1 4h10M1 4l2.5-2.5M1 4l2.5 2.5M11 4L8.5 1.5M11 4L8.5 6.5" stroke="#747683" stroke-width="1.2" stroke-linecap="round"/></svg>drag to explore';
  container.parentNode.insertBefore(hint, container.nextSibling);
  const scrubWrap = document.createElement('div');
  scrubWrap.className = 'carousel-scrubber';
  const scrubThumb = document.createElement('div');
  scrubThumb.className = 'carousel-scrubber-thumb';
  scrubWrap.appendChild(scrubThumb);
  hint.parentNode.insertBefore(scrubWrap, hint.nextSibling);

  const PX_PER_SEC = 55;
  const RESUME_DELAY = 2200;
  let posX = 0, playing = true, isDragging = false;
  let dragStartX = 0, dragStartPos = 0;
  let lastTS = null, resumeTimer = null;

  // Width of one full set of slides (half the doubled track)
  function cycleWidth() { return track.scrollWidth / 2; }

  // Keep posX within (-cycleWidth, 0]: the seamless window
  function wrap() {
    const w = cycleWidth();
    if (w <= 0) return;
    if (posX <= -w) posX += w;
    if (posX > 0)  posX -= w;
  }

  function applyPos() {
    track.style.transform = 'translate3d(' + posX + 'px,0,0)';
    const w = cycleWidth();
    const prog = w > 0 ? Math.abs(posX) / w : 0;
    const rail = scrubWrap.offsetWidth - scrubThumb.offsetWidth;
    scrubThumb.style.left = (prog * rail) + 'px';
  }

  // RAF loop: only advances when not dragging
  function tick(ts) {
    if (!isDragging && playing) {
      if (lastTS !== null) {
        posX -= PX_PER_SEC * (ts - lastTS) / 1000;
        wrap();
        applyPos();
      }
      lastTS = ts;
    } else {
      lastTS = null;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ── Drag ──
  function dragStart(x) {
    isDragging = true;
    playing = false;
    dragStartX = x;
    dragStartPos = posX;
    clearTimeout(resumeTimer);
    container.classList.add('dragging');
    scrubThumb.style.transition = 'none';
  }

  function dragMove(x) {
    if (!isDragging) return;
    posX = dragStartPos + (x - dragStartX);
    // Seamless infinite: shift reference point on boundary cross so drag feels continuous
    const w = cycleWidth();
    if (posX > 0)  { posX -= w; dragStartPos -= w; }
    if (posX <= -w){ posX += w; dragStartPos += w; }
    applyPos();
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove('dragging');
    scrubThumb.style.transition = '';
    wrap();
    applyPos();
    resumeTimer = setTimeout(() => { playing = true; }, RESUME_DELAY);
  }

  container.addEventListener('mousedown',  e => { dragStart(e.clientX); e.preventDefault(); });
  window.addEventListener('mousemove',     e => { if (isDragging) dragMove(e.clientX); });
  window.addEventListener('mouseup',       dragEnd);
  container.addEventListener('touchstart', e => { dragStart(e.touches[0].clientX); }, { passive: true });
  container.addEventListener('touchmove',  e => { if (isDragging) { dragMove(e.touches[0].clientX); e.preventDefault(); } }, { passive: false });
  container.addEventListener('touchend',   dragEnd);
})();

// ── ERROR HELPERS ──
function showErr(id, show) {
  const el = document.getElementById(id);
  if (el) { el.style.display = show ? 'block' : 'none'; }
}
function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

const LIST_IDS = { student: 6, parent: 7, supporter: 8 };

// ── FORM SUBMISSION ──
async function submitForm(type) {
  let firstName, lastName, email;
  const attributes = {};
  let valid = true;

  if (type === 'student') {
    firstName = document.getElementById('s-firstname').value.trim();
    lastName  = document.getElementById('s-lastname').value.trim();
    const sid    = document.getElementById('s-studentid').value.trim();
    email        = document.getElementById('s-email').value.trim();
    if (!firstName)              { showErr('s-firstname-err', true); valid = false; } else showErr('s-firstname-err', false);
    if (!lastName)               { showErr('s-lastname-err', true);  valid = false; } else showErr('s-lastname-err', false);
    if (!/^\d{6}$/.test(sid))   { showErr('s-studentid-err', true); valid = false; } else showErr('s-studentid-err', false);
    if (!validateEmail(email))   { showErr('s-email-err', true);     valid = false; } else showErr('s-email-err', false);
    if (valid) {
      attributes.STUDENT_ID = sid;
      attributes.SPONSORSHIP = "N/A";
      attributes.VOLUNTEER_INTERESTS = "N/A";
      attributes.PHONE = "N/A";
      attributes.NOTES_TEASER = "N/A";
      attributes.HOW_DYK_US = "N/A";
    }

  } else if (type === 'parent') {
    firstName     = document.getElementById('p-firstname').value.trim();
    lastName      = document.getElementById('p-lastname').value.trim();
    email         = document.getElementById('p-email').value.trim();
    const pid     = document.getElementById('p-studentid').value.trim();
    const phone   = document.getElementById('p-phone').value.trim().replace(/[^0-9]/g,'');
    const checked = [...document.querySelectorAll('input[name="p-vol"]:checked')].map(c => c.value);
    const notes   = document.getElementById('p-notes').value.trim();
    if (!firstName)            { showErr('p-firstname-err', true);  valid = false; } else showErr('p-firstname-err', false);
    if (!lastName)             { showErr('p-lastname-err', true);   valid = false; } else showErr('p-lastname-err', false);
    if (!validateEmail(email)) { showErr('p-email-err', true);      valid = false; } else showErr('p-email-err', false);
    if (!/^\d{6}$/.test(pid)) { showErr('p-studentid-err', true);  valid = false; } else showErr('p-studentid-err', false);
    if (valid) {
      attributes.STUDENT_ID = pid;
      attributes.SPONSORSHIP = "N/A";
    }
    if (phone) attributes.PHONE = phone;
    if (checked.length) attributes.VOLUNTEER_INTERESTS = checked.join(', ');
    if (notes) attributes.NOTES_TEASER = notes;

  } else {
    firstName      = document.getElementById('su-firstname').value.trim();
    lastName       = document.getElementById('su-lastname').value.trim();
    email          = document.getElementById('su-email').value.trim();
    const prefix   = document.getElementById('su-phone-prefix').value.trim();
    const phone    = document.getElementById('su-phone').value.trim().replace(/[^0-9]/g,'');
    const checked  = [...document.querySelectorAll('input[name="su-vol"]:checked')].map(c => c.value);
    const notes    = document.getElementById('su-notes').value.trim();
    const dyk      = document.getElementById('su-dyk') ? document.getElementById('su-dyk').value.trim() : '';
    const dykOther = document.getElementById('su-dyk-other') ? document.getElementById('su-dyk-other').value.trim() : '';
    const isSponsor = document.getElementById('su-sponsorship') ? document.getElementById('su-sponsorship').checked : false;
    const orgName   = document.getElementById('su-org') ? document.getElementById('su-org').value.trim() : '';
    if (!firstName)            { showErr('su-firstname-err', true); valid = false; } else showErr('su-firstname-err', false);
    if (!lastName)             { showErr('su-lastname-err', true);  valid = false; } else showErr('su-lastname-err', false);
    if (!validateEmail(email)) { showErr('su-email-err', true);     valid = false; } else showErr('su-email-err', false);
    if (phone) attributes.PHONE = prefix + phone;
    if (checked.length) attributes.VOLUNTEER_INTERESTS = checked.join(', ');
    if (notes) attributes.NOTES_TEASER = notes;
    if (dyk) attributes.HOW_DYK_US = dyk === 'Other' && dykOther ? dykOther : dyk;
    attributes.SPONSORSHIP = isSponsor ? ("Yes: " + (orgName || "Individual/Not specified")) : "No";
    attributes.STUDENT_ID = "N/A";
  }

  if (!valid) return;

  // Final Attribute Assembly & Normalization
  attributes.FIRSTNAME = firstName;
  attributes.LASTNAME  = lastName;

  const allKeys = ['STUDENT_ID', 'SPONSORSHIP', 'PHONE', 'VOLUNTEER_INTERESTS', 'NOTES_TEASER', 'HOW_DYK_US'];
  
  allKeys.forEach(k => {
    if (type === 'student') {
      // Students: Set specific fields to N/A if they aren't already set (like STUDENT_ID)
      if (k !== 'STUDENT_ID' && (!attributes[k] || attributes[k].trim() === '')) {
        attributes[k] = 'N/A';
      }
      // Ensure specific fields are N/A even if they were somehow set
      if (['SPONSORSHIP', 'VOLUNTEER_INTERESTS', 'PHONE', 'NOTES_TEASER', 'HOW_DYK_US'].includes(k)) {
        attributes[k] = 'N/A';
      }
    } else {
      // Parents & Supporters: Use 'X' for any empty optional fields
      if (!attributes[k] || attributes[k].trim() === '') {
        // Exception: STUDENT_ID for supporters is N/A
        if (k === 'STUDENT_ID' && type === 'supporter') {
          attributes[k] = 'N/A';
        } else {
          attributes[k] = 'X';
        }
      }
    }
  });

  const btnLabels = { student: 'Complete Registration', parent: 'Complete Registration', supporter: 'Complete Registration' };
  const btn = document.querySelector('#form-' + type + ' button[onclick]');
  btn.disabled = true;
  btn.textContent = 'Submitting...';

  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, type, listId: LIST_IDS[type], attributes })
    });
    if (res.ok || res.status === 204) {
      showSuccessModal(type);
    } else {
      const errData = await res.json().catch(() => ({}));
      const msg = errData.message || ('Request failed (' + res.status + ')');
      alert(res.status === 429 ? msg : 'Submission error: ' + msg);
    }
  } catch (err) {
    alert('Network error: ' + err.message);
  } finally {
    btn.disabled = false;
    btn.textContent = btnLabels[type] || 'Submit';
  }
}

function showSuccessModal(type) {
  const modal  = document.getElementById('success-modal');
  const msg    = document.getElementById('success-msg');
  const labels = { student: "You're In, Cadet.", parent: "You're In.", supporter: "You're In." };
  msg.textContent = labels[type] || "You're In.";
  modal.style.display = 'flex';
  // Double rAF guarantees the browser has painted display:flex before starting the transition
  // (single setTimeout(15) is not reliable on first open; browser may batch the paints)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add('open');
    });
  });
  document.body.style.overflow = 'hidden';
  // Party on the modal
  setTimeout(() => {
    const inner = modal.querySelector('#success-modal-content');
    if (inner) { inner.style.position='relative'; spawnParty(inner, false); }
  }, 750);
}

function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  modal.classList.remove('open');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 500);
}

// ── INIT: no form shown until user clicks a role ──


// ── Marching ants sizing for after-reg-wrap ──
(function(){
  function sizeAnts(wrap){
    var rect = wrap.querySelector('.marching-rect-el');
    if(!rect) return;
    function upd(){
      var w = wrap.offsetWidth, h = wrap.offsetHeight;
      if(w > 0 && h > 0){
        rect.setAttribute('x', '1');
        rect.setAttribute('y', '1');
        rect.setAttribute('width',  w - 2);
        rect.setAttribute('height', h - 2);
      }
    }
    upd();
    window.addEventListener('resize', upd);
    // ResizeObserver fires when element goes from hidden to visible
    if(window.ResizeObserver){
      new ResizeObserver(upd).observe(wrap);
    }
  }
  function initAnts(){
    document.querySelectorAll('.after-reg-wrap').forEach(sizeAnts);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', initAnts);
  } else { initAnts(); }
})();

// ── Sponsorship modal ──
function openSponsorModal(){
  document.getElementById('sponsor-modal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeSponsorModal(){
  document.getElementById('sponsor-modal').classList.remove('open');
  document.body.style.overflow='';
}
function goToSponsorForm(){
  closeSponsorModal();
  // Select supporter tab
  selectType('supporter');
  // Scroll to form
  var signup=document.getElementById('signup');
  if(signup) signup.scrollIntoView({behavior:'smooth',block:'start'});
  // After scroll settles, check the sponsorship box and pulse it
  setTimeout(function(){
    var cb=document.getElementById('su-sponsorship');
    if(cb && !cb.checked){ cb.checked=true; cb.dispatchEvent(new Event('change')); }
    var block=document.getElementById('sponsorship-block');
    if(block){ block.classList.remove('highlighted'); void block.offsetWidth; block.classList.add('highlighted'); }
  }, 600);
}
// Show org field when sponsorship is checked
document.addEventListener('DOMContentLoaded',function(){
  var cb=document.getElementById('su-sponsorship');
  if(cb) cb.addEventListener('change',function(){
    document.getElementById('su-org-wrap').style.display=this.checked?'block':'none';
  });
  // ESC closes modals
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){ closeSponsorModal(); closeSuccessModal(); return; }
    // Enter submits whichever form panel is currently open
    if(e.key==='Enter'){
      if(e.target && e.target.tagName==='TEXTAREA') return; // let textarea handle its own Enter
      var types=['student','parent','supporter'];
      for(var i=0;i<types.length;i++){
        var panel=document.getElementById('form-'+types[i]);
        if(panel && panel.style.display==='block'){
          submitForm(types[i]);
          break;
        }
      }
    }
  });
});

// ── Count-up animation ──
(function(){
  function easeOut(t){ return 1 - Math.pow(1-t, 3); }
  function animateCount(el){
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = Math.min(1800, Math.max(800, target * 0.6));
    var start = null;
    function step(ts){
      if(!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var val = Math.round(easeOut(progress) * target);
      // format with comma if >= 1000
      var formatted = val >= 1000 ? val.toLocaleString() : String(val);
      el.textContent = formatted + suffix;
      if(progress < 1) requestAnimationFrame(step);
      else el.textContent = (target >= 1000 ? target.toLocaleString() : target) + suffix;
    }
    requestAnimationFrame(step);
  }
  function initCounters(){
    var els = document.querySelectorAll('[data-count]');
    if(!els.length) return;
    if(!window.IntersectionObserver){
      els.forEach(function(el){ animateCount(el); });
      return;
    }
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    els.forEach(function(el){ obs.observe(el); });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initCounters);
  } else { initCounters(); }
})();


// ── Team modal data and logic ──
var TEAMS = [
  {
    num: "01", name: "JLAB", sub: "Joint Leadership Academic Bowl",
    what: "Cadets compete in a rigorous multi-subject academic challenge against other JROTC units, covering history, science, math, current events, and leadership. CA-882 advanced to nationals in Washington D.C. in 25-26.",
    needs: [
      "Study materials and practice resources",
      "Coaching and preparation support"
    ]
  },
  {
    num: "02", name: "StellarXplorers", sub: "Physics and Aerospace Design",
    what: "Teams design and optimize satellite orbits using real aerospace engineering principles, competing against units nationwide. CA-882 reached national semi-finals in 25-26. The program builds direct STEM career pathways as it ramps for 26-27.",
    needs: [
      "Software licenses and simulation tools",
      "STEM reference materials and training resources"
    ]
  },
  {
    num: "03", name: "Raiders", sub: "Physical and Military Skills · Ramping for Nationals",
    what: "One of the most physically demanding AFJROTC programs. Cadets compete in events including one-rope bridge, litter carry, navigation, and physical fitness challenges. CA-882 is ramping up for Raiders nationals in 26-27, which requires sustained team conditioning, specialized gear, and competition travel support.",
    needs: [
      "Static rope (150+ ft): high-wear, replaced each season",
      "Military-spec litters and stretchers",
      "Carabiners, prusik cords, and rigging hardware",
      "Rucksacks, boots, hydration systems, first aid kits",
      "Regional competition travel and entry fees",
      "Support for Raiders nationals travel and competition costs"
    ]
  },
  {
    num: "04", name: "Drill and Ceremonies", sub: "Drill Team, Color Guard, Honor Guard",
    what: "Cadets present and retire the colors at school rallies, football games, and community events throughout the year. Color Guard flies the flags during the national anthem at sports games and official ceremonies across the district. Honor Guard serves at formal events. The Montrose Christmas Parade is a standing annual commitment. The team also competes at regional drill meets.",
    needs: [
      "Performance rifles (maintenance and replacement)",
      "Specialized uniform items: ascots, gloves, berets, dress boots",
      "Transportation to drill meets, sports games, and community events",
      "Competition registration fees"
    ]
  },
  {
    num: "05", name: "KHAS", sub: "Kitty Hawk Air Society: Academic Honor Society and Service",
    what: "KHAS recognizes cadets for academic achievement and channels that into structured service. The chapter runs community service events, donation drives, and neighborhood programs that accounted for a significant portion of the corps' 4,100+ service hours in 25-26, with more planned as service ramps for 26-27.",
    needs: [
      "Supplies for donation drives and food bank events",
      "Logistics support for service events (transportation, materials)",
      "Chapter administrative costs and recognition awards",
      "Funding to expand the number of events per year"
    ]
  },
  {
    num: "06", name: "MWR", sub: "Morale, Welfare, and Recreation: Fundraising",
    what: "MWR runs the corps' internal fundraising operations and morale programs. This program directly reduces the financial burden on cadet families by generating unit funds used across all cocurriculars and programs.",
    needs: [
      "Startup capital for fundraising events and sales",
      "Supplies and materials for corps morale activities",
      "Support for unit-wide events that benefit all cadets"
    ]
  },
  {
    num: "07", name: "CyberPatriot", sub: "Cyber Defense Competition · Active and Ramping",
    what: "CyberPatriot is the national youth cyber defense competition program. CA-882's CyberPatriot team is already open and underway, and is ramping for 26-27. Cadets compete by securing simulated networks against live attacks, building directly applicable cybersecurity skills.",
    needs: [
      "Ongoing registration and competition fees with CyberPatriot national",
      "Training materials and cyber defense resources",
      "Coaching support and mentorship from industry professionals",
      "Competition participation and travel support"
    ]
  }
];

function openTeamModal(idx){
  var t = TEAMS[idx];
  document.getElementById('tm-num').textContent = t.num;
  document.getElementById('tm-name').textContent = t.name;
  document.getElementById('tm-sub').textContent = t.sub;
  document.getElementById('tm-what').textContent = t.what;
  var ul = document.getElementById('tm-needs');
  ul.innerHTML = '';
  t.needs.forEach(function(n){
    var li = document.createElement('li');
    li.textContent = n;
    ul.appendChild(li);
  });
  document.getElementById('team-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeTeamModal(){
  document.getElementById('team-modal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e){
  if(e.key === 'Escape') closeTeamModal();
});


var FEATURES=[
  {name:"Events Calendar",deployed:false,what:"A centralized calendar of all CA-882 events: ceremonies, inspections, fundraisers, enrichment programs, and community service. Parents get updates directly without relying on cadets to relay information.",expect:["Event dates and details pushed to registered members","Fundraiser announcements with volunteer and participation info","Enrichment program opportunities (StellarX, JLAB, Raiders sign-ups)","Future family events listed and announced here"]},
  {name:"Recognition",deployed:false,what:"Cadet achievements, news, and highlights communicated directly to families.",expect:["Competition results and award announcements","Individual cadet spotlights in newsletter","Service hour milestones and program achievements","Recognition tied to the Appreciation Program"]},
  {name:"Newsletter",deployed:true,what:"Monthly email covering cadet highlights, event announcements, fundraising updates, volunteer opportunities, and corps news. This is the first feature live: registered members receive it first.",expect:["Monthly delivery to your registered email","Cadet news, team updates, and event previews","Fundraiser info and volunteer call-outs"]},
  {name:"Volunteer",deployed:false,what:"Parents and supporters get the right information for every event: volunteer slots, what cadets need, and logistics details so no one shows up uninformed or unprepared. The goal is to make supporting cadets as easy as possible.",expect:["Event-by-event volunteer call-outs with specific needs listed","Logistics details pushed directly to registered parents before each event","Reduces the burden on cadets to relay information home"]},
  {name:"Full Portal",deployed:false,what:"The complete CA-882 website: a permanent home for the corps online. Everything new families need to know to get started and feel part of the CA-882 community.",expect:["Events calendar and cadet news hub","Achievements and program overviews","Contact information and online forms","Information for new and future cadets and families"]},
  {name:"Appreciation Program",deployed:false,what:"CA-882 recognizes the families and community members who make the corps possible. Supporters receive thank-you cards and acknowledgment because the relationship goes beyond a single donation.",expect:["Cards sent to registered families and participating donors","Cadet signatures and personalization where possible"]}
];
function openFeatureModal(i){
  var f=FEATURES[i];
  document.getElementById('fm-name').textContent=f.name;
  document.getElementById('fm-status').innerHTML=f.deployed?'<span class="feat-status deployed">Deployed</span>':'<span class="feat-status upcoming">Upcoming</span>';
  document.getElementById('fm-what').textContent=f.what;
  var ul=document.getElementById('fm-expect');ul.innerHTML='';
  f.expect.forEach(function(e){var li=document.createElement('li');li.textContent=e;ul.appendChild(li);});
  document.getElementById('feature-modal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeFeatureModal(){document.getElementById('feature-modal').classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeFeatureModal();});

// ── INITIALIZE ALL ANIMATIONS ──
// Now gated: only runs after the boot disclaimer is acknowledged.
// (Stops reveals from racing under the boot curtain → no choppy "everything
//  fires at once" on first paint.)
window.__startReveals = function initAnimations() {
  if (window.__revealsStarted) return;
  window.__revealsStarted = true;

  document.body.classList.add('js-ready');

  // ── Hero entrance: staggered immediately on reveal
  const heroIds = ['hero-logo', 'hero-tag', 'hero-title', 'hero-desc'];
  heroIds.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) setTimeout(() => el.classList.add('active'), 120 + (i * 130));
  });

  // ── Early Access Banner collapse
  const banner = document.getElementById('early-access-banner');
  if (banner && window.IntersectionObserver) {
    const bannerObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        bannerObs.disconnect();
        setTimeout(() => banner.classList.add('collapsed'), 7000);
      }
    }, { threshold: 0.5 });
    bannerObs.observe(banner);
  }

  // ── Scroll reveal: one observer per element (most reliable pattern)
  if (!window.IntersectionObserver) {
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-up,.reveal-fade')
      .forEach(el => el.classList.add('active'));
    return;
  }

  // Pre-warm observer: sets will-change early so GPU layer is ready before element is visible
  const warmObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.willChange = 'opacity, transform';
        warmObs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px 250px 0px' }); // 250px ahead of viewport

  // Single shared observer: fires when element is actually entering view
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = Math.min(parseInt(el.dataset.delay) || 0, 500);
        setTimeout(() => {
          el.classList.add('active');
          setTimeout(() => { el.style.willChange = 'auto'; }, 600);
        }, delay);
        revealObs.unobserve(el);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 0px 0px' });

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-up,.reveal-fade').forEach(el => {
    if (el.id && heroIds.includes(el.id)) return; // hero handled above
    warmObs.observe(el);
    revealObs.observe(el);
  });
};

// ── Image Fallback (definition kept here for backwards-compat; primary definition is hoisted near top of <body>) ──


