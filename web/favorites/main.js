export function setupDrawerNavigation() {
  document.addEventListener('DOMContentLoaded', () => {
    const favoritesLink = document.getElementById('favorites-link');

    favoritesLink.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.pushState({}, '', '/favoritos');
      loadMicrofrontend('microfrontend-videos', '/videos/index.html', loadFavorites);
    });
  });
}

async function loadMicrofrontend(containerId, url, callback) {
  const response = await fetch(url);
  const html = await response.text();
  document.getElementById(containerId).innerHTML = html;
  if (callback) {
    callback();
  }
}
