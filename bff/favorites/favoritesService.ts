import { getFavorites, saveFavorites } from './config';

export const addFavorite = (videoId: string) => {
  const favorites = getFavorites();
  if (!favorites.includes(videoId)) {
    favorites.push(videoId);
    saveFavorites(favorites);
  }
};

export const removeFavorite = (videoId: string) => {
  let favorites = getFavorites();
  favorites = favorites.filter((id: string) => id !== videoId);
  saveFavorites(favorites);
};

export const listFavorites = (): string[] => {
  return getFavorites();
};
