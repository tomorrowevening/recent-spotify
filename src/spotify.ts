import { SPOTIFY_ID } from './constants'

export const authenticateSpotify = (): void => {
  const redirect_uri = 'http://0.0.0.0:8080/';
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const scopes = 'user-read-recently-played';
  const redirectUri = encodeURIComponent(redirect_uri);
  const url = `${authEndpoint}?client_id=${SPOTIFY_ID}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
  window.location.href = url;
};

export const getRecentlyPlayedTracks = async (token: string): Promise<any> => {
  const endpoint = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recently played tracks');
  }

  const data = await response.json();
  return data.items;
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

      response.json().then((data: any) => resolve(data));
    })
  })
};
