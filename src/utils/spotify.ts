import { REDIRECT_URL, SPOTIFY_ID } from '../models/constants'

export const authenticateSpotify = (): void => {
  const redirect_uri = REDIRECT_URL;
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const scopes = 'user-read-recently-played';
  const redirectUri = encodeURIComponent(redirect_uri);
  const url = `${authEndpoint}?client_id=${SPOTIFY_ID}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
  window.location.href = url;
};

export const getRecentlyPlayedTracks = async (token: string): Promise<any> => {
  const endpoint = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response: Response) => {
      if (!response.ok) {
        reject();
        throw new Error('Failed to fetch recently played tracks');
      }

      response.json()
        .then((data: any) => resolve(data))
        .catch(() => { console.log('Error with JSON') });
    }).catch(() => { console.log('Error loading recently played') });
  });
};

export const getTrackFeatures = async (token: string, trackID: string): Promise<any> => {
  const endpoint = `https://api.spotify.com/v1/audio-features/${trackID}`;
  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response: Response) => {
      if (!response.ok) {
        reject();
        throw new Error('Failed to fetch Track Features');
      }

      response.json()
        .then((data: any) => resolve(data))
        .catch(() => { console.log('Error with JSON') });
    }).catch(() => { console.log('Error loading Track Features') });
  })
};
