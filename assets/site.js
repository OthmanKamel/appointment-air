/* Size the first screen from the real header; play the decorative film when visible. */
(function () {
  'use strict';
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const syncHeaderHeight = () => {
    if (header) root.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
  };
  syncHeaderHeight();
  if (header && 'ResizeObserver' in window) {
    new ResizeObserver(syncHeaderHeight).observe(header);
  } else {
    window.addEventListener('resize', syncHeaderHeight, { passive: true });
  }
  window.addEventListener('pageshow', syncHeaderHeight);

  const video = document.querySelector('[data-hero-video]');
  if (!video) return;
  const hero = video.closest('.hero');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let pending = false;
  video.defaultMuted = true;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;

  const start = () => {
    if (document.hidden || reduceMotion.matches || pending || !video.paused) return;
    pending = true;
    const play = video.play();
    if (play && typeof play.then === 'function') {
      play.then(() => { pending = false; }).catch(() => { pending = false; });
    } else pending = false;
  };
  const update = () => {
    if (document.hidden || reduceMotion.matches) video.pause();
    else start();
  };
  video.addEventListener('loadeddata', start);
  video.addEventListener('canplay', start);
  document.addEventListener('visibilitychange', update);
  window.addEventListener('pageshow', update);
  window.addEventListener('focus', update);
  if (typeof reduceMotion.addEventListener === 'function') reduceMotion.addEventListener('change', update);
  else if (typeof reduceMotion.addListener === 'function') reduceMotion.addListener(update);
  update();
})();
