(function () {
  'use strict';

  var cfg = window.SM_CONFIG || {};
  var number = String(cfg.whatsapp || '').replace(/\D/g, '');

  function waUrl(text) {
    return 'https://wa.me/' + number + '?text=' + encodeURIComponent(text);
  }

  // Enlaces de WhatsApp: toman el número de config.js
  document.querySelectorAll('.js-wa').forEach(function (a) {
    var msg = a.getAttribute('data-msg') || 'Hola Sports Medicine, quiero información.';
    a.href = waUrl(msg);
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('.js-wa-label').forEach(function (el) {
    if (cfg.whatsappLabel) el.textContent = cfg.whatsappLabel;
  });

  // Menú en celular
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('menu');
  if (toggle && menu) {
    var close = function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    };
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  }

  // Filtro de sedes
  var filters = document.querySelectorAll('.filter');
  var branches = document.querySelectorAll('.branch');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var c = btn.getAttribute('data-city');
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      branches.forEach(function (br) { br.hidden = !(c === 'todas' || br.getAttribute('data-city') === c); });
    });
  });

  // Botones de programa: preseleccionan el motivo
  var motivo = document.getElementById('motivo');
  document.querySelectorAll('[data-motivo]').forEach(function (a) {
    a.addEventListener('click', function () { if (motivo) motivo.value = a.getAttribute('data-motivo'); });
  });

  // Formulario: valida y abre WhatsApp
  var form = document.getElementById('lead-form');
  if (form) {
    var fields = document.getElementById('form-fields');
    var success = document.getElementById('form-success');
    var error = document.getElementById('form-error');
    var retry = document.getElementById('wa-retry');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nombre = form.nombre.value.trim();
      var tel = form.telefono.value.replace(/\D/g, '');
      var okNombre = nombre.length >= 2;
      var okTel = tel.length >= 10;
      form.nombre.setAttribute('aria-invalid', String(!okNombre));
      form.telefono.setAttribute('aria-invalid', String(!okTel));
      if (!(okNombre && okTel)) {
        error.hidden = false;
        (okNombre ? form.telefono : form.nombre).focus();
        return;
      }
      error.hidden = true;

      var text = 'Hola Sports Medicine, quiero agendar una cita.\n' +
        'Nombre: ' + nombre + '\n' +
        'Teléfono: ' + tel + '\n' +
        'Sede: ' + form.sede.value + '\n' +
        'Motivo: ' + form.motivo.value;
      var url = waUrl(text);
      if (retry) retry.href = url;

      fields.hidden = true;
      success.hidden = false;
      window.open(url, '_blank', 'noopener');
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

// Si el menú no cabe en una línea, se colapsa en el botón de menú
(function () {
  'use strict';
  var header = document.querySelector('.site-header');
  var inner = header && header.querySelector('.header-inner');
  var menu = document.getElementById('menu');
  var toggle = document.querySelector('.menu-toggle');
  if (!header || !inner || !menu) return;
  function fitNav() {
    header.classList.remove('nav-collapsed');
    if (getComputedStyle(menu).position === 'absolute') return;
    var over = inner.scrollWidth > inner.clientWidth + 1 || menu.scrollWidth > menu.clientWidth + 1;
    if (over) {
      header.classList.add('nav-collapsed');
    } else if (menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      if (toggle) { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); }
    }
  }
  var timer;
  window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(fitNav, 100); });
  window.addEventListener('load', fitNav);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitNav);
  fitNav();
})();

// Animaciones de entrada al hacer scroll (sin JS o con movimiento reducido, todo queda visible)
(function () {
  'use strict';
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sel = '.section-head, .branch, .athlete-card, .steps li, .related-card, .care, .spec, .pillar, .booking-card, .elder-col, .athlete-note, .care-note';
  var items = document.querySelectorAll('main ' + sel.split(', ').join(', main '));
  if (!items.length) return;
  document.documentElement.classList.add('js-reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  items.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  // Al imprimir o si algo falla, mostrar todo
  window.addEventListener('beforeprint', function () { items.forEach(function (el) { el.classList.add('is-visible'); }); });
})();

// Botón "Volver arriba" en páginas largas
(function () {
  'use strict';
  if (document.body.scrollHeight < window.innerHeight * 2.5) return;
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'to-top';
  btn.setAttribute('aria-label', 'Volver arriba');
  btn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>';
  document.body.appendChild(btn);
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    var skip = document.querySelector('.skip-link') || document.body;
    if (skip.focus) skip.focus({ preventScroll: true });
  });
  var onScroll = function () { btn.classList.toggle('is-shown', window.scrollY > window.innerHeight); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
