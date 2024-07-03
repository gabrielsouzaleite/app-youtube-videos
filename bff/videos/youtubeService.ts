import { google, youtube_v3 } from 'googleapis';
import { YOUTUBE_API_KEY } from './config';

const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY
});

export async function searchVideos(query: string): Promise<youtube_v3.Schema$SearchResult[]> {
  try {
    const response = await youtube.search.list({
      part: 'snippet',
      q: query,
      type: 'video',
      maxResults: 5,
    });
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching data from YouTube:', error);
    throw error;
  }
}
