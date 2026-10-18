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

  // Forms (demo).
  const demo = (formId, statusId, message, check) => {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const problem = check ? check(form) : '';
      status.textContent = problem || message;
    });
  };

  demo(
    'find-form',
    'find-status',
    'Demo search: in a live build, this shows matching homes from the listings database.'
  );
  demo(
    'talk-form',
    'talk-status',
    'Demo form: in a live build, this goes straight to an agent, who calls you back the same day.',
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
