import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import { searchVideos } from '../youtubeService';

// Mock do youtubeService
jest.mock('../youtubeService');

const { searchVideos: mockSearchVideos } = require('../youtubeService');

const createServer = () => {
  const app = express();
  app.use(cors());

  app.get('/api/videos/search', async (req, res) => {
    const query = req.query.q as string;

    try {
      const videos = await mockSearchVideos(query);
      res.json(videos);
    } catch (error) {
      console.error('Failed to fetch data from YouTube', error);
      res.status(500).json({ error: 'Failed to fetch data from YouTube' });
    }
  });

  return app;
};

describe('Videos API', () => {
  let server: Server;
  let app: express.Application;

  beforeAll((done) => {
    app = createServer();
    server = app.listen(8001, () => {
      console.log('Test server running at http://localhost:8001/');
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return videos for a valid query', async () => {
    const mockVideos = [{ id: 'video1', title: 'Test Video 1' }];
    mockSearchVideos.mockResolvedValue(mockVideos);

    const response = await request(app).get('/api/videos/search').query({ q: 'test' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockVideos);
  });

  it('should return 500 if there is an error fetching videos', async () => {
    mockSearchVideos.mockRejectedValue(new Error('Failed to fetch data from YouTube'));

    const response = await request(app).get('/api/videos/search').query({ q: 'test' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to fetch data from YouTube' });
  });
});
