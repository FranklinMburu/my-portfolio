(() => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const stage = document.getElementById('stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: the page parts to show the city (--p 0–1).
  let ticking = false;
  const update = () => {
    ticking = false;
    const range = hero.offsetHeight - window.innerHeight;
    const p = reduceMotion ? 1 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, range)));
    stage.style.setProperty('--p', p.toFixed(4));
    nav.classList.toggle('is-dark', p > 0.5 && window.scrollY < range + 10);
    nav.classList.toggle('is-solid', window.scrollY > range + 10);
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // Reveals.
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Practice areas: one open at a time.
  const areas = [...document.querySelectorAll('.areas details')];
  areas.forEach((d) => d.addEventListener('toggle', () => {
    if (d.open) areas.forEach((o) => { if (o !== d) o.open = false; });
  }));

  // Consultation form (demo).
  const form = document.getElementById('contact-form');
  const status = document.getElementById('contact-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.name.value.trim()) { form.name.focus(); status.textContent = 'Add your name.'; return; }
    if (form.reach.value.trim().length < 6) { form.reach.focus(); status.textContent = 'Add an email address or phone number so we can reply.'; return; }
    status.textContent = 'Demo form: in a live build, this goes securely to the intake team, who reply within a working day.';
  });
})();
