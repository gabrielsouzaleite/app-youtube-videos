import { setupDrawerNavigation } from '/favorites/main.js';
import { setupVideoSearch, loadFavorites } from '/videos/main.js';

document.addEventListener('DOMContentLoaded', () => {
  const loadMicrofrontend = async (containerId, url, callback) => {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
    if (callback) {
      callback();
    }
  };

  const navigate = (path) => {
    if (path === '/favoritos') {
      loadMicrofrontend('microfrontend-videos', '/videos/index.html', loadFavorites);
    } else if (path === '/videos') {
      loadMicrofrontend('microfrontend-videos', '/videos/index.html', setupVideoSearch);
    } else {
      loadMicrofrontend('microfrontend-videos', '/videos/index.html', setupVideoSearch);
    }
  };

  window.addEventListener('popstate', (event) => {
    navigate(window.location.pathname);
  });

  document.body.addEventListener('click', (event) => {
    if (event.target.matches('a[data-link]')) {
      event.preventDefault();
      const path = event.target.getAttribute('href');
      window.history.pushState({}, '', path);
      navigate(path);
    }
  });

  loadMicrofrontend('microfrontend-drawer', '/favorites/index.html', setupDrawerNavigation);
  navigate(window.location.pathname);
});
