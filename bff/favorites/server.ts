import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 8002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const favoritesFilePath = path.join(__dirname, 'favorites.json');

app.use(cors());
app.use(express.json());

let favorites: { id: string }[] = [];

fs.readFile(favoritesFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
  if (err) {
    console.error('Error reading favorites file:', err);
    return;
  }
  try {
    favorites = JSON.parse(data);
    console.log('Favoritos carregados do arquivo:', favorites);
  } catch (parseErr) {
    console.error('Error parsing favorites file:', parseErr);
  }
});

const saveFavoritesToFile = () => {
  fs.writeFile(favoritesFilePath, JSON.stringify(favorites, null, 2), (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.error('Error writing favorites file:', err);
    } else {
      console.log('Favoritos salvos no arquivo:', favorites);
    }
  });
};

app.get('/api/favorites', (req: Request, res: Response) => {
  res.json(favorites);
});

app.post('/api/favorites', (req: Request, res: Response) => {
  const { videoId } = req.body;
  console.log('Recebendo requisição POST para /api/favorites com videoId:', videoId);
  if (videoId && !favorites.find(fav => fav.id === videoId)) {
    favorites.push({ id: videoId });
    saveFavoritesToFile();
    console.log('Favorito adicionado:', { id: videoId });
  }
  res.json({ favorites });
});

app.delete('/api/favorites', (req: Request, res: Response) => {
  const { videoId } = req.body;
  console.log('Recebendo requisição DELETE para /api/favorites com videoId:', videoId);
  favorites = favorites.filter(fav => fav.id !== videoId);
  saveFavoritesToFile();
  res.json({ favorites });
});

app.listen(port, () => {
  console.log(`Favorites BFF running at http://localhost:${port}/`);
});
