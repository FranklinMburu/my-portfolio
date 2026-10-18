(() => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const stage = document.querySelector('.hero__stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: scroll progress (0–1) lets the home rise through the letters.
  let ticking = false;
  const update = () => {
    ticking = false;
    const range = hero.offsetHeight - window.innerHeight;
    const p = reduceMotion ? 1 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, range)));
    stage.style.setProperty('--p', p.toFixed(4));
    stage.classList.toggle('is-done', p > 0.85);
    nav.classList.toggle('is-solid', window.scrollY > Math.max(range, 1) * 0.9);
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

  // Concept site: forms explain plainly that nothing was sent.
  const concept = (formId, statusId, message, check) => {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const problem = check ? check(form) : '';
      status.textContent = problem || message;
    });
  };

  concept(
    'find-form',
    'find-status',
    'This is a concept website, so there are no real listings to show. Keja is a fictional agency.'
  );
  concept(
    'talk-form',
    'talk-status',
    'This is a concept website, so no one will call. Your details were not sent anywhere.',
    (form) => {
      if (!form.name.value.trim()) {
        form.name.focus();
        return 'Add your name.';
      }
      if (!/^\S+@\S+\.\S+$/.test(form.email.value)) {
        form.email.focus();
        return 'Enter an email address like name@example.com.';
      }
      return '';
    }
  );
})();
