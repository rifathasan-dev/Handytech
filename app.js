const business = {
  company: 'URBAN BUILD & ELECTRICAL SOLUTION PTE. LTD.',
  uen: '202415287K',
  phone: '+6590446055',
  displayPhone: '+65 9044 6055',
  whatsapp: '6590446055',
  email: 'hello@handytech.sg',
  address: '286 Yishun Avenue 6, #03-96, Ficus Vale, Singapore 760286',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=286+Yishun+Avenue+6+Singapore+760286',
  hours: 'Friday – Wednesday, 9:00 AM – 6:00 PM',
  emergency: '24/7 support for urgent electrical faults (call first)',
  reviewsUrl: 'https://www.google.com/search?q=URBAN+BUILD+%26+ELECTRICAL+SOLUTION+PTE.+LTD.+Singapore+Google+reviews'
};

const rootPath = document.querySelector('[data-root]')?.dataset.root || '';
const sharedHeader = document.querySelector('[data-site-header]');
const sharedFooter = document.querySelector('[data-site-footer]');


// Ensure SVG favicon exists even on pages whose <head> was not updated
if (!document.querySelector('link[rel="icon"]')) {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = `${rootPath}assets/favicon.svg`;
  document.head.appendChild(favicon);
}

if (sharedHeader) {
  sharedHeader.outerHTML = `<header class="site-header" id="top">
    <div class="shared-header-inner">
      <a class="brand" href="${rootPath}index.html" aria-label="HandyTech home"><img class="brand-logo" src="${rootPath}assets/handytech-logo.svg" alt="HandyTech.sg" width="139" height="36"></a>
      <nav class="shared-nav" aria-label="Main navigation">
        <div class="services-menu"><button class="services-trigger" type="button" aria-expanded="false" aria-controls="services-dropdown">Services <span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></button><div class="services-dropdown" id="services-dropdown"><a href="${rootPath}services/electrical.html"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/></svg>Electrical</a><a href="${rootPath}services/cctv-network.html"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a8 8 0 0 1 16 0M4 14h16"/><circle cx="12" cy="14" r="2.5"/><path d="M12 6V3"/></svg>CCTV &amp; Network</a><a href="${rootPath}services/aircon.html"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16M4 12h16M4 16h16M8 4c0 2-2 2-2 4m10-4c0 2-2 2-2 4"/></svg>Aircon</a><a href="${rootPath}services/handyman.html"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m14 6 4-4 4 4-4 4M3 21l9-9m-2-5 8 8"/></svg>Handyman</a><a href="${rootPath}services/plumbing.html"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v7a7 7 0 0 0 14 0V3M3 3h4m10 0h4M8 21h8"/></svg>Plumbing</a><a href="${rootPath}services/painting.html"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m4 20 4-4 11-11 2 2L10 18l-6 2Zm10-13 3 3M3 21h18"/></svg>Painting</a><a class="dropdown-all" href="${rootPath}services.html">View all services <span>↗</span></a></div></div><a href="${rootPath}projects.html">Projects</a><a href="${rootPath}about.html">About</a><a href="${rootPath}faq.html">FAQ</a><a href="${rootPath}contact.html">Contact</a>
      </nav>
      <div class="shared-actions"><a class="button button-dark" href="${rootPath}quote.html">Get a quote <span aria-hidden="true">↗</span></a></div>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span><span class="sr-only">Open menu</span></button>
    </div>
    <div class="mobile-menu" id="mobile-menu" hidden>
      <details class="mobile-services"><summary>Services <span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span></summary><a href="${rootPath}services/electrical.html">Electrical</a><a href="${rootPath}services/cctv-network.html">CCTV &amp; Network</a><a href="${rootPath}services/aircon.html">Aircon</a><a href="${rootPath}services/handyman.html">Handyman</a><a href="${rootPath}services/plumbing.html">Plumbing</a><a href="${rootPath}services/painting.html">Painting</a><a href="${rootPath}services.html">View all services ↗</a></details><a href="${rootPath}projects.html">Projects</a><a href="${rootPath}about.html">About</a><a href="${rootPath}faq.html">FAQ</a><a href="${rootPath}contact.html">Contact</a><a class="button button-dark" href="${rootPath}quote.html">Get a quote <span aria-hidden="true">↗</span></a>
    </div>
  </header>`;
}

