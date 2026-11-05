/* =========================================
   SmartLife Innovations — Consent & AdSense
   Ads stay disabled until a real publisher ID
   is configured below and the visitor consents.
   ========================================= */
(function () {
  'use strict';

  // TODO: replace with your real AdSense publisher ID, e.g. "ca-pub-1234567890123456".
  // Leave empty to keep ads disabled.
  var ADSENSE_CLIENT = '';
  var CONSENT_KEY = 'sli-consent';

  function readConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {}
  }

  function tr(key, fallback) {
    return typeof t === 'function' ? t(key) : fallback;
  }

  function hasRealClient() {
    return /^ca-pub-\d{10,}$/.test(ADSENSE_CLIENT);
  }

  function loadAdSense() {
    if (!hasRealClient()) return;
    if (document.querySelector('script[data-adsense-loader]')) return;

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(ADSENSE_CLIENT);
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-adsense-loader', '1');
    document.head.appendChild(script);

    document.querySelectorAll('.ad-slot').forEach(function (slot) {
      if (slot.getAttribute('data-ad-ready') === '1') return;
      var slotId = slot.getAttribute('data-ad-slot');
      if (!slotId) return;
      slot.classList.remove('ad-slot--empty');
      slot.innerHTML =
        '<ins class="adsbygoogle" style="display:block" data-ad-client="' + ADSENSE_CLIENT +
        '" data-ad-slot="' + slotId + '" data-ad-format="auto" data-full-width-responsive="true"></ins>';
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
      slot.setAttribute('data-ad-ready', '1');
    });
  }

  function disableAds() {
    document.querySelectorAll('.ad-slot').forEach(function (slot) {
      slot.classList.add('ad-slot--empty');
      slot.innerHTML = '';
    });
  }

  function buildBanner() {
    var banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-label', tr('consentTitle', 'Cookie and advertising preferences'));
    banner.innerHTML =
      '<div class="consent-inner">' +
        '<div class="consent-text">' +
          '<strong>' + tr('consentTitle', 'Cookie and advertising preferences') + '</strong>' +
          '<p>' + tr('consentText', 'We use essential cookies to run this site. With your consent, we may also use Google AdSense cookies to show ads.') + '</p>' +
        '</div>' +
        '<div class="consent-actions">' +
          '<button type="button" class="btn btn-outline consent-decline">' + tr('consentDecline', 'Decline') + '</button>' +
          '<button type="button" class="btn btn-primary consent-accept">' + tr('consentAccept', 'Accept') + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.consent-accept').addEventListener('click', function () {
      writeConsent('accepted');
      banner.remove();
      loadAdSense();
    });
    banner.querySelector('.consent-decline').addEventListener('click', function () {
      writeConsent('declined');
      banner.remove();
      disableAds();
    });
  }

  function openSettings() {
    var existing = document.querySelector('.consent-banner');
    if (existing) return;
    buildBanner();
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Re-open link in the footer
    document.querySelectorAll('.js-consent-settings').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openSettings();
      });
    });

    var consent = readConsent();
    if (consent === 'accepted') {
      loadAdSense();
    } else if (consent === 'declined') {
      disableAds();
    } else {
      disableAds();
      buildBanner();
    }
  });
})();
