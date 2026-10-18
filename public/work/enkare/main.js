(() => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const stage = document.getElementById('stage');
  const clock = document.getElementById('clock');
  const clockLabel = document.getElementById('clock-label');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: scroll progress (0–1) moves the scene from night to sunrise.
  // The clock runs from 05:12 to 06:41 (sunrise) as you scroll.
  const START = 5 * 60 + 12;
  const END = 6 * 60 + 41;
  const pad = (n) => String(n).padStart(2, '0');
  let ticking = false;

  const update = () => {
    ticking = false;
    const range = hero.offsetHeight - window.innerHeight;
    const p = reduceMotion ? 1 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, range)));
    stage.style.setProperty('--p', p.toFixed(4));
    const minutes = Math.round(START + (END - START) * p);
    clock.textContent = `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
    clockLabel.textContent = p < 0.35 ? 'Before first light' : p < 0.9 ? 'First light' : 'Sunrise';
    nav.classList.toggle('is-solid', window.scrollY > range + 40);
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

  // Gentle reveals as sections enter.
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

  // A day here: the picture follows the time of day you are reading.
  const steps = [...document.querySelectorAll('.days__list li')];
  const media = [...document.querySelectorAll('.days__media img')];
  const show = (i) => {
    steps.forEach((s, j) => s.classList.toggle('is-on', j === i));
    media.forEach((m) => m.classList.toggle('is-on', m.dataset.for === String(i)));
  };
  const stepIo = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && show(Number(e.target.dataset.step))),
    { rootMargin: '-45% 0px -45% 0px' }
  );
  steps.forEach((s) => stepIo.observe(s));
  show(0);

  // Booking form (demo).
  const form = document.getElementById('book-form');
  const status = document.getElementById('book-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.arrive.value) { form.arrive.focus(); status.textContent = 'Choose the day you would like to arrive.'; return; }
    if (!form.name.value.trim()) { form.name.focus(); status.textContent = 'Add your name.'; return; }
    if (!/^\S+@\S+\.\S+$/.test(form.email.value)) { form.email.focus(); status.textContent = 'Enter an email address like name@example.com.'; return; }
    status.textContent = 'Demo form: in a live build, this request goes straight to the reservations team.';
  });
})();