if (sharedFooter) {
  sharedFooter.outerHTML = `<footer class="footer"><div class="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div class="footer-top"><div class="footer-col footer-brand"><a class="brand brand-light" href="${rootPath}index.html" aria-label="HandyTech home"><img class="brand-logo" src="${rootPath}assets/handytech-logo-dark.svg" alt="HandyTech.sg" width="131" height="34"></a><p>Practical help for the places<br />you live and work.</p><div class="footer-actions"><a class="button button-accent" href="${rootPath}quote.html">Get a quote <span aria-hidden="true">↗</span></a><a class="footer-link" data-whatsapp-link href="https://wa.me/${business.whatsapp}" target="_blank" rel="noopener">WhatsApp us ↗</a></div></div><div class="footer-col"><h4>Services</h4><ul><li><a href="${rootPath}services/electrical.html">Electrical</a></li><li><a href="${rootPath}services/cctv-network.html">CCTV &amp; Network</a></li><li><a href="${rootPath}services/aircon.html">Aircon</a></li><li><a href="${rootPath}services/handyman.html">Handyman</a></li><li><a href="${rootPath}services/plumbing.html">Plumbing</a></li><li><a href="${rootPath}services/painting.html">Painting</a></li><li><a href="${rootPath}services.html">View all services ↗</a></li></ul></div><div class="footer-col"><h4>Company</h4><ul><li><a href="${rootPath}index.html">Home</a></li><li><a href="${rootPath}projects.html">Projects</a></li><li><a href="${rootPath}about.html">About</a></li><li><a href="${rootPath}faq.html">FAQ</a></li><li><a href="${rootPath}contact.html">Contact</a></li><li><a href="${rootPath}quote.html">Get a quote</a></li></ul></div><div class="footer-col"><h4>Contact</h4><ul><li><a href="${business.mapsUrl}" target="_blank" rel="noopener">286 Yishun Ave 6, #03-96, Singapore 760286</a></li><li><a data-phone-link href="tel:${business.phone}">${business.displayPhone}</a></li><li><a data-email-link href="mailto:${business.email}">${business.email}</a></li><li><span>Fri – Wed, 9:00 AM – 6:00 PM</span></li><li><span>24/7 urgent electrical (call first)</span></li></ul></div></div><div class="footer-legal"><span>${business.company} · UEN ${business.uen}</span><nav aria-label="Legal"><a href="${rootPath}privacy.html">Privacy</a><a href="${rootPath}terms.html">Terms</a></nav></div><div class="footer-bottom"><span>© 2026 HandyTech Singapore</span><span>For homes, shops and offices</span><a href="#top">Back to top ↑</a></div></div></footer><div class="mobile-bar"><a data-phone-link href="tel:${business.phone}"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>Call</a><a data-whatsapp-link href="https://wa.me/${business.whatsapp}" target="_blank" rel="noopener"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z"/><path d="M8.3 16.1 5.8 19.3l3.8-.9"/><g transform="translate(8.5,7.5) scale(0.29)" stroke-width="6.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></g></svg></span>WhatsApp</a><a href="${rootPath}quote.html"><span>↗</span>Quote</a></div>`;
}

const whatsappMessage = encodeURIComponent('Hi HandyTech, I would like to enquire about your home services.');
document.querySelectorAll('[data-phone-link]').forEach((link) => {
  link.href = `tel:${business.phone}`;
});
document.querySelectorAll('[data-email-link]').forEach((link) => {
  link.href = `mailto:${business.email}`;
});
document.querySelectorAll('[data-whatsapp-link]').forEach((link) => {
  const raw = link.getAttribute('href') || '';
  if (!/[?&]text=/.test(raw)) link.href = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;
});

if (!document.querySelector('.whatsapp-float')) {
  const whatsappFloat = document.createElement('a');
  whatsappFloat.className = 'whatsapp-float';
  whatsappFloat.href = `https://wa.me/${business.whatsapp}?text=${whatsappMessage}`;
  whatsappFloat.target = '_blank';
  whatsappFloat.rel = 'noopener';
  whatsappFloat.setAttribute('aria-label', 'Chat with HandyTech on WhatsApp');
  whatsappFloat.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z"/><path d="M8.3 16.1 5.8 19.3l3.8-.9"/><g transform="translate(8.5,7.5) scale(0.29)" stroke-width="6.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></g></svg></span><strong>WhatsApp</strong>';
  document.body.appendChild(whatsappFloat);
}

const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.hidden = isOpen;
});
mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  });
});

const servicesTrigger = document.querySelector('.services-trigger');
const servicesMenu = document.querySelector('.services-menu');
servicesTrigger?.addEventListener('click', () => {
  const isOpen = servicesMenu.classList.toggle('is-open');
  servicesTrigger.setAttribute('aria-expanded', String(isOpen));
});
document.addEventListener('click', (event) => {
  if (servicesMenu && !servicesMenu.contains(event.target)) {
    servicesMenu.classList.remove('is-open');
    servicesTrigger?.setAttribute('aria-expanded', 'false');
  }
});

// Back-to-top links target the sticky header, which browsers handle
// unreliably as an anchor destination — scroll explicitly instead.
const canSmoothScroll = 'scrollBehavior' in document.documentElement.style;
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    if (canSmoothScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
    else window.scrollTo(0, 0);
  });
});

const form = document.querySelector('#quote-form, #quote-page-form');
const status = document.querySelector('#form-status, .status');
const serviceFromUrl = new URLSearchParams(window.location.search).get('service');
if (serviceFromUrl && form?.elements.service) {
  const valid = Array.from(form.elements.service.options).map((o) => o.text);
  if (valid.includes(serviceFromUrl)) form.elements.service.value = serviceFromUrl;
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  if (data.get('company')) return;
  if (status) status.textContent = 'Thanks! We will get back to you within 1 business hour.';
  form.reset();
  status?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

const observerTarget = ('IntersectionObserver' in window) ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observerTarget.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 }) : null;
document.querySelectorAll('.reveal').forEach((element) => {
  if (observerTarget) observerTarget.observe(element);
  else element.classList.add('is-visible');
});
