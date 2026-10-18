(() => {
  const nav = document.getElementById('nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ksh = (n) => 'KSh ' + Math.round(n).toLocaleString('en-KE');

  // Hero balance counts up once.
  const balance = document.getElementById('hero-balance');
  const target = 48250;
  if (reduceMotion) {
    balance.textContent = target.toLocaleString('en-KE');
  } else {
    let start = 0;
    const step = (t) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / 1800);
      balance.textContent = Math.round(target * (1 - Math.pow(1 - k, 4))).toLocaleString('en-KE');
      if (k < 1) requestAnimationFrame(step);
    };
    setTimeout(() => requestAnimationFrame(step), 700);
  }

  // How it works: the pinned phone switches screens as you scroll.
  const how = document.querySelector('.how');
  const steps = [...document.querySelectorAll('.how__steps li')];
  const screens = [...document.querySelectorAll('.how .screen')];
  let current = -1;
  const setStep = (i) => {
    if (i === current) return;
    current = i;
    steps.forEach((s, j) => {
      s.classList.toggle('is-on', j === i);
      s.classList.toggle('is-past', j < i);
    });
    screens.forEach((s) => s.classList.toggle('is-on', Number(s.dataset.screen) === i));
  };

  let ticking = false;
  const update = () => {
    ticking = false;
    nav.classList.toggle('is-solid', window.scrollY > 40);
    const rect = how.getBoundingClientRect();
    const range = how.offsetHeight - window.innerHeight;
    const p = Math.min(0.999, Math.max(0, -rect.top / Math.max(1, range)));
    setStep(Math.floor(p * steps.length));
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

  // Calculator: daily saving for 365 days, interest at 8.5% a year accrued daily.
  const slider = document.getElementById('daily');
  const out = document.getElementById('daily-out');
  const total = document.getElementById('calc-total');
  const interestEl = document.getElementById('calc-interest');
  const rate = 0.085 / 365;
  const calc = () => {
    const daily = Number(slider.value);
    let bal = 0;
    for (let d = 0; d < 365; d++) bal = (bal + daily) * (1 + rate);
    const paid = daily * 365;
    out.textContent = ksh(daily);
    total.textContent = ksh(bal);
    interestEl.textContent = `including ${ksh(bal - paid)} interest`;
    const pct = ((daily - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.setProperty('--fill', pct + '%');
  };
  slider.addEventListener('input', calc);
  calc();

  // Get the app (demo).
  const form = document.getElementById('get-form');
  const status = document.getElementById('get-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const digits = form.querySelector('input').value.replace(/\D/g, '');
    if (digits.length < 9) {
      status.textContent = 'Enter your phone number, like 0712 345 678.';
      return;
    }
    status.textContent = 'Demo form: in a live build, this texts you the download link.';
  });
})();
