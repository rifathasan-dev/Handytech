const business = {
  company: 'URBAN BUILD & ELECTRICAL SOLUTION PTE. LTD.',
  uen: '202415287K',
  phone: '+6590446055',
  displayPhone: '+65 9044 6055',
  whatsapp: '6590446055',
  email: 'hello@handytech.sg',
  address: '286 Yishun Avenue 6, #03-96, Ficus Vale, Singapore 760286',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=286+Yishun+Avenue+6+Singapore+760286',
  hours: 'Monday – Saturday, 9:00 AM – 6:00 PM',
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
  sharedFooter.outerHTML = `<footer class="footer"><div class="mx-auto max-w-7xl px-5 py-12 lg:px-8"><div class="footer-top"><div class="footer-col footer-brand"><a class="brand brand-light" href="${rootPath}index.html" aria-label="HandyTech home"><img class="brand-logo" src="${rootPath}assets/handytech-logo-dark.svg" alt="HandyTech.sg" width="131" height="34"></a><p>Practical help for the places<br />you live and work.</p><div class="footer-actions"><a class="button button-accent" href="${rootPath}quote.html">Get a quote <span aria-hidden="true">↗</span></a></div></div><div class="footer-col"><h4>Services</h4><ul><li><a href="${rootPath}services/electrical.html">Electrical</a></li><li><a href="${rootPath}services/cctv-network.html">CCTV &amp; Network</a></li><li><a href="${rootPath}services/aircon.html">Aircon</a></li><li><a href="${rootPath}services/handyman.html">Handyman</a></li><li><a href="${rootPath}services/plumbing.html">Plumbing</a></li><li><a href="${rootPath}services/painting.html">Painting</a></li><li><a href="${rootPath}services.html">View all services</a></li></ul></div><div class="footer-col"><h4>Company</h4><ul><li><a href="${rootPath}index.html">Home</a></li><li><a href="${rootPath}projects.html">Projects</a></li><li><a href="${rootPath}about.html">About</a></li><li><a href="${rootPath}faq.html">FAQ</a></li><li><a href="${rootPath}contact.html">Contact</a></li><li><a href="${rootPath}quote.html">Get a quote</a></li></ul></div><div class="footer-col"><h4>Contact</h4><ul><li><a href="${business.mapsUrl}" target="_blank" rel="noopener">286 Yishun Ave 6, #03-96, Singapore 760286</a></li><li><a data-phone-link href="tel:${business.phone}">${business.displayPhone}</a></li><li><a data-email-link href="mailto:${business.email}">${business.email}</a></li><li><span>Mon – Sat, 9:00 AM – 6:00 PM</span></li><li><span>24/7 for urgent cases (call first)</span></li></ul></div></div><div class="footer-legal"><span>${business.company} · UEN ${business.uen}</span><nav aria-label="Legal"><a href="${rootPath}privacy.html">Privacy</a><a href="${rootPath}terms.html">Terms</a></nav></div><div class="footer-bottom"><span>© 2026 HandyTech Singapore</span><span>For homes, shops and offices</span><a href="#top">Back to top ↑</a></div></div></footer><div class="mobile-bar"><a data-phone-link href="tel:${business.phone}"><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>Call</a><a data-whatsapp-link href="https://wa.me/${business.whatsapp}" target="_blank" rel="noopener"><span><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 05.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></span>WhatsApp</a><a href="${rootPath}quote.html"><span>↗</span>Quote</a></div>`;
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
  whatsappFloat.innerHTML = '<span aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 05.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg></span><strong>WhatsApp</strong>';
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
