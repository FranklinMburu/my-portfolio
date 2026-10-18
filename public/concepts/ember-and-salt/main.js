(() => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const stage = document.querySelector('.hero__stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: scroll progress drives the dive through the letters (CSS reads --p).
  let ticking = false;
  const update = () => {
    ticking = false;
    const range = hero.offsetHeight - window.innerHeight;
    const p = reduceMotion ? 0 : Math.min(1, Math.max(0, window.scrollY / range));
    stage.style.setProperty('--p', p.toFixed(4));
    nav.classList.toggle('is-solid', window.scrollY > range * 0.85);
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

  // Booking form: a concept site, so nothing is booked. Say so plainly.
  const form = document.getElementById('book-form');
  const status = document.getElementById('book-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const missing = [...form.elements].filter((el) => el.required && !el.value);
    if (missing.length) {
      status.textContent = 'Choose a date, time and number of guests, and add your name.';
      missing[0].focus();
      return;
    }
    status.textContent =
      'This is a concept website, so no table was booked. Ember & Salt is a fictional restaurant.';
  });

  // Dates in the past can't be booked.
  const date = form.querySelector('input[type="date"]');
  date.min = new Date().toISOString().slice(0, 10);
})();
