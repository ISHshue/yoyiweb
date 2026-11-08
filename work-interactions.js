(() => {
  const dialog = document.querySelector('.work-viewer');
  const links = [...document.querySelectorAll('.portfolio-open')];
  // Links continue to open the original image when the dialog API is unavailable.
  if (!dialog || typeof dialog.showModal !== 'function' || !links.length) return;

  const image = dialog.querySelector('.work-viewer__image img');
  const title = dialog.querySelector('#work-viewer-title');
  const description = dialog.querySelector('#work-viewer-description');
  const position = dialog.querySelector('.work-viewer__position');
  const closeButton = dialog.querySelector('.work-viewer__close');
  const previousButton = dialog.querySelector('.work-viewer__previous');
  const nextButton = dialog.querySelector('.work-viewer__next');
  let current = 0;
  let opener = null;

  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    const figure = link.closest('figure');
    const thumbnail = link.querySelector('img');
    image.src = link.href;
    image.alt = thumbnail.alt;
    title.textContent = figure.querySelector('h3').textContent;
    description.textContent = figure.querySelector('figcaption p').textContent;
    position.textContent = `${current + 1} / ${links.length}`;
  }

  links.forEach((link, index) => link.addEventListener('click', event => {
    // Keep standard browser behaviours such as opening in a new tab.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(index);
    dialog.showModal();
    closeButton.focus();
  }));
  previousButton.addEventListener('click', () => show(current - 1));
  nextButton.addEventListener('click', () => show(current + 1));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (opener && opener.isConnected) opener.focus();
  });
})();
