// Isolated from the video code: a failed third-party resource must never block the page.
(() => {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  loader.hidden = false;
  let finished = false;
  let deadline;
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(deadline);
    window.removeEventListener('pointerdown', finish);
    window.removeEventListener('keydown', finish);
    loader.classList.add('is-finished');
    window.setTimeout(() => { loader.hidden = true; }, 300);
  }
  deadline = window.setTimeout(finish, 2200);
  window.addEventListener('pointerdown', finish, { once: true });
  window.addEventListener('keydown', finish, { once: true });
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
  const hero = document.querySelector('.hero-image');
  const heroReady = hero?.decode ? hero.decode().catch(() => {}) : Promise.resolve();
  const typeReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.allSettled([heroReady, typeReady]).then(finish);
})();
