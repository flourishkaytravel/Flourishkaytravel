document.addEventListener('DOMContentLoaded', () => {

  const BUSINESS_EMAIL = 'hello@flourishkaytravel.com';

  // TODO: once you've created a Calendly (or Google Calendar appointment
  // schedule) account, replace this with your real booking link — that's
  // what turns "Book a consultation" into an actual Zoom/Google Meet invite.
  const BOOKING_URL = 'https://calendly.com/flourishkay-travel/consultation';

  /* Year */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Sticky header + scroll progress */
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('routeProgress');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle?.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  mainNav?.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => mainNav.classList.remove('open'))
  );

  /* Hero visa-file rotator */
  const visaFiles = [
    { category: 'UK Student Visa', country: 'United Kingdom' },
    { category: 'Canada Study Permit', country: 'Canada' },
    { category: 'Schengen Visit Visa', country: 'France' },
    { category: 'Skilled Worker Visa', country: 'UAE' },
    { category: 'Australia Visitor Visa', country: 'Australia' },
    { category: 'Ireland Short-Stay Visa', country: 'Ireland' },
    { category: 'German Study Visa', country: 'Germany' },
  ];
  let vfi = 0;
  const visaTitle = document.getElementById('visaTitle');
  const destCity = document.getElementById('destCity');

  if (visaTitle) {
    [visaTitle, destCity].forEach(el => el.style.transition = 'opacity .25s ease');
    setInterval(() => {
      vfi = (vfi + 1) % visaFiles.length;
      const v = visaFiles[vfi];
      [visaTitle, destCity].forEach(el => el.style.opacity = 0);
      setTimeout(() => {
        visaTitle.textContent = v.category;
        destCity.textContent = v.country;
        [visaTitle, destCity].forEach(el => el.style.opacity = 1);
      }, 250);
    }, 3500);
  }

  /* ============ MODAL SYSTEM ============ */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function openModal(html, { large = false } = {}) {
    modalContent.innerHTML = html;
    modalBox.classList.toggle('modal-lg', large);
    modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modalOverlay.hidden = true;
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
  }
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && !modalOverlay.hidden) closeModal();
  });

  /* ============ ADVISOR POPUP ============ */
  function advisorModalHTML() {
    return `
      <p class="mono modal-eyebrow">SPEAK WITH AN ADVISOR</p>
      <h3>Reach us directly</h3>
      <p class="modal-note">Your recommendation has been noted. Call, WhatsApp or email an advisor now or use the contact form further down and we'll call you.</p>
      <div class="modal-advisor-contact">
        <a href="tel:+447908487861" class="btn btn-outline">Call UK - +44 7908 487861</a>
        <a href="tel:+2341234568" class="btn btn-outline">Call Nigeria - +234 1 234 5678</a>
        <a href="https://wa.me/447908487861" target="_blank" rel="noopener" class="btn btn-primary">WhatsApp an advisor</a>
        <a href="mailto:${BUSINESS_EMAIL}" class="btn btn-outline">Email hello@flourishkaytravel.com</a>
      </div>
    `;
  }

  const visaToContact = document.getElementById('visaToContact');
  visaToContact?.addEventListener('click', () => openModal(advisorModalHTML()));

  /* ============ COUNTRY REQUIREMENT POPUPS ============ */
  const countryInfo = {
    'United Kingdom': {
      requirements: [
        'Valid passport (at least one blank page)',
        'Completed online visa application',
        'Financial evidence: 6 months\' bank statements',
        'Proof of accommodation in the UK',
        'Biometric enrolment (fingerprints & photo)',
        'Tuberculosis test result, for stays over 6 months',
      ],
      processing: '3–8 weeks',
    },
    'Canada': {
      requirements: [
        'Valid passport',
        'Proof of funds for your stay (or tuition, for study permits)',
        'Letter of acceptance, for study permits',
        'Biometric enrolment',
        'Statement of purpose / travel history',
        'Medical exam, for stays over 6 months',
      ],
      processing: '4–12 weeks',
    },
    'United States': {
      requirements: [
        'Valid passport',
        'DS-160 online application form',
        'Visa interview at the US Embassy, Abuja or Lagos',
        'Evidence of ties to Nigeria (employment, property, family)',
        'Financial evidence covering the trip',
        'SEVIS fee and I-20, for student (F1) visas',
      ],
      processing: '2–6 weeks, plus interview wait time',
    },
    'Schengen Area': {
      requirements: [
        'Valid passport (3 months beyond intended stay)',
        'Completed Schengen application form',
        'Travel insurance — minimum €30,000 medical cover',
        'Flight reservation and accommodation proof',
        'Bank statements, last 3–6 months',
        'Cover letter stating purpose and itinerary',
      ],
      processing: '2–4 weeks',
    },
    'Australia': {
      requirements: [
        'Valid passport',
        'Confirmation of Enrolment (CoE), for student visas',
        'Genuine Temporary Entrant statement',
        'Financial capacity evidence',
        'Overseas Student Health Cover (OSHC)',
        'English test results (IELTS/PTE/TOEFL)',
      ],
      processing: '4–10 weeks',
    },
    'UAE': {
      requirements: [
        'Valid passport',
        'Passport-size photograph',
        'Confirmed flight and hotel booking',
        'Bank statement, last 3 months',
        'Visit visa application via approved channel',
      ],
      processing: '3–5 working days',
    },
    'Ireland': {
      requirements: [
        'Valid passport',
        'AVATS online application form',
        'Letter of acceptance, for study visas',
        'Evidence of funds and ties to Nigeria',
        'Letter of invitation, for family/visit visas',
        'Travel insurance',
      ],
      processing: '4–8 weeks',
    },
    'Germany': {
      requirements: [
        'Valid passport',
        'University admission letter',
        'Blocked account (Sperrkonto) currently around €11,900 for one year',
        'Proof of health insurance',
        'Certified academic transcripts and translations',
        'Visa application form and biometric photo',
      ],
      processing: '6–12 weeks',
      note: 'Includes blocked-account setup help, one of the trickiest parts of a German student visa, handled for you rather than left to you to figure out alone.',
    },
    'Malta': {
      requirements: [
        'Valid passport',
        'Confirmed course enrolment',
        'Proof of accommodation in Malta',
        'Financial evidence covering tuition and stay',
        'Travel/health insurance',
      ],
      processing: '3–6 weeks',
    },
    'Turkey': {
      requirements: [
        'Valid passport',
        'e-Visa application (most Nigerian travellers qualify)',
        'Confirmed flight and hotel booking',
        'Bank statement showing sufficient funds',
      ],
      processing: '24–72 hours for e-Visa',
    },
    'Maldives': {
      requirements: [
        'Valid passport (visa on arrival for most nationalities)',
        'Confirmed resort/hotel booking',
        'Return flight ticket',
        'Proof of sufficient funds',
      ],
      processing: 'On arrival',
    },
    'South Africa': {
      requirements: [
        'Valid passport',
        'Completed visa application form (BI-84)',
        'Yellow fever certificate',
        'Bank statement, last 3 months',
        'Confirmed accommodation and return flight',
      ],
      processing: '2–4 weeks',
    },
  };

  function countryModalHTML(country) {
    const info = countryInfo[country];
    if (!info) return '';
    const displayName = country === 'UAE' ? 'UAE — Dubai' : country;
    return `
      <p class="mono modal-eyebrow">VISA REQUIREMENTS</p>
      <h3>${displayName}</h3>
      ${info.note ? `<p class="modal-note">${info.note}</p>` : ''}
      <ul class="modal-checklist">
        ${info.requirements.map(r => `<li>${r}</li>`).join('')}
      </ul>
      <p class="modal-meta mono">Typical processing time: ${info.processing}</p>
      <button type="button" class="btn btn-primary btn-lg modal-start-btn" data-country="${country}">Start the process</button>
    `;
  }

  document.querySelectorAll('.route-card').forEach(card => {
    card.addEventListener('click', () => {
      const country = card.dataset.country;
      openModal(countryModalHTML(country));
    });
  });

  const cDest = document.getElementById('cDest');
  const cPurpose = document.getElementById('cPurpose');

  document.addEventListener('click', (e) => {
    const startBtn = e.target.closest('.modal-start-btn');
    if (!startBtn) return;
    const country = startBtn.dataset.country;
    closeModal();
    if (cDest) cDest.value = country;
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('cName')?.focus({ preventScroll: true });
  });

  /* ============ BOOKING MODAL (Calendly / Google Meet / Zoom) ============ */
  function bookingModalHTML() {
    return `
      <p class="mono modal-eyebrow">BOOK A CALL</p>
      <h3>Schedule a consultation</h3>
      <p class="modal-note">Pick a slot and you'll get a calendar invite with a Google Meet or Zoom link automatically.</p>
      <div class="modal-iframe-wrap">
        <iframe src="${BOOKING_URL}" title="Book a consultation" loading="lazy"></iframe>
      </div>
      <p class="modal-meta">Trouble loading? <a href="${BOOKING_URL}" target="_blank" rel="noopener">Open the booking page directly</a>.</p>
    `;
  }
  document.querySelectorAll('.open-booking').forEach(btn => {
    btn.addEventListener('click', () => openModal(bookingModalHTML(), { large: true }));
  });

  /* ============ VISA ELIGIBILITY LEAD FORM ============ */
  const visaForm = document.getElementById('visaForm');
  const visaResult = document.getElementById('visaResult');
  const visaResultText = document.getElementById('visaResultText');

  const categories = {
    Tourism: 'Standard Visitor / Tourist Visa',
    Study: 'Student Visa (with confirmed admission)',
    Work: 'Skilled Worker / Employer-Sponsored Visa',
    Business: 'Business Visitor Visa',
    'Family visit': 'Family Visitor Visa',
  };

  visaForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('vName').value;
    const email = document.getElementById('vEmail').value;
    const phone = document.getElementById('vPhone').value;
    const dest = document.getElementById('vDest').value;
    const purpose = document.getElementById('vPurpose').value;
    const recommendation = categories[purpose];

    visaResultText.textContent = `${recommendation} — for entry into ${dest}.`;
    visaResult.hidden = false;

    const subject = `Visa eligibility lead — ${name}`;
    const body =
`Name: ${name}
Email: ${email}
Phone: ${phone}
Destination: ${dest}
Purpose: ${purpose}
Recommended category: ${recommendation}`;

    window.location.href =
      `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* ============ CONTACT FORM ============ */
  const contactForm = document.getElementById('contactForm');
  const cMessage = document.getElementById('cMessage');
  const contactConfirm = document.getElementById('contactConfirm');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cName').value;
    const phone = document.getElementById('cPhone').value;
    const email = document.getElementById('cEmail').value;
    const dest = cDest.value;
    const purpose = cPurpose.value;
    const message = cMessage.value;

    const subject = `Consultation request — ${dest} (${purpose})`;
    const body =
`Name: ${name}
Phone: ${phone}
Email: ${email}
Destination: ${dest}
Purpose: ${purpose}

Message:
${message}`;

    window.location.href =
      `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    contactConfirm.hidden = false;
  });

  /* Scroll reveal */
  const revealTargets = document.querySelectorAll(
    '.ticket, .route-card, .why-item, .testi-grid blockquote, .section-head'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => io.observe(el));

});