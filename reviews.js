/**
 * Live Google reviews for the HandyTech review page.
 *
 * Fetches /reviews.php (server-side proxy that holds the API key) and renders
 * the reviews. The section hides itself if the endpoint is unavailable, so a
 * missing key or a billing lapse never breaks the page.
 */
(function () {
  'use strict';

  var root = document.getElementById('review-live');
  if (!root) return;

  var list = document.getElementById('review-list');
  var summary = document.getElementById('review-summary');
  var attrib = document.getElementById('review-attrib');
  var endpoint = root.getAttribute('data-reviews-endpoint') || 'reviews.php';

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function stars(rating) {
    var wrap = el('span', 'review-rating');
    wrap.setAttribute('role', 'img');
    wrap.setAttribute('aria-label', rating + ' out of 5 stars');
    for (var i = 1; i <= 5; i++) {
      var star = el('span', 'review-star' + (i <= rating ? ' is-on' : ''), '★');
      star.setAttribute('aria-hidden', 'true');
      wrap.appendChild(star);
    }
    return wrap;
  }

  function buildCard(review) {
    var card = el('article', 'review-item');

    // Icon slot, mirroring the .service-card rhythm: mark, then body.
    var mark = el('div', 'review-item-mark');
    mark.appendChild(stars(review.rating));
    card.appendChild(mark);

    if (review.text) {
      card.appendChild(el('p', 'review-text', review.text));
    }

    var foot = el('div', 'review-item-foot');

    if (review.avatar) {
      var img = el('img', 'review-avatar');
      img.src = review.avatar;
      img.alt = '';
      img.width = 34;
      img.height = 34;
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      // If Google's avatar fails to load, fall back to an initial rather than
      // showing a broken image icon.
      img.addEventListener('error', function () {
        var initials = el('span', 'review-avatar review-avatar-initials', (review.author || 'G').charAt(0).toUpperCase());
        if (img.parentNode) img.parentNode.replaceChild(initials, img);
      });
      foot.appendChild(img);
    } else {
      foot.appendChild(el('span', 'review-avatar review-avatar-initials', (review.author || 'G').charAt(0).toUpperCase()));
    }

    var who = el('div', 'review-item-who');
    if (review.uri) {
      var link = el('a', 'review-author', review.author || 'Google reviewer');
      link.href = review.uri;
      link.target = '_blank';
      link.rel = 'noopener';
      who.appendChild(link);
    } else {
      who.appendChild(el('span', 'review-author', review.author || 'Google reviewer'));
    }
    if (review.when) who.appendChild(el('span', 'review-when', review.when));
    foot.appendChild(who);

    // Coral arrow, same role as .card-arrow on the service cards.
    if (review.uri) {
      var arrow = el('a', 'review-arrow', '↗');
      arrow.href = review.uri;
      arrow.target = '_blank';
      arrow.rel = 'noopener';
      arrow.setAttribute('aria-label', 'View ' + (review.author || 'this reviewer') + ' on Google Maps');
      foot.appendChild(arrow);
    }

    card.appendChild(foot);
    return card;
  }

  function showSummary(data) {
    if (!summary) return;
    summary.textContent = '';
    if (data.rating <= 0) return;

    // Mirrors the .trust-stat idiom: big number, coral accent, muted label.
    var block = el('div', 'review-score');

    block.appendChild(stars(Math.round(data.rating)));

    var value = data.rating.toFixed(1);
    var whole = value.slice(0, value.indexOf('.'));
    var decimal = value.slice(value.indexOf('.'));
    var strong = el('strong', null, whole);
    strong.appendChild(el('span', null, decimal));
    block.appendChild(strong);

    var label = data.totalCount
      ? data.totalCount + (data.totalCount === 1 ? ' review' : ' reviews') + ' on Google'
      : 'rated on Google';
    block.appendChild(el('small', null, label));

    summary.appendChild(block);
  }

  function fail() {
    // Hide the whole live block rather than showing an error.
    if (list) list.textContent = '';
    root.hidden = true;
  }

  fetch(endpoint, { headers: { Accept: 'application/json' }, credentials: 'same-origin' })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (payload) {
      if (!payload || !payload.ok || !payload.data) {
        fail();
        return;
      }

      var data = payload.data;
      var reviews = data.reviews || [];

      if (!reviews.length) {
        fail();
        return;
      }

      showSummary(data);

      list.textContent = '';
      reviews.forEach(function (review) {
        list.appendChild(buildCard(review));
      });

      if (attrib) {
        // Google requires attribution wherever Places data is displayed.
        attrib.hidden = false;
        var mapLink = attrib.querySelector('a');
        if (mapLink && data.mapsUri) {
          mapLink.href = data.mapsUri + (data.mapsUri.indexOf('?') === -1 ? '?' : '&')
            + 'google_maps_utm=utm_source%3Dhandytech&utm_medium%3Dwebsite&utm_campaign%3Dreviews';
        }
      }

      root.classList.add('is-loaded');
    })
    .catch(fail);
})();
