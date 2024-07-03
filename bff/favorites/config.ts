import * as fs from 'fs';
import * as path from 'path';

const favoritesFilePath = path.join(__dirname, 'favorites.json');

export const getFavorites = () => {
  if (!fs.existsSync(favoritesFilePath)) {
    fs.writeFileSync(favoritesFilePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(favoritesFilePath, 'utf8'));
};

export const saveFavorites = (favorites: string[]) => {
  fs.writeFileSync(favoritesFilePath, JSON.stringify(favorites));
};
