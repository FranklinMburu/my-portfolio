(() => {
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const stage = document.getElementById('stage');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ksh = (n) => 'KSh ' + Math.round(n).toLocaleString('en-KE');

  // Hero: the cherries close into one cherry as you scroll (--p 0–1).
  let ticking = false;
  const update = () => {
    ticking = false;
    const range = hero.offsetHeight - window.innerHeight;
    const p = reduceMotion ? 1 : Math.min(1, Math.max(0, window.scrollY / Math.max(1, range)));
    stage.style.setProperty('--p', p.toFixed(4));
    nav.classList.toggle('is-solid', p > 0.45);
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

  // ---------- Shop ----------
  const coffees = [
    { id: 'peaberry', name: 'Nyeri Peaberry', origin: 'Othaya, Nyeri. 1,850 m', notes: ['Red apple', 'Honey', 'Cocoa'], price: 1600, colour: '#a8132b', tag: 'Washed' },
    { id: 'aa', name: 'Kirinyaga AA', origin: 'Kianyaga, Kirinyaga. 1,750 m', notes: ['Blackcurrant', 'Grapefruit', 'Cane sugar'], price: 1400, colour: '#2f5d45', tag: 'Washed' },
    { id: 'house', name: 'House Espresso', origin: 'Nyeri and Kirinyaga blend', notes: ['Dark chocolate', 'Molasses', 'Orange'], price: 1200, colour: '#c9973f', tag: 'Espresso roast' }
  ];
  const sizes = { '250 g': 1, '500 g': 1.9, '1 kg': 3.6 };
  const grinds = ['Whole bean', 'Espresso', 'Pour-over', 'Cafetière'];

  const products = document.getElementById('products');
  products.innerHTML = coffees
    .map((c) => `
      <article class="product reveal" data-id="${c.id}">
        <div class="product__bag" aria-hidden="true">
          <div class="bag" style="--bag:${c.colour}"><div class="bag__label"><small>MLIMA</small><b>${c.name.split(' ').join('<br>')}</b><i>${c.tag}</i></div></div>
        </div>
        <h3>${c.name}</h3>
        <p class="product__origin">${c.origin}</p>
        <div class="product__notes">${c.notes.map((n) => `<span>${n}</span>`).join('')}</div>
        <div class="product__opts">
          <label>Size<select name="size">${Object.keys(sizes).map((s) => `<option>${s}</option>`).join('')}</select></label>
          <label>Grind<select name="grind">${grinds.map((g) => `<option>${g}</option>`).join('')}</select></label>
        </div>
        <div class="product__buy"><span class="product__price">${ksh(c.price)}</span><button class="button" type="button" data-add>Add to cart</button></div>
      </article>`)
    .join('');
  products.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  products.addEventListener('change', (e) => {
    const card = e.target.closest('.product');
    if (!card || e.target.name !== 'size') return;
    const c = coffees.find((x) => x.id === card.dataset.id);
    card.querySelector('.product__price').textContent = ksh(c.price * sizes[e.target.value]);
  });

  // Cart, remembered in this browser where storage is available.
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem('mlima-cart') || '[]'); } catch { cart = []; }
  const save = () => { try { localStorage.setItem('mlima-cart', JSON.stringify(cart)); } catch { /* storage unavailable */ } };

  const drawer = document.getElementById('cart');
  const items = document.getElementById('cart-items');
  const empty = document.getElementById('cart-empty');
  const total = document.getElementById('cart-total');
  const count = document.getElementById('cart-count');
  const openBtn = document.getElementById('cart-open');
  const cartStatus = document.getElementById('cart-status');

  const render = () => {
    items.innerHTML = cart
      .map((line, i) => {
        const c = coffees.find((x) => x.id === line.id);
        const each = c.price * sizes[line.size];
        return `<li><span class="cart__swatch" style="--bag:${c.colour}"></span>
          <div><b>${c.name}</b><small>${line.size}, ${line.grind}</small>
            <div class="cart__qty"><button type="button" data-dec="${i}" aria-label="One fewer">−</button><span>${line.qty}</span><button type="button" data-inc="${i}" aria-label="One more">+</button></div></div>
          <span class="cart__line">${ksh(each * line.qty)}</span></li>`;
      })
      .join('');
    const sum = cart.reduce((s, l) => s + coffees.find((x) => x.id === l.id).price * sizes[l.size] * l.qty, 0);
    total.textContent = ksh(sum);
    count.textContent = cart.reduce((s, l) => s + l.qty, 0);
    empty.hidden = cart.length > 0;
    save();
  };

  let lastFocus = null;
  const open = () => {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    document.body.classList.add('is-locked');
    cartStatus.textContent = '';
    drawer.querySelector('.cart__close').focus();
  };
  const close = () => {
    drawer.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus) lastFocus.focus();
  };
  openBtn.addEventListener('click', open);
  drawer.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) close();
    const inc = e.target.closest('[data-inc]');
    const dec = e.target.closest('[data-dec]');
    if (inc) { cart[Number(inc.dataset.inc)].qty++; render(); }
    if (dec) {
      const i = Number(dec.dataset.dec);
      cart[i].qty--;
      if (cart[i].qty <= 0) cart.splice(i, 1);
      render();
    }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) close(); });

  products.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (!btn) return;
    const card = btn.closest('.product');
    const line = { id: card.dataset.id, size: card.querySelector('[name=size]').value, grind: card.querySelector('[name=grind]').value, qty: 1 };
    const same = cart.find((l) => l.id === line.id && l.size === line.size && l.grind === line.grind);
    if (same) same.qty++; else cart.push(line);
    render();
    btn.textContent = 'Added';
    setTimeout(() => { btn.textContent = 'Add to cart'; }, 1400);
    openBtn.classList.add('bump');
    setTimeout(() => openBtn.classList.remove('bump'), 300);
  });

  document.getElementById('checkout').addEventListener('click', () => {
    cartStatus.textContent = cart.length
      ? 'Demo checkout: in a live build, this goes to M-Pesa or card payment.'
      : 'Add a coffee first.';
  });
  render();

  // ---------- Subscription ----------
  const picker = document.querySelectorAll('.sub__picker button');
  const subPrice = document.getElementById('sub-price');
  const subStatus = document.getElementById('sub-status');
  const discounts = { 1: 0.15, 2: 0.1, 4: 0.05 };
  let weeks = 2;
  const showSub = () => {
    const d = discounts[weeks];
    subPrice.textContent = `${ksh(1400 * (1 - d))} a bag, ${Math.round(d * 100)}% off`;
  };
  picker.forEach((b) => b.addEventListener('click', () => {
    picker.forEach((x) => x.setAttribute('aria-checked', String(x === b)));
    weeks = Number(b.dataset.weeks);
    showSub();
    subStatus.textContent = '';
  }));
  document.getElementById('sub-start').addEventListener('click', () => {
    subStatus.textContent = 'Demo: in a live build, this sets up the subscription and the first delivery.';
  });
  showSub();
})();
