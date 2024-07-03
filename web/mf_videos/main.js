document.addEventListener('DOMContentLoaded', () => {
  setupVideoSearch();
  
  const loadFavoritesButton = document.getElementById('load-favorites-button');
  if (loadFavoritesButton) {
    loadFavoritesButton.addEventListener('click', loadFavorites);
  }
});

export function setupVideoSearch() {
  const submitButton = document.getElementById('submit-button');
  const favoritesButton = document.getElementById('load-favorites-button');

  if (submitButton) {
    submitButton.addEventListener('click', async () => {
      const query = document.getElementById('search-video').value;

      try {
        const response = await fetch(`/api/videos/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const videosSection = document.getElementById('videos');
        videosSection.innerHTML = '';

        data.forEach((video) => {
          const videoElement = createVideoElement(video);
          videosSection.appendChild(videoElement);
        });
      } catch (error) {
        console.error('Fetch error: ', error);
      }
    });
  }

  if (favoritesButton) {
    favoritesButton.addEventListener('click', loadFavorites);
  }
}

export async function loadFavorites() {
  const videosSection = document.getElementById('favorite-videos');
  try {
    const response = await fetch('/api/favorites');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Favoritos carregados:', data); 
    videosSection.innerHTML = '';

    data.forEach((video) => {
      const videoElement = createVideoElement(video);
      videosSection.appendChild(videoElement);
    });
  } catch (error) {
    console.error('Error fetching favorites:', error);
  }
}

function createVideoElement(video) {
  const videoElement = document.createElement('figure');
  videoElement.classList.add('video');

  const videoId = video.id.videoId || video.id;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.width = 'auto';
  iframe.height = '200';
  iframe.frameBorder = '0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;

  const favoriteButton = document.createElement('button');
  favoriteButton.textContent = '☆';
  favoriteButton.dataset.videoId = videoId;
  favoriteButton.classList.add('favorite-button');

  const favorites = JSON.parse(localStorage.getItem('favoriteVideos')) || [];
  if (favorites.includes(videoId)) {
    favoriteButton.classList.add('favorited');
  }

  favoriteButton.addEventListener('click', () => toggleFavorite(videoId, favoriteButton));

  videoElement.appendChild(iframe);
  videoElement.appendChild(favoriteButton);

  return videoElement;
}

function toggleFavorite(videoId, button) {
  let favorites = JSON.parse(localStorage.getItem('favoriteVideos')) || [];
  if (favorites.includes(videoId)) {
    favorites = favorites.filter(id => id !== videoId);
    button.classList.remove('favorited');

    fetch('/api/favorites/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Video removed from favorites:', data);
    })
    .catch(error => console.error('Error updating favorites on server', error));
  } else {
    favorites.push(videoId);
    button.classList.add('favorited');

    fetch('/api/favorites/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ videoId }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Video added to favorites:', data);
    })
    .catch(error => console.error('Error updating favorites on server', error));
  }
  localStorage.setItem('favoriteVideos', JSON.stringify(favorites));
}
