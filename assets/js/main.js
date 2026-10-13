(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hdr = document.querySelector('.site-header');
  function onScroll() { if (hdr) hdr.classList.toggle('scrolled', window.scrollY > 30); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Theme toggle (stores only the light/dark choice in this browser)
  var root = document.documentElement, tb = document.querySelector('.theme-btn');
  function paint() {
    var dark = root.dataset.theme === 'dark';
    if (!tb) return;
    tb.setAttribute('aria-pressed', String(dark));
    tb.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    tb.querySelector('.tt').textContent = dark ? 'Light' : 'Dark';
  }
  paint();
  if (tb) tb.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    paint();
  });

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); }
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }

  // Scroll reveals
  var els = [].slice.call(document.querySelectorAll('[data-reveal],.timeline,.mask'));
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (x) {
        if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  // Gentle hero parallax (desktop, motion allowed)
  var art = document.querySelector('.hero-art');
  if (art && !reduce && window.matchMedia('(min-width:901px)').matches) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        art.style.transform = 'translateY(' + Math.min(window.scrollY * 0.06, 40) + 'px)';
        tick = false;
      });
    }, { passive: true });
  }

  // Enquiry form: validation only. Nothing is sent or stored.
  var form = document.getElementById('enquiry');
  if (form) {
    var pre = new URLSearchParams(location.search).get('interest');
    var sel = form.elements['interest'];
    if (pre && sel) { [].forEach.call(sel.options, function (o) { if (o.value === pre) sel.value = pre; }); }

    var rules = {
      name: function (v) { return v.trim().length >= 2 ? '' : 'Enter your name.'; },
      phone: function (v) {
        v = v.trim().replace(/[\s-]/g, '');
        if (!v) return '';
        return /^(\+?91)?[6-9]\d{9}$/.test(v) ? '' : 'Enter a valid 10-digit Indian mobile number.';
      },
      email: function (v) {
        v = v.trim();
        if (!v) return '';
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email address, like name@example.com.';
      },
      message: function (v) { return v.trim().length >= 10 ? '' : 'Write at least 10 characters so the question is clear.'; }
    };
    function check(n) {
      var f = form.elements[n], m = rules[n](f.value);
      document.getElementById(n + '-err').textContent = m;
      f.setAttribute('aria-invalid', m ? 'true' : 'false');
      return !m;
    }
    Object.keys(rules).forEach(function (n) {
      form.elements[n].addEventListener('blur', function () { check(n); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = Object.keys(rules).map(check).every(Boolean);
      var neither = !form.elements.phone.value.trim() && !form.elements.email.value.trim();
      document.getElementById('contact-err').textContent = neither ? 'Provide a phone number or an email address so a reply is possible.' : '';
      var st = document.getElementById('status');
      if (!ok || neither) {
        st.hidden = true;
        var bad = form.querySelector('[aria-invalid="true"]');
        if (bad) bad.focus();
        return;
      }
      st.hidden = false;
      st.focus();
    });
  }
})();
