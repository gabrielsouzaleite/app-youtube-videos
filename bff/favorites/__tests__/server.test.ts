import request from 'supertest';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { Server } from 'http';

// Configuração similar ao seu servidor
const app = express();
const port = 8002;

const favoritesFilePath = path.join(__dirname, '../favorites.json');

app.use(cors());
app.use(express.json());

let favorites: { id: string }[] = [];

// Carregar favoritos do arquivo JSON ao iniciar
fs.readFile(favoritesFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
  if (err) {
    console.error('Error reading favorites file:', err);
    return;
  }
  try {
    favorites = JSON.parse(data);
  } catch (parseErr) {
    console.error('Error parsing favorites file:', parseErr);
  }
});

const saveFavoritesToFile = () => {
  fs.writeFile(favoritesFilePath, JSON.stringify(favorites, null, 2), (err: NodeJS.ErrnoException | null) => {
    if (err) {
      console.error('Error writing favorites file:', err);
    }
  });
};

app.get('/api/favorites', (req, res) => {
  res.json(favorites);
});

app.post('/api/favorites', (req, res) => {
  const { videoId } = req.body;
  if (videoId && !favorites.find(fav => fav.id === videoId)) {
    favorites.push({ id: videoId });
    saveFavoritesToFile();
  }
  res.json({ favorites });
});

app.delete('/api/favorites', (req, res) => {
  const { videoId } = req.body;
  favorites = favorites.filter(fav => fav.id !== videoId);
  saveFavoritesToFile();
  res.json({ favorites });
});

// Inicialização do servidor para testes
let server: Server;

beforeAll((done) => {
  server = app.listen(port, () => {
    console.log(`Test server running at http://localhost:${port}/`);
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('Favorites API', () => {
  it('should return an empty array initially', async () => {
    const response = await request(app).get('/api/favorites');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a favorite', async () => {
    const videoId = 'test_video_id';
    const response = await request(app).post('/api/favorites').send({ videoId });
    expect(response.status).toBe(200);
    expect(response.body.favorites).toContainEqual({ id: videoId });
  });

  it('should remove a favorite', async () => {
    const videoId = 'test_video_id';
    await request(app).post('/api/favorites').send({ videoId });
    const response = await request(app).delete('/api/favorites').send({ videoId });
    expect(response.status).toBe(200);
    expect(response.body.favorites).not.toContainEqual({ id: videoId });
  });
});
