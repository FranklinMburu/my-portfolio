(() => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const stage = document.getElementById('stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: the smile window opens with scroll progress (0–1).
  let ticking = false;
  const update = () => {
    ticking = false;
    const range = hero.offsetHeight - window.innerHeight;
    const p = reduceMotion ? 1 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, range)));
    stage.style.setProperty('--p', p.toFixed(4));
    const overPhoto = p > 0.55 && window.scrollY < range + 10;
    nav.classList.toggle('is-dark', overPhoto);
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

  // Booking: the next six open days (Sundays closed) and their time slots.
  const form = document.getElementById('book-form');
  const dayChips = document.getElementById('day-chips');
  const timeChips = document.getElementById('time-chips');
  const summary = document.getElementById('summary');
  const status = document.getElementById('book-status');
  const days = [];
  const d = new Date();
  while (days.length < 6) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) days.push(new Date(d));
  }
  const dayName = (date) => date.toLocaleDateString('en-GB', { weekday: 'short' });
  const dayNum = (date) => date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  dayChips.innerHTML = days
    .map((date, i) => `<label><input type="radio" name="day" value="${i}" ${i === 0 ? 'checked' : ''} /><span>${dayName(date)}<small>${dayNum(date)}</small></span></label>`)
    .join('');

  const slots = ['07:30', '09:00', '10:30', '12:00', '14:00', '15:30', '17:00', '18:30'];
  // A believable pattern of already-booked slots, different each day.
  const taken = (dayIndex, slotIndex) => (dayIndex * 3 + slotIndex * 5) % 7 === 0;
  const renderTimes = () => {
    const dayIndex = Number(form.day.value);
    timeChips.innerHTML = slots
      .map((t, i) => `<label><input type="radio" name="time" value="${t}" ${taken(dayIndex, i) ? 'disabled' : ''} /><span>${t}</span></label>`)
      .join('');
    const first = timeChips.querySelector('input:not(:disabled)');
    if (first) first.checked = true;
  };
  const renderSummary = () => {
    const date = days[Number(form.day.value)];
    const time = form.time ? form.time.value : '';
    summary.textContent = `${form.treatment.value}, ${dayName(date)} ${dayNum(date)}${time ? ` at ${time}` : ''}`;
  };
  renderTimes();
  renderSummary();
  form.addEventListener('change', (event) => {
    if (event.target.name === 'day') renderTimes();
    renderSummary();
    status.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.name.value.trim()) { form.name.focus(); status.textContent = 'Add your name.'; return; }
    if (form.phone.value.replace(/\D/g, '').length < 9) { form.phone.focus(); status.textContent = 'Enter a phone number we can text, like 0712 345 678.'; return; }
    status.textContent = 'Demo form: in a live build, this books the slot and sends a confirmation text.';
  });
})();
