(function() {
  'use strict';
  try {

  var QUIZ_BASE_URL = 'https://veddaang.github.io/clapstore-quiz/';
  var BANNER_DELAY_MS = 1500;

  var PRODUCT_SLUGS = {
    'spark-switch-v1-busy-board': 'spark-switch-v1',
    'spark-switch-v1': 'spark-switch-v1',
    'tinker-pad-v2-busy-board': 'tinker-pad-v2',
    'tinker-pad-v2': 'tinker-pad-v2',
    'mini-switch-v4-busy-board': 'mini-switch-v4',
    'mini-switch-v4': 'mini-switch-v4',
    'toggle-play-v6-busy-board': 'toggle-play-v6',
    'toggle-play-v6': 'toggle-play-v6',
    'jungle-piano-v10': 'jungle-piano-v10',
    'beat-maker-v9': 'beat-maker-v9',
    'galaxy-explorer-v3': 'galaxy-explorer-v3',
    'clapcuddles-ganesha': 'clapcuddles-ganesha',
    'clapcuddles-krishna': 'clapcuddles-krishna',
    'clapcuddles-hanuman': 'clapcuddles-hanuman',
    'sooperbrains-army-tank': 'sooperbrains-tank',
    'sooperbrains-tank': 'sooperbrains-tank'
  };

  var checkout = window.Shopify && window.Shopify.checkout;
  if (!checkout) return;

  var customerName = '';
  if (checkout.billing_address) {
    customerName = checkout.billing_address.first_name || '';
  }

  var orderId = '';
  if (checkout.order_id) {
    orderId = checkout.order_id.toString();
  }

  var productKey = '';
  if (checkout.line_items && checkout.line_items.length > 0) {
    var handle = (checkout.line_items[0].handle || checkout.line_items[0].product_id || '').toString().toLowerCase();
    productKey = PRODUCT_SLUGS[handle] || handle;
  }

  var quizUrl = QUIZ_BASE_URL;
  var params = [];
  if (productKey)   params.push('product=' + encodeURIComponent(productKey));
  if (customerName) params.push('customer_name=' + encodeURIComponent(customerName));
  if (orderId)      params.push('order_id=' + encodeURIComponent(orderId));
  if (params.length) quizUrl += '?' + params.join('&');

  setTimeout(function() {
    var banner = document.createElement('div');
    banner.setAttribute('style', 'max-width:620px;margin:24px auto;background:linear-gradient(135deg,#fff9e6 0%,#fff3cc 100%);border:2px solid #FCBB13;border-radius:16px;padding:24px;text-align:center;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;animation:csFadeIn 0.5s ease;');

    banner.innerHTML =
      '<p style="font-size:28px;margin:0 0 8px;">\uD83E\uDDE9</p>' +
      '<p style="font-size:18px;font-weight:700;color:#1a1a1a;margin:0 0 6px;">While we pack your order...</p>' +
      '<p style="font-size:15px;color:#64748b;margin:0 0 16px;line-height:1.5;">Discover your child\'s Play Personality in 40 seconds!<br>Get personalised toy picks + a fun shareable profile.</p>' +
      '<a href="' + quizUrl + '" style="display:inline-block;background:#FCBB13;color:#1a1a1a;padding:14px 32px;border-radius:100px;font-size:16px;font-weight:700;text-decoration:none;box-shadow:0 4px 16px rgba(252,187,19,0.3);">Take the Quiz \u2192</a>' +
      '<p style="font-size:12px;color:#94a3b8;margin:12px 0 0;">\uD83C\uDF89 Taken by 53,600+ ClapStore parents</p>';

    var style = document.createElement('style');
    style.textContent = '@keyframes csFadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}';
    document.head.appendChild(style);

    var target = document.querySelector('.os-step__info') ||
                 document.querySelector('.thank-you-additional-content') ||
                 document.querySelector('[data-step="thank_you"]') ||
                 document.querySelector('.content-box') ||
                 document.querySelector('.os-order-number');

    if (target) {
      target.parentNode.insertBefore(banner, target.nextSibling);
    } else {
      var main = document.querySelector('.content') || document.querySelector('main') || document.body;
      if (main.firstChild) {
        main.insertBefore(banner, main.firstChild);
      } else {
        main.appendChild(banner);
      }
    }
  }, BANNER_DELAY_MS);

  } catch(e) { /* silent fail — never break the page */ }
})();
