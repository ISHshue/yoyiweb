(() => {
  // The regular contact section remains available if JavaScript is disabled.
  if (document.querySelector('.floating-contact')) return;

  const contact = document.createElement('div');
  contact.className = 'floating-contact';
  contact.innerHTML = `
    <div class="floating-contact__links" id="floating-contact-links" hidden>
      <a class="floating-contact__item" href="tel:073561456" data-contact-link="phone" aria-label="撥打電話 (07) 356-1456">
        <span class="floating-contact__label" aria-hidden="true">電話洽詢</span>
        <span class="floating-contact__round" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5.5 3.5 9 3l1.5 4.5-2.2 1.6a15.7 15.7 0 0 0 6.6 6.6l1.6-2.2L21 15l-.5 3.5c-.2 1.4-1.5 2.3-2.8 2-7-1.5-12.7-7.2-14.2-14.2-.3-1.3.6-2.6 2-2.8Z"/></svg></span>
      </a>
      <a class="floating-contact__item" href="https://line.me/ti/p/~0931992970" data-contact-link="line" target="_blank" rel="noopener noreferrer" aria-label="透過 LINE 洽詢（另開新視窗）">
        <span class="floating-contact__label" aria-hidden="true">LINE 洽詢</span>
        <span class="floating-contact__round" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.5 10.5c0 4.1-3.8 7.4-8.5 7.4-.7 0-1.4-.1-2.1-.2L6 20l.6-3.6c-1.9-1.3-3.1-3.4-3.1-5.9C3.5 6.4 7.3 3 12 3s8.5 3.4 8.5 7.5Z"/><path d="M7.6 9v3.2h1.7M10.8 9v3.2M12.6 12.2V9l2.1 3.2V9M18 9h-1.5v3.2H18M16.5 10.6h1.2" stroke-width="1.25"/></svg></span>
      </a>
      <a class="floating-contact__item" href="https://www.instagram.com/trontalshue/" data-contact-link="instagram" target="_blank" rel="noopener noreferrer" aria-label="透過 Instagram 洽詢（另開新視窗）">
        <span class="floating-contact__label" aria-hidden="true">Instagram 洽詢</span>
        <span class="floating-contact__round" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.4" cy="6.7" r=".8" fill="currentColor" stroke="none"/></svg></span>
      </a>
    </div>
    <section class="floating-contact__card" id="floating-contact-card" aria-labelledby="floating-contact-card-title" hidden>
      <h2 class="floating-contact__sr-only" id="floating-contact-card-title" data-contact-text="companyName">佑鎰企業有限公司</h2>
      <img class="floating-contact__card-image" src="./assets/business-card.jpg" alt="佑鎰企業有限公司名片；聯絡資訊及最新地址請參考下方文字。" loading="lazy">
      <div class="floating-contact__card-content">
      <p class="floating-contact__address-note">名片上的地址請以以下資訊為準。</p>
      <dl class="floating-contact__details">
        <div>
          <dt>公司電話</dt>
          <dd><a href="tel:073561456" data-contact-link="phone" data-contact-text="phoneLabel">(07) 356-1456</a><button type="button" class="floating-contact__copy" data-copy="(07) 356-1456" data-copy-contact="phoneLabel" aria-label="複製電話號碼">複製</button></dd>
        </div>
        <div>
          <dt>行動電話</dt>
          <dd><a href="tel:0931992970" data-contact-link="mobile" data-contact-text="mobileLabel">0931-992-970</a><button type="button" class="floating-contact__copy" data-copy="0931992970" data-copy-contact="mobileLabel" aria-label="複製行動電話號碼">複製</button></dd>
        </div>
        <div>
          <dt>LINE ID</dt>
          <dd><a href="https://line.me/ti/p/~0931992970" data-contact-link="line" target="_blank" rel="noopener noreferrer"><span data-contact-text="lineId">0931992970</span> <span class="floating-contact__new-window">開啟 LINE ↗</span></a><button type="button" class="floating-contact__copy" data-copy="0931992970" data-copy-contact="lineId" aria-label="複製 LINE ID">複製</button></dd>
        </div>
        <div>
          <dt>地址</dt>
          <dd><span data-contact-text="address">高雄市大社區桶寮巷 3 之 1 號</span></dd>
        </div>
      </dl>
      <p class="floating-contact__status" role="status" aria-live="polite"></p>
      </div>
    </section>
    <button class="floating-contact__round floating-contact__trigger" type="button" aria-controls="floating-contact-links" aria-expanded="false" aria-label="開啟聯絡方式">
      <svg class="floating-contact__chat" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.2c0 4.5-3.8 8.1-8.5 8.1-.8 0-1.7-.1-2.4-.4L5 21l.8-4C4.4 15.5 3.5 13.5 3.5 11.2 3.5 6.7 7.3 3 12 3s8.5 3.7 8.5 8.2Z"/><path d="M8 10h8M8 13.5h5"/></svg>
      <svg class="floating-contact__close" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
    </button>`;
  // WordPress provides the same editable values used in its contact section.
  const contactData = window.youyiContact;
  if (contactData) {
    const cardImage = contact.querySelector('.floating-contact__card-image');
    if (typeof contactData.cardImage === 'string') {
      if (contactData.cardImage.trim()) cardImage.src = contactData.cardImage;
      else cardImage.hidden = true;
    }
    if (contactData.companyName) cardImage.alt = `${contactData.companyName}名片；聯絡資訊及最新地址請參考下方文字。`;
    contact.querySelectorAll('[data-contact-text]').forEach(element => {
      const value = contactData[element.dataset.contactText];
      if (typeof value === 'string') element.textContent = value;
    });
    contact.querySelectorAll('[data-contact-link]').forEach(element => {
      const value = contactData[element.dataset.contactLink];
      if (typeof value !== 'string') return;
      if (value && value !== 'tel:') {
        element.href = value;
      } else {
        element.removeAttribute('href');
        const row = element.closest('.floating-contact__item, .floating-contact__details > div');
        if (row) row.hidden = true;
      }
    });
    contact.querySelectorAll('[data-copy-contact]').forEach(element => {
      const value = contactData[element.dataset.copyContact];
      if (typeof value === 'string') element.dataset.copy = value;
    });
    const phoneLink = contact.querySelector('.floating-contact__item[data-contact-link="phone"]');
    if (typeof contactData.phoneLabel === 'string') phoneLink.setAttribute('aria-label', `撥打電話 ${contactData.phoneLabel}`);
    ['phoneLabel', 'mobileLabel', 'lineId', 'address'].forEach(key => {
      if (typeof contactData[key] !== 'string' || contactData[key]) return;
      const field = contact.querySelector(`.floating-contact__details [data-contact-text="${key}"]`);
      const row = field?.closest('.floating-contact__details > div');
      if (row) row.hidden = true;
    });
  }
  document.body.append(contact);

  const trigger = contact.querySelector('.floating-contact__trigger');
  const links = contact.querySelector('.floating-contact__links');
  const card = contact.querySelector('.floating-contact__card');
  const status = contact.querySelector('.floating-contact__status');
  const desktop = window.matchMedia('(min-width: 851px)');
  let isOpen = false;
  function setOpen(open) {
    isOpen = open;
    links.hidden = !open || desktop.matches;
    card.hidden = !open || !desktop.matches;
    trigger.setAttribute('aria-controls', desktop.matches ? 'floating-contact-card' : 'floating-contact-links');
    trigger.setAttribute('aria-expanded', String(open));
    trigger.setAttribute('aria-label', open ? '收合聯絡方式' : '開啟聯絡方式');
    if (!open) status.textContent = '';
  }
  setOpen(false);
  trigger.addEventListener('click', () => setOpen(!isOpen));
  document.addEventListener('click', event => {
    if (isOpen && !contact.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && isOpen) {
      setOpen(false);
      trigger.focus();
    }
  });
  desktop.addEventListener('change', () => {
    const focusWasInside = contact.contains(document.activeElement) && document.activeElement !== trigger;
    setOpen(false);
    if (focusWasInside) trigger.focus();
  });
  contact.querySelectorAll('.floating-contact__copy').forEach(button => {
    button.addEventListener('click', async () => {
      try {
        if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(button.dataset.copy);
        status.textContent = '已複製';
      } catch {
        status.textContent = '請選取上方文字複製';
      }
    });
  });
})();
