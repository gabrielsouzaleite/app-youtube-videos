import express, { Request, Response } from 'express';
import cors from 'cors';
import { searchVideos } from './youtubeService';

const app = express();
const port = 8001;

app.use(cors());

app.get('/api/videos/search', async (req: Request, res: Response) => {
  const query = req.query.q as string;

  try {
    const videos = await searchVideos(query);
    res.json(videos);
  } catch (error) {
    console.error('Failed to fetch data from YouTube', error);
    res.status(500).json({ error: 'Failed to fetch data from YouTube' });
  }
});

app.listen(port, () => {
  console.log(`Videos BFF running at http://localhost:${port}/`);
});
