(() => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const words = [...document.querySelectorAll('.hero__word')];
  const photos = [...document.querySelectorAll('.hero__arch img')];
  const bars = [...document.querySelectorAll('.hero__progress i')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: scroll progress picks the word (curious, kind, brave, ready) and the photo in the arch.
  let current = -1;
  const show = (i) => {
    if (i === current) return;
    current = i;
    words.forEach((w, j) => {
      w.classList.toggle('is-on', j === i);
      w.classList.toggle('is-past', j < i);
    });
    photos.forEach((p, j) => p.classList.toggle('is-on', j === i));
    bars.forEach((b, j) => b.classList.toggle('is-on', j <= i));
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    const range = hero.offsetHeight - window.innerHeight;
    const p = Math.min(0.999, Math.max(0, window.scrollY / Math.max(1, range)));
    show(reduceMotion ? 0 : Math.floor(p * words.length));
    nav.classList.toggle('is-solid', window.scrollY > range);
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

  // Visit form (demo).
  const form = document.getElementById('visit-form');
  const status = document.getElementById('visit-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.name.value.trim()) { form.name.focus(); status.textContent = 'Add your name.'; return; }
    if (!/^\S+@\S+\.\S+$/.test(form.email.value)) { form.email.focus(); status.textContent = 'Enter an email address like name@example.com.'; return; }
    status.textContent = `Demo form: in a live build, this books a ${form.day.value} tour and emails you a confirmation.`;
  });
})();
