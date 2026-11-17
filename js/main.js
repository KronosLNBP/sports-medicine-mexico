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
