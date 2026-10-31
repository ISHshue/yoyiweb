(() => {
  // The regular contact section remains available if JavaScript is disabled.
  if (document.querySelector('.floating-contact')) return;

  const contact = document.createElement('div');
  contact.className = 'floating-contact';
  contact.innerHTML = `
    <div class="floating-contact__links" id="floating-contact-links" hidden>
      <a class="floating-contact__item" href="tel:073561456" aria-label="撥打電話 (07) 356-1456">
        <span class="floating-contact__label" aria-hidden="true">電話洽詢</span>
        <span class="floating-contact__round" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5.5 3.5 9 3l1.5 4.5-2.2 1.6a15.7 15.7 0 0 0 6.6 6.6l1.6-2.2L21 15l-.5 3.5c-.2 1.4-1.5 2.3-2.8 2-7-1.5-12.7-7.2-14.2-14.2-.3-1.3.6-2.6 2-2.8Z"/></svg></span>
      </a>
      <a class="floating-contact__item" href="https://line.me/ti/p/~0931992970" target="_blank" rel="noopener noreferrer" aria-label="透過 LINE 洽詢（另開新視窗）">
        <span class="floating-contact__label" aria-hidden="true">LINE 洽詢</span>
        <span class="floating-contact__round" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.5 10.5c0 4.1-3.8 7.4-8.5 7.4-.7 0-1.4-.1-2.1-.2L6 20l.6-3.6c-1.9-1.3-3.1-3.4-3.1-5.9C3.5 6.4 7.3 3 12 3s8.5 3.4 8.5 7.5Z"/><path d="M7.6 9v3.2h1.7M10.8 9v3.2M12.6 12.2V9l2.1 3.2V9M18 9h-1.5v3.2H18M16.5 10.6h1.2" stroke-width="1.25"/></svg></span>
      </a>
      <a class="floating-contact__item" href="https://www.instagram.com/trontalshue/" target="_blank" rel="noopener noreferrer" aria-label="透過 Instagram 洽詢（另開新視窗）">
        <span class="floating-contact__label" aria-hidden="true">Instagram 洽詢</span>
        <span class="floating-contact__round" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r=".8" fill="currentColor" stroke="none"/></svg></span>
      </a>
    </div>
    <button class="floating-contact__round floating-contact__trigger" type="button" aria-controls="floating-contact-links" aria-expanded="false" aria-label="開啟聯絡方式">
      <svg class="floating-contact__chat" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.2c0 4.5-3.8 8.1-8.5 8.1-.8 0-1.7-.1-2.4-.4L5 21l.8-4C4.4 15.5 3.5 13.5 3.5 11.2 3.5 6.7 7.3 3 12 3s8.5 3.7 8.5 8.2Z"/><path d="M8 10h8M8 13.5h5"/></svg>
      <svg class="floating-contact__close" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
    </button>`;
  document.body.append(contact);

  const trigger = contact.querySelector('.floating-contact__trigger');
  const links = contact.querySelector('.floating-contact__links');
  function setOpen(open) {
    links.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? '收合聯絡方式' : '開啟聯絡方式');
  }
  trigger.addEventListener('click', () => setOpen(links.hidden));
  document.addEventListener('click', event => {
    if (!links.hidden && !contact.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !links.hidden) {
      setOpen(false);
      trigger.focus();
    }
  });
})();
