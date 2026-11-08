// Keep links to sections of the former single-page site useful after the split.
if (/(?:\/|\/index\.html)$/.test(location.pathname)) {
  const oldDestinations = { '#services': './services.html', '#work': './work.html', '#process': './process.html', '#contact': './contact.html', '#about': './index.html' };
  if (oldDestinations[location.hash]) location.replace(oldDestinations[location.hash]);
}
const processVideos = {
  turning: { id: 'tw3LlQn-qcg', title: '鋼索捲筒\n溝槽加工', description: '刀具沿著捲筒表面作業，近距離觀察鋼索溝槽的車削過程。', note: '這段影片展示捲筒的單一加工工序。' },
  boring: { id: 'yM4yK9tTLEQ', title: '捲筒端面\n孔位加工', description: '從工件端面切入，觀看捲筒孔位加工時的機台與刀具作業。', note: '本段為 PCD1200 捲筒端面孔加工紀錄。' },
  wire: { id: '7T9lDOiw2Vo', title: '線切割\n超長鍵槽', description: '走近線切割現場，觀看超長鍵槽加工中的工件與設備。', note: '本段為獨立的鍵槽加工紀錄。' },
  shaft: { id: 'P_eZln2GrxA', title: 'CNC 車床\n軸心加工', description: '觀看軸心在車床上的加工，從裝夾位置到刀具接觸工件的細節。', note: '本段為軸心加工現場紀錄。' }
};
if (document.getElementById('process-panel')) {
let activeProcess = 'turning';
const canEmbedVideo = location.protocol === 'http:' || location.protocol === 'https:';
const tabs = [...document.querySelectorAll('[data-process]')];
const panel = document.getElementById('process-panel');
const stage = document.getElementById('video-stage');
const poster = document.getElementById('video-poster');
const processImage = document.getElementById('process-image');
const processTitle = document.getElementById('process-title');
const sourceLink = document.getElementById('process-source');
const videoLoader = document.getElementById('video-loader');
let videoLoadingTimer;

function updatePosterLabel(title) {
  poster.setAttribute('aria-label', `${canEmbedVideo ? '播放' : '在 YouTube 觀看'}${title.replace('\n', '')}影片`);
  poster.querySelector('.video-play span:last-child').textContent = canEmbedVideo ? '播放加工實錄' : '在 YouTube 觀看';
}
updatePosterLabel(processVideos[activeProcess].title);

function clearVideoLoading() {
  clearTimeout(videoLoadingTimer);
  videoLoader.hidden = true;
  stage.setAttribute('aria-busy', 'false');
}

function bindThumbnail(image) {
  const fallback = () => {
    if (image.dataset.fallback === 'yes') return;
    image.dataset.fallback = 'yes';
    image.src = `https://i.ytimg.com/vi/${image.dataset.video}/hqdefault.jpg`;
  };
  image.onerror = fallback;
  image.onload = () => { if (image.naturalWidth < 200) fallback(); };
  if (image.complete && image.naturalWidth < 200) fallback();
}
document.querySelectorAll('.video-thumb').forEach(bindThumbnail);

function selectProcess(key, focusTab = false) {
  if (!Object.prototype.hasOwnProperty.call(processVideos, key)) return;
  activeProcess = key;
  const video = processVideos[key];
  stage.querySelector('iframe')?.remove();
  clearVideoLoading();
  poster.hidden = false;
  tabs.forEach(tab => {
    const selected = tab.dataset.process === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) tab.focus();
  });
  panel.setAttribute('aria-labelledby', `tab-${key}`);
  processImage.dataset.video = video.id;
  delete processImage.dataset.fallback;
  processImage.alt = `${video.title.replace('\n', '，')}實際畫面`;
  processImage.src = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
  processTitle.replaceChildren();
  video.title.split('\n').forEach((line, i) => {
    if (i) processTitle.append(document.createElement('br'));
    processTitle.append(document.createTextNode(line));
  });
  document.getElementById('process-description').textContent = video.description;
  document.getElementById('process-note').textContent = video.note;
  const url = `https://www.youtube.com/watch?v=${video.id}`;
  poster.href = url;
  updatePosterLabel(video.title);
  sourceLink.href = url;
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProcess(tab.dataset.process));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectProcess(tabs[next].dataset.process, true);
    }
  });
});
poster.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  // Local files do not provide the HTTP origin YouTube requires for embeds.
  if (!canEmbedVideo) return;
  event.preventDefault();
  const video = processVideos[activeProcess];
  const iframe = document.createElement('iframe');
  const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${video.id}`);
  embedUrl.searchParams.set('autoplay', '1');
  embedUrl.searchParams.set('playsinline', '1');
  embedUrl.searchParams.set('rel', '0');
  iframe.src = embedUrl.toString();
  iframe.title = `${video.title.replace('\n', '')}｜佑鎰 CNC阿寬`;
  iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  clearVideoLoading();
  videoLoader.hidden = false;
  stage.setAttribute('aria-busy', 'true');
  const revealPlayer = () => {
    if (stage.querySelector('iframe') === iframe) clearVideoLoading();
  };
  iframe.addEventListener('load', revealPlayer, { once: true });
  // The source link remains available if YouTube is slow or unavailable.
  videoLoadingTimer = window.setTimeout(revealPlayer, 8000);
  poster.hidden = true;
  stage.append(iframe);
  iframe.focus();
});
const requestedProcess = new URLSearchParams(location.search).get('video');
if (requestedProcess) selectProcess(requestedProcess);

document.querySelectorAll('[data-process-link]').forEach(link => {
  link.addEventListener('click', () => selectProcess(link.dataset.processLink));
});

}

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '關閉導覽選單' : '開啟導覽選單');
  mobileNav.hidden = !open;
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!mobileNav.hidden && !mobileNav.contains(event.target) && !menuToggle.contains(event.target)) {
    const focusWasInMenu = mobileNav.contains(document.activeElement);
    setMenu(false);
    if (focusWasInMenu) menuToggle.focus();
  }
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', event => {
  if (event.matches) {
    const focusWasInMenu = mobileNav.contains(document.activeElement) || document.activeElement === menuToggle;
    setMenu(false);
    if (focusWasInMenu) document.querySelector('.desktop-nav [aria-current="page"]')?.focus();
  }
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
