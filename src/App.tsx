import { useEffect, useState } from 'react';
import { authenticateSpotify, getRecentlyPlayedTracks } from './spotify';
import Track from './Track';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState<any[]>([]);
  const [status, setStatus] = useState('No tracks loaded')

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = hashParams.get('access_token');

    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  const handleLogin = () => {
    authenticateSpotify();
  };

  const handleFetchTracks = async () => {
    if (token !== null) {
      getRecentlyPlayedTracks(token)
        .then((tracks: any) => {
          setRecentlyPlayedTracks(tracks.items);
          setStatus('Loaded');
        })
        .catch(() => {
          setStatus('Can\'t fetch recent tracks');
        })
    }
  };

  const elements: any[] = [];
  if (token) {
    recentlyPlayedTracks.forEach((value: any, trackIndex: number) => {
      elements.push(<Track key={`track_${trackIndex}`} data={value} token={token} />);
    });
  }

  return (
    <div>
      <h1>Spotify Recent Tracks: {status}</h1>
      {!token ? (
        <button onClick={handleLogin}>Login with Spotify</button>
      ) : (
        <>
          <button onClick={handleFetchTracks}>Fetch Recently Played Tracks</button>
          <ul>
            {elements}
          </ul>
        </>
      )}
    </div>
  );
};
