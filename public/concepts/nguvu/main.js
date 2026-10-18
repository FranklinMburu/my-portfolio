(() => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const classes = document.querySelector('.classes');
  const track = document.querySelector('.classes__track');
  const pinned = window.matchMedia('(min-width: 861px) and (prefers-reduced-motion: no-preference)');

  // How far the class strip has to travel so the last card ends at the right edge.
  const measure = () => {
    const shift = Math.max(0, track.scrollWidth - window.innerWidth);
    classes.style.setProperty('--shift', `${shift}px`);
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    nav.classList.toggle('is-solid', window.scrollY > hero.offsetHeight - 80);
    if (!pinned.matches) {
      classes.style.setProperty('--p', '0');
      return;
    }
    const rect = classes.getBoundingClientRect();
    const range = classes.offsetHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, range)));
    classes.style.setProperty('--p', p.toFixed(4));
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    measure();
    onScroll();
  });
  window.addEventListener('load', measure);
  measure();
  update();

  // First-session form (demo).
  const form = document.getElementById('first-form');
  const status = document.getElementById('first-status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.name.value.trim()) {
      status.textContent = 'Add your name.';
      form.name.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email.value)) {
      status.textContent = 'Enter an email address like name@example.com.';
      form.email.focus();
      return;
    }
    status.textContent = 'Demo form: in a live build, this books your free first session and emails you the details.';
  });
})();
